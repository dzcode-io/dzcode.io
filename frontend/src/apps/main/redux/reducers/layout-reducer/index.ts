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
  { url: "/Projects", title: "Projects" },
  { url: "/Articles", title: "Articles" },
  { url: "/FAQ", title: "FAQ" },
];

const data = [
  {
    title: "Recent Articles",
    links: [
      {
        href: "/Articles/Open_source",
        text:
          "Open source: What is it? How it works? And why we should contribute to it?",
      },
      {
        href:
          "/Articles/The_Using_Of_Conventional_Commits_To_Contribute_To_DZCode",
        text: "Use conventional commits to contribute to dzcode",
      },
      {
        href: "/Articles/Send_Emails_With_Django_and_Gmail_A_Btter_Way",
        text: "Send emails with Django and Gmail, a better way",
      },
    ],
  },
  {
    title: "Recent Projects",
    links: [
      {
        text: "Le'Blad",
        href: "https://github.com/dzcode-io/leblad",
      },
      {
        href: "https://github.com/dzcode-io/kuliya",
        text: "Kuliya",
      },
      {
        href: "https://github.com/dzcode-io/dzcode.io",
        text: "dzCode Website",
      },
    ],
  },
  {
    title: "Social Media",
    links: [
      {
        href: "https://www.facebook.com/dzcode.io",
        text: "On Facebook",
      },
      {
        href: "https://www.instagram.com/dzcode.io",
        text: "On Instagram",
      },     
      {
        href: "https://www.youtube.com/channel/UC_tLjuQaYotzERtaAo8Y4SQ",
        text: "On YouTube",
      },
      {
        href: "https://twitter.com/dzcode_io",
        text: "On Twitter",
      },    
      {
        href: "https://www.linkedin.com/company/dzcode",
        text: "On LinkedIn",
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
