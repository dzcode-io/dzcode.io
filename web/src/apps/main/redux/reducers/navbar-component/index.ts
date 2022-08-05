import { DictionaryKeys } from "src/apps/main/components/t/dictionary";
import { Action } from "src/apps/main/redux";

export interface NavbarComponentState {
  sections: Array<{
    title: DictionaryKeys<"navbar">;
    url: string;
  }>;
}

export const navbarComponent = (
  state: NavbarComponentState = {
    sections: [
      { url: "/Contribute", title: "navbar-section-contribute" },
      { url: "/Team", title: "navbar-section-connect" },
      { url: "/Learn", title: "navbar-section-learn" },
      { url: "/Projects", title: "navbar-section-projects" },
      { url: "/Articles", title: "navbar-section-articles" },
      { url: "/FAQ", title: "navbar-section-faq" },
    ],
  },
  action: Action<NavbarComponentState>,
) => {
  switch (action.type) {
    default:
      return state;
  }
};
