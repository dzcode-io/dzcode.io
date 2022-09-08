import { createSlice } from "@reduxjs/toolkit";
import { DictionaryKeys } from "src/components/t/dictionary";

export interface NavbarComponentState {
  sections: Array<{
    title: DictionaryKeys<"navbar">;
    url: string;
  }>;
}

export const navbarComponent = createSlice({
  name: "navbarComponent",
  initialState: {
    sections: [
      { url: "/Contribute", title: "navbar-section-contribute" },
      { url: "/Team", title: "navbar-section-connect" },
      { url: "/Learn", title: "navbar-section-learn" },
      { url: "/Projects", title: "navbar-section-projects" },
      { url: "/Articles", title: "navbar-section-articles" },
      { url: "/FAQ", title: "navbar-section-faq" },
    ],
  } as NavbarComponentState,
  reducers: {},
});
