import { Action } from "src/apps/main/redux";

export interface NavbarComponentState {
  sections: Array<{ title: string; url: string }>;
}

export const navbarComponent = (
  state: NavbarComponentState = {
    sections: [
      { url: "/Learn", title: "Learn" },
      { url: "/Projects", title: "Projects" },
      { url: "/Articles", title: "Articles" },
      { url: "/FAQ", title: "FAQ" },
    ],
  },
  action: Action<NavbarComponentState>,
) => {
  switch (action.type) {
    default:
      return state;
  }
};
