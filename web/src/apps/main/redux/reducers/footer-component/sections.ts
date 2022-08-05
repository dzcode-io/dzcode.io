import { DictionaryKeys } from "src/apps/main/components/t/dictionary";
import { fullstackConfig } from "src/config";

export interface Section {
  title: DictionaryKeys<"footer-category-title">;
  links: Array<{
    text: DictionaryKeys<"footer-category-link-text">;
    href: string;
  }>;
}

export const sections: Section[] = [
  {
    title: "footer-category-title-helpful-links",
    links: [
      { text: "footer-category-link-text-home", href: "/" },
      { text: "footer-category-link-text-learn", href: "/Learn" },
      { text: "footer-category-link-text-projects", href: "/Projects" },
      { text: "footer-category-link-text-articles", href: "/Articles" },
      { text: "footer-category-link-text-faq", href: "/FAQ" },
    ],
  },
  {
    title: "footer-category-title-mobile",
    links: [
      {
        text: "footer-category-link-text-android",
        href: fullstackConfig.mobile.android.url,
      },
      {
        text: "footer-category-link-text-ios",
        href: fullstackConfig.mobile.ios.url,
      },
      {
        text: "footer-category-link-text-expo",
        href: fullstackConfig.mobile.expo.url,
      },
    ],
  },
  {
    title: "footer-category-title-social-media",
    links: [
      {
        text: "footer-category-link-text-github",
        href: "https://www.github.com/dzcode-io",
      },
      {
        text: "footer-category-link-text-slack",
        href: "https://join.slack.com/t/dzcode/shared_invite/zt-ek9kscb7-m8z_~cBjX79l~uchuABPFQ",
      },
      {
        text: "footer-category-link-text-facebook",
        href: "https://www.facebook.com/dzcode.io",
      },
      {
        text: "footer-category-link-text-instagram",
        href: "https://www.instagram.com/dzcode.io",
      },
      {
        text: "footer-category-link-text-youTube",
        href: "https://www.youtube.com/channel/UC_tLjuQaYotzERtaAo8Y4SQ",
      },
      {
        text: "footer-category-link-text-twitter",
        href: "https://twitter.com/dzcode_io",
      },
      {
        text: "footer-category-link-text-linkedIn",
        href: "https://www.linkedin.com/groups/8924363",
      },
    ],
  },
];
