import { actionType } from "t9/apps/main/redux/constants";

type link = {
  href: string;
  text: string;
};

type category = {
  title: string;
  links: link[];
};

export interface FooterInitialState {
  data: category[];
}

type Section = { title: string; url: string };

export interface NavbarInitialState {
  sections: Section[] | null;
}
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
        href: "/Articles/Welcome_to_dzCode",
        text: "Welcome To dzCode.io",
      },
      {
        href: "/Learn/Getting_Started",
        text: "Getting Started dzCode.io",
      },
    ],
  },
  {
    title: "Recent Projects",
    links: [
      {
        href: "/",
        text: "Algerian Education Hierarchy",
      },
      {
        href: "/",
        text: "Algerian Users",
      },
      {
        href: "/",
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
        href: "https://www.youtube.com/channel/UC_tLjuQaYotzERtaAo8Y4SQ",
        text: "YouTube",
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
    case actionType.UPDATE_LAYOUT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
