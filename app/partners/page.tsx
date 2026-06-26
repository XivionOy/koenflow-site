// Server wrapper: reads the language cookie, then renders the client UI.
import { getServerLang } from "../lib/i18n.server";
import { pageMetadata } from "../lib/seo";
import PartnersClient from "./PartnersClient";

export async function generateMetadata() {
  const lang = await getServerLang();
  return pageMetadata("partners", lang, "/partners");
}

export default async function PartnersPage() {
  const lang = await getServerLang();
  return <PartnersClient lang={lang} />;
}
