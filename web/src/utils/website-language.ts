import { Languages } from "@dzcode.io/models/dist/language";
import { LanguageCode } from "@dzcode.io/utils/dist/language";

let initialLanguageCode: LanguageCode | null = null;
export function getInitialLanguageCode(): LanguageCode {
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
