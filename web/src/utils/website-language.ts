import { Language, Languages } from "src/components/locale/languages";

let initialLanguageCode: Language["code"] | null = null;
export function getInitialLanguageCode(): Language["code"] {
  if (!initialLanguageCode) {
    const language =
      Languages.find(({ code }) => window.location.pathname.startsWith(`/${code}`)) || Languages[0];
    initialLanguageCode = language.code;
  }
  if (initialLanguageCode === "ar") {
    document.body.dir = "rtl";
  }
  return initialLanguageCode;
}

export function stripLanguageCodeFromHRef(href: string): string {
  let strippedHref = href;
  if (href.startsWith(`/${initialLanguageCode}`)) {
    strippedHref = href.replace(`/${initialLanguageCode}`, "");
  }
  return strippedHref;
}
