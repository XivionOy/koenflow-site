// Server wrapper: reads the language cookie, then renders the client UI.
import { getServerLang } from "../lib/i18n.server";
import { pageMetadata } from "../lib/seo";
import BrandClient from "./BrandClient";

export async function generateMetadata() {
  const lang = await getServerLang();
  return pageMetadata("brand", lang, "/brand");
}

export default async function BrandPage() {
  const lang = await getServerLang();
  return <BrandClient lang={lang} />;
}
