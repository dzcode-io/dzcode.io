import { Action } from "src/apps/main/redux";

import { Section, sections } from "./sections";

export interface FooterComponentState {
  sections: Section[];
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
