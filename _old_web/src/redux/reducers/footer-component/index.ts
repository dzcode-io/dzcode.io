import { createSlice } from "@reduxjs/toolkit";
import { DictionaryKeys } from "src/components/t/dictionary";
import { sections } from "src/redux/reducers/footer-component/sections";

export interface FooterComponentState {
  sections: Array<{
    title: DictionaryKeys<"footer-category-title">;
    links: Array<{
      text: DictionaryKeys<"footer-category-link-text">;
      href: string;
    }>;
  }>;
}

export const footerComponent = createSlice({
  name: "footerComponent",
  initialState: {
    sections,
  } as FooterComponentState,
  reducers: {},
});
