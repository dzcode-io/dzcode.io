import React from "react";

// import { HelmetProvider } from "react-helmet-async";
// import { BrowserRouter } from "react-router-dom";
import { Footer, type FooterProps } from "../components/footer";
// import { StoreProvider } from "src/redux/store";

const footerSections: FooterProps["sections"] = [
  {
    localeKey: "footer-category-title-helpful-links",
    links: [
      { localeKey: "footer-category-link-text-home", href: "/" },
      {
        localeKey: "footer-category-link-text-projects",
        href: "/projects",
      },
      { localeKey: "footer-category-link-text-faq", href: "/faq" },
    ],
  },
  {
    localeKey: "footer-category-title-social-media",
    links: [
      {
        localeKey: "footer-category-link-text-github",
        href: "https://www.github.com/dzcode-io",
      },
      {
        localeKey: "footer-category-link-text-slack",
        href: "https://join.slack.com/t/dzcode/shared_invite/zt-ek9kscb7-m8z_~cBjX79l~uchuABPFQ",
      },
      {
        localeKey: "footer-category-link-text-facebook",
        href: "https://www.facebook.com/dzcode.io",
      },
      {
        localeKey: "footer-category-link-text-instagram",
        href: "https://www.instagram.com/dzcode.io",
      },
      {
        localeKey: "footer-category-link-text-youTube",
        href: "https://www.youtube.com/channel/UC_tLjuQaYotzERtaAo8Y4SQ",
      },
      {
        localeKey: "footer-category-link-text-twitter",
        href: "https://twitter.com/dzcode_io",
      },
      {
        localeKey: "footer-category-link-text-linkedIn",
        href: "https://www.linkedin.com/groups/8924363",
      },
    ],
  },
];

const App = () => {
  return (
    <>
      <Footer sections={footerSections} />
    </>
  );
};

export function AppWithProviders() {
  return (
    // <StoreProvider>
    //   <BrowserRouter>
    //     <HelmetProvider>
    <App />
    //     </HelmetProvider>
    //   </BrowserRouter>
    // </StoreProvider>
  );
}
