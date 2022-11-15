import { createSlice } from "@reduxjs/toolkit";
import { DictionaryKeys } from "src/components/t/dictionary";

export interface NavbarComponentState {
  links: Array<{
    text: DictionaryKeys<"navbar">;
    href: string;
  }>;
}

export const navbarComponent = createSlice({
  name: "navbarComponent",
  initialState: {
    links: [
      { href: "/Contribute", text: "navbar-section-contribute" },
      { href: "/Team", text: "navbar-section-connect" },
      { href: "/Learn", text: "navbar-section-learn" },
      { href: "/Projects", text: "navbar-section-projects" },
      { href: "/Articles", text: "navbar-section-articles" },
      { href: "/FAQ", text: "navbar-section-faq" },
    ],
  } as NavbarComponentState,
  reducers: {},
});
