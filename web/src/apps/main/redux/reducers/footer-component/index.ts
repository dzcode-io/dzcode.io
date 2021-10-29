import { Action } from "src/apps/main/redux";
import { sections } from "./sections";

export interface FooterComponentState {
  sections: Array<{
    title: string;
    links: Array<{
      id?: string;
      href: string;
      text: string;
    }>;
  }>;
}

export const footerComponent = (
  state: FooterComponentState = {
    sections,
  },
  action: Action<FooterComponentState>,
) => {
  switch (action.type) {
    default:
      return state;
  }
};
