import { FooterInitialState } from "t9/apps/main/components/footer";
import { NavbarInitialState } from "t9/apps/main/components/navbar";
import { actionType } from "t9/apps/main/redux/constants";

const sections = [
  { url: "/Learn/Getting_Started", title: "Learn" },
  { url: "/Contribute", title: "Contribute" },
  { url: "/Projects", title: "Projects" },
  { url: "/Articles", title: "Articles" },
  { url: "/Contact-Us", title: "Contact" },
];

const data = [
  {
    title: "Recent Articles",
    links: [
      {
        href: "https://staging.dzcode.io/Articles/Welcome_to_dzCode",
        text: "Welcome To dzCode.io",
      },
      {
        href: "https://staging.dzcode.io/Learn/Getting_Started",
        text: "Getting Started dzCode.io",
      },
    ],
  },
  {
    title: "Recent Projects",
    links: [
      {
        href: "https://staging.dzcode.io/",
        text: "Algerian Education Hierarchy",
      },
      {
        href: "https://staging.dzcode.io/",
        text: "Algerian Users",
      },
      {
        href: "https://staging.dzcode.io/",
        text: "Algerian Wilaya",
      },
    ],
  },
  {
    title: "Social Media",
    links: [
      {
        href: "www.facebook.com/dzcode.io",
        text: "Facebook",
      },
      {
        href:
          "https://www.youtube.com/channel/UCqWze7IcHI-_2mvByYeGTJg?view_as=subscriber",
        text: "Youtube",
      },
    ],
  },
];

export interface LayoutInitialState {
  navbarInitialState: NavbarInitialState;
  footerInitialState: FooterInitialState;
}

export const layout = (
  state: LayoutInitialState = {
    navbarInitialState: { sections },
    footerInitialState: { data },
  },
  action: {
    type: string;
    payload: LayoutInitialState;
  },
) => {
  switch (action.type) {
    case actionType.UPDATE_LANDING_LAYOUT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
