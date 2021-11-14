import { fullstackConfig } from "src/config";

export const sections = [
  {
    title: "Helpful Links",
    links: [
      { id: "home.path", text: "Home", href: "/" },
      { id: "learn.path", text: "Learn", href: "/Learn" },
      { id: "projects.path", text: "Projects", href: "/Projects" },
      { id: "articles.path", text: "Articles", href: "/Articles" },
      { id: "faq.path", text: "FAQ", href: "/FAQ" },
    ],
  },
  {
    title: "Mobile",
    links: [
      { text: "Android", href: fullstackConfig.mobile.android.url },
      { text: "iOS", href: fullstackConfig.mobile.ios.url },
      { text: "Expo", href: fullstackConfig.mobile.expo.url },
    ],
  },
  {
    title: "Social Media",
    links: [
      { text: "Github", href: "https://www.github.com/dzcode-io" },
      {
        text: "Slack",
        href: "https://join.slack.com/t/dzcode/shared_invite/zt-ek9kscb7-m8z_~cBjX79l~uchuABPFQ",
      },
      { text: "Facebook", href: "https://www.facebook.com/dzcode.io" },
      { text: "Instagram", href: "https://www.instagram.com/dzcode.io" },
      {
        text: "YouTube",
        href: "https://www.youtube.com/channel/UC_tLjuQaYotzERtaAo8Y4SQ",
      },
      { text: "Twitter", href: "https://twitter.com/dzcode_io" },
      { text: "LinkedIn", href: "https://www.linkedin.com/groups/8924363" },
    ],
  },
];
