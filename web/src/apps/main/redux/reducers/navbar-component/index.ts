import { Action } from "src/apps/main/redux";

export interface TranslationMessage {
  id: string;
  defaultMessage: string;
  description?: string;
}
export interface NavbarComponentState {
  sections: Array<{ message: TranslationMessage; title: string; url: string }>;
}

export const navbarComponent = (
  state: NavbarComponentState = {
    sections: [
      {
        message: { id: "contribute.path", defaultMessage: "Contribute" },
        url: "/Contribute",
        title: "Contribute",
      },

      { message: { id: "team.path", defaultMessage: "Team" }, url: "/Team", title: "Connect" },

      { message: { id: "learn.path", defaultMessage: "Learn" }, url: "/Learn", title: "Learn" },

      {
        message: { id: "projects.path", defaultMessage: "Projects" },
        url: "/Projects",
        title: "Projects",
      },

      {
        message: { id: "articles.path", defaultMessage: "Articles" },
        url: "/Articles",
        title: "Articles",
      },

      { message: { id: "faq.path", defaultMessage: "FAQ" }, url: "/FAQ", title: "FAQ" },
    ],
  },
  action: Action<NavbarComponentState>,
) => {
  switch (action.type) {
    default:
      return state;
  }
};
