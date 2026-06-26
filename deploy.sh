#!/usr/bin/env bash
# One-shot deploy for the KoenFlow site on a fresh Ubuntu server.
# Run as root:  curl -fsSL <raw url>/deploy.sh | bash
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

REPO="https://github.com/XivionOy/koenflow-site.git"
DIR="/var/www/koenflow"

echo "==> apt update + base packages"
apt-get update -y
apt-get install -y curl git nginx ca-certificates

echo "==> Node.js 20"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
node -v

echo "==> Fetch code"
mkdir -p /var/www
if [ -d "$DIR/.git" ]; then
  git -C "$DIR" pull --ff-only
else
  git clone "$REPO" "$DIR"
fi
cd "$DIR"

echo "==> Install + build"
npm ci
npm run build
mkdir -p "$DIR/public/downloads"

echo "==> Run with PM2"
npm install -g pm2
if pm2 describe koenflow >/dev/null 2>&1; then
  pm2 restart koenflow
else
  pm2 start npm --name koenflow -- start
fi
pm2 save
pm2 startup systemd -u root --hp /root >/dev/null 2>&1 || true

echo "==> Configure nginx"
cat >/etc/nginx/sites-available/koenflow <<'NGINX'
server {
    listen 80 default_server;
    server_name _;
    location / {
        proxy_pass http://127.0.0.1:4311;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX
ln -sf /etc/nginx/sites-available/koenflow /etc/nginx/sites-enabled/koenflow
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==> Firewall"
ufw allow OpenSSH || true
ufw allow 'Nginx Full' || true
ufw --force enable || true

echo ""
echo "================================================"
echo " READY. Open  http://<SERVER_PUBLIC_IP>/  in a browser."
echo " Download button needs this file on the server:"
echo "   $DIR/public/downloads/KoenFlowLauncher-latest.exe"
echo " HTTPS (after the domain points to this server):"
echo "   certbot --nginx -d koenflow.com -d www.koenflow.com"
echo "================================================"
