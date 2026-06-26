import { cookies } from "next/headers";
import { LANG_COOKIE, type Lang } from "./i18n";

// Reads the chosen language from the cookie on the server (default: English).
// `await` is safe whether cookies() is sync (Next 14) or async (Next 15).
export async function getServerLang(): Promise<Lang> {
  const store = await cookies();
  return store.get(LANG_COOKIE)?.value === "ru" ? "ru" : "en";
}
