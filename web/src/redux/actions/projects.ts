import { Action, ThunkAction } from "@reduxjs/toolkit";
import { projectsPageSlice } from "src/redux/slices/projects-page";
import { AppState } from "src/redux/store";

export const fetchProjectsListAction =
  (): ThunkAction<void, AppState, unknown, Action> => async (dispatch) => {
    try {
      dispatch(projectsPageSlice.actions.set({ projectsList: null }));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      // throw new Error('fetchProjectsList error');
      dispatch(
        projectsPageSlice.actions.set({
          projectsList: [
            {
              slug: "AiPalettes",
              name: "AiPalettes",
              repositories: [
                {
                  provider: "github",
                  owner: "bondbenz",
                  repository: "aipalettes",
                  stats: {
                    contributionCount: 0,
                    languages: ["CSS", "HTML", "Python", "JavaScript"],
                  },
                  contributors: [
                    {
                      id: "github/10636704",
                      username: "bondbenz",
                      name: "bondbenz",
                      profileUrl: "https://github.com/bondbenz",
                      avatarUrl: "https://avatars.githubusercontent.com/u/10636704?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Algeria_boukal",
              name: "Algeria boukal",
              repositories: [
                {
                  provider: "github",
                  owner: "jusinamine",
                  repository: "algeria-boukal",
                  stats: {
                    contributionCount: 0,
                    languages: [],
                  },
                  contributors: [
                    {
                      id: "github/36046405",
                      username: "jusinamine",
                      name: "Mohammed El Amine Benkorreche",
                      profileUrl: "https://github.com/jusinamine",
                      avatarUrl: "https://avatars.githubusercontent.com/u/36046405?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Algeria_Covid19_Tracker",
              name: "dz-covid19.com",
              repositories: [
                {
                  provider: "github",
                  owner: "DGLcsGaming",
                  repository: "dz-covid19.com",
                  stats: {
                    contributionCount: 0,
                    languages: ["JavaScript", "CSS", "HTML"],
                  },
                  contributors: [
                    {
                      id: "github/17008973",
                      username: "DGLcsGaming",
                      name: "Faical Ghoul",
                      profileUrl: "https://github.com/DGLcsGaming",
                      avatarUrl: "https://avatars.githubusercontent.com/u/17008973?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Algeria_Logos",
              name: "Algeria Logos",
              repositories: [
                {
                  provider: "github",
                  owner: "aimen08",
                  repository: "algerialogos",
                  stats: {
                    contributionCount: 1,
                    languages: ["SCSS", "JavaScript", "HTML"],
                  },
                  contributors: [
                    {
                      id: "github/32209952",
                      username: "aimen08",
                      name: "Aymen Hamza",
                      profileUrl: "https://github.com/aimen08",
                      avatarUrl: "https://avatars.githubusercontent.com/u/32209952?v=4",
                    },
                    {
                      id: "github/47982363",
                      username: "Dyios",
                      name: "TOLBA Rafik",
                      profileUrl: "https://github.com/Dyios",
                      avatarUrl: "https://avatars.githubusercontent.com/u/47982363?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Algeria_Startup_Jobs",
              name: "Algeria Startup Jobs",
              repositories: [
                {
                  provider: "github",
                  owner: "algeriastartupjobs",
                  repository: "algeriastartupjobs.com",
                  stats: {
                    contributionCount: 0,
                    languages: ["Rust", "TypeScript", "HCL", "CSS", "HTML"],
                  },
                  contributors: [
                    {
                      id: "github/20110076",
                      username: "ZibanPirate",
                      name: "Zakaria Mansouri",
                      profileUrl: "https://github.com/ZibanPirate",
                      avatarUrl: "https://avatars.githubusercontent.com/u/20110076?v=4",
                    },
                  ],
                },
                {
                  provider: "github",
                  owner: "algeriastartupjobs",
                  repository: "diagrams",
                  stats: {
                    languages: ["message", "documentation_url", "status"],
                  },
                  contributors: [],
                },
              ],
            },
            {
              slug: "Algerian_Administrative_Division",
              name: "Algerian Administrative Division",
              repositories: [
                {
                  provider: "github",
                  owner: "mohsenuss91",
                  repository: "AlgerianAdministrativeDivision",
                  stats: {
                    contributionCount: 10,
                    languages: ["JavaScript", "CSS", "HTML", "TypeScript"],
                  },
                  contributors: [
                    {
                      id: "github/6825816",
                      username: "mohsenuss91",
                      name: "KHALDOUN Mohsen",
                      profileUrl: "https://github.com/mohsenuss91",
                      avatarUrl: "https://avatars.githubusercontent.com/u/6825816?v=4",
                    },
                    {
                      id: "github/21331907",
                      username: "celyes",
                      name: "Ilyes Chouia",
                      profileUrl: "https://github.com/celyes",
                      avatarUrl: "https://avatars.githubusercontent.com/u/21331907?v=4",
                    },
                    {
                      id: "github/9090674",
                      username: "Fcmam5",
                      name: "Fortas Abdeldjalil",
                      profileUrl: "https://github.com/Fcmam5",
                      avatarUrl: "https://avatars.githubusercontent.com/u/9090674?v=4",
                    },
                    {
                      id: "github/14818716",
                      username: "bensialih",
                      name: "Abdel Hakim Bensiali",
                      profileUrl: "https://github.com/bensialih",
                      avatarUrl: "https://avatars.githubusercontent.com/u/14818716?v=4",
                    },
                    {
                      id: "github/10291914",
                      username: "bRIMOs",
                      name: "BOURBIA Brahim",
                      profileUrl: "https://github.com/bRIMOs",
                      avatarUrl: "https://avatars.githubusercontent.com/u/10291914?v=4",
                    },
                    {
                      id: "github/6185849",
                      username: "IOAyman",
                      name: "Ayman Nedjmeddine",
                      profileUrl: "https://github.com/IOAyman",
                      avatarUrl: "https://avatars.githubusercontent.com/u/6185849?v=4",
                    },
                    {
                      id: "github/4965990",
                      username: "ahmed48",
                      name: "ahmed",
                      profileUrl: "https://github.com/ahmed48",
                      avatarUrl: "https://avatars.githubusercontent.com/u/4965990?v=4",
                    },
                    {
                      id: "github/13240836",
                      username: "ixeny",
                      name: "Abdelmalek B",
                      profileUrl: "https://github.com/ixeny",
                      avatarUrl: "https://avatars.githubusercontent.com/u/13240836?v=4",
                    },
                    {
                      id: "github/8590040",
                      username: "BeStMaN-AlG",
                      name: "BeStMaN-AlG",
                      profileUrl: "https://github.com/BeStMaN-AlG",
                      avatarUrl: "https://avatars.githubusercontent.com/u/8590040?v=4",
                    },
                    {
                      id: "github/9981472",
                      username: "hamzamg",
                      name: "Hamza Messai",
                      profileUrl: "https://github.com/hamzamg",
                      avatarUrl: "https://avatars.githubusercontent.com/u/9981472?v=4",
                    },
                    {
                      id: "github/8518239",
                      username: "gitter-badger",
                      name: "The Gitter Badger",
                      profileUrl: "https://github.com/gitter-badger",
                      avatarUrl: "https://avatars.githubusercontent.com/u/8518239?v=4",
                    },
                    {
                      id: "github/6045176",
                      username: "amin0u",
                      name: "amin0u",
                      profileUrl: "https://github.com/amin0u",
                      avatarUrl: "https://avatars.githubusercontent.com/u/6045176?v=4",
                    },
                    {
                      id: "github/122603623",
                      username: "fahed-dj",
                      name: "fahed-dj",
                      profileUrl: "https://github.com/fahed-dj",
                      avatarUrl: "https://avatars.githubusercontent.com/u/122603623?v=4",
                    },
                    {
                      id: "github/5725402",
                      username: "wired777b",
                      name: "Beddakhe@Wired",
                      profileUrl: "https://github.com/wired777b",
                      avatarUrl: "https://avatars.githubusercontent.com/u/5725402?v=4",
                    },
                    {
                      id: "github/13586746",
                      username: "sbenhadja",
                      name: "s.benhadja",
                      profileUrl: "https://github.com/sbenhadja",
                      avatarUrl: "https://avatars.githubusercontent.com/u/13586746?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "AlgeriansCoinsObjectDetection",
              name: "Algerians Coins Object Detection",
              repositories: [
                {
                  provider: "github",
                  owner: "lablack576",
                  repository: "algerians_coins_object_detection",
                  stats: {
                    contributionCount: 0,
                    languages: ["Python"],
                  },
                  contributors: [
                    {
                      id: "github/74831105",
                      username: "lablack576",
                      name: "LABLACK Abdelmadjid",
                      profileUrl: "https://github.com/lablack576",
                      avatarUrl: "https://avatars.githubusercontent.com/u/74831105?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Archiy_Package",
              name: "Archy Package",
              repositories: [
                {
                  provider: "github",
                  owner: "yassine-youcefi",
                  repository: "Archy",
                  stats: {
                    contributionCount: 0,
                    languages: ["Python"],
                  },
                  contributors: [
                    {
                      id: "github/32022357",
                      username: "yassine-youcefi",
                      name: "yassine-youcefi",
                      profileUrl: "https://github.com/yassine-youcefi",
                      avatarUrl: "https://avatars.githubusercontent.com/u/32022357?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Check_Hadith",
              name: "Check Hadith",
              repositories: [
                {
                  provider: "github",
                  owner: "adelpro",
                  repository: "check-hadith",
                  stats: {
                    contributionCount: 0,
                    languages: ["HTML", "CSS", "JavaScript"],
                  },
                  contributors: [
                    {
                      id: "github/47066151",
                      username: "adelpro",
                      name: "adelpro",
                      profileUrl: "https://github.com/adelpro",
                      avatarUrl: "https://avatars.githubusercontent.com/u/47066151?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Classifieds",
              name: "Classifieds",
              repositories: [
                {
                  provider: "github",
                  owner: "bacloud23",
                  repository: "classifieds",
                  stats: {
                    languages: ["message", "documentation_url", "status"],
                  },
                  contributors: [],
                },
              ],
            },
            {
              slug: "Dzair_Data_Usage",
              name: "Dzair Data Usage",
              repositories: [
                {
                  provider: "github",
                  owner: "dfourcfive",
                  repository: "dzair_data_usage",
                  stats: {
                    contributionCount: 2,
                    languages: ["Dart"],
                  },
                  contributors: [
                    {
                      id: "github/48655772",
                      username: "dfourcfive",
                      name: "dfourcfive",
                      profileUrl: "https://github.com/dfourcfive",
                      avatarUrl: "https://avatars.githubusercontent.com/u/48655772?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "dzcode.io_website",
              name: "dzcode.io website",
              repositories: [
                {
                  provider: "github",
                  owner: "dzcode-io",
                  repository: "dzcode.io",
                  stats: {
                    contributionCount: 33,
                    languages: ["TypeScript", "SCSS", "JavaScript", "HTML", "Dockerfile"],
                  },
                  contributors: [
                    {
                      id: "github/20110076",
                      username: "ZibanPirate",
                      name: "Zakaria Mansouri",
                      profileUrl: "https://github.com/ZibanPirate",
                      avatarUrl: "https://avatars.githubusercontent.com/u/20110076?v=4",
                    },
                    {
                      id: "github/48713070",
                      username: "omdxp",
                      name: "Omar",
                      profileUrl: "https://github.com/omdxp",
                      avatarUrl: "https://avatars.githubusercontent.com/u/48713070?v=4",
                    },
                    {
                      id: "github/54677068",
                      username: "souhaib-benbouzid",
                      name: "souhaib",
                      profileUrl: "https://github.com/souhaib-benbouzid",
                      avatarUrl: "https://avatars.githubusercontent.com/u/54677068?v=4",
                    },
                    {
                      id: "github/34008130",
                      username: "abderrahmaneMustapha",
                      name: "Toumi abderrahmane",
                      profileUrl: "https://github.com/abderrahmaneMustapha",
                      avatarUrl: "https://avatars.githubusercontent.com/u/34008130?v=4",
                    },
                    {
                      id: "github/48206623",
                      username: "well-balanced",
                      name: "Woosik Kim",
                      profileUrl: "https://github.com/well-balanced",
                      avatarUrl: "https://avatars.githubusercontent.com/u/48206623?v=4",
                    },
                    {
                      id: "github/30445189",
                      username: "NurElHuda",
                      name: "Nour Tine",
                      profileUrl: "https://github.com/NurElHuda",
                      avatarUrl: "https://avatars.githubusercontent.com/u/30445189?v=4",
                    },
                    {
                      id: "github/4508994",
                      username: "khalilmansouri",
                      name: "Khalil",
                      profileUrl: "https://github.com/khalilmansouri",
                      avatarUrl: "https://avatars.githubusercontent.com/u/4508994?v=4",
                    },
                    {
                      id: "github/6825816",
                      username: "mohsenuss91",
                      name: "KHALDOUN Mohsen",
                      profileUrl: "https://github.com/mohsenuss91",
                      avatarUrl: "https://avatars.githubusercontent.com/u/6825816?v=4",
                    },
                    {
                      id: "github/47066151",
                      username: "adelpro",
                      name: "adelpro",
                      profileUrl: "https://github.com/adelpro",
                      avatarUrl: "https://avatars.githubusercontent.com/u/47066151?v=4",
                    },
                    {
                      id: "github/63064471",
                      username: "ilies-space",
                      name: "ilies ouldmenouer",
                      profileUrl: "https://github.com/ilies-space",
                      avatarUrl: "https://avatars.githubusercontent.com/u/63064471?v=4",
                    },
                    {
                      id: "github/5738893",
                      username: "adamayuda",
                      name: "Adam Ay",
                      profileUrl: "https://github.com/adamayuda",
                      avatarUrl: "https://avatars.githubusercontent.com/u/5738893?v=4",
                    },
                    {
                      id: "github/35309918",
                      username: "medilies",
                      name: "Mohamed Ilies",
                      profileUrl: "https://github.com/medilies",
                      avatarUrl: "https://avatars.githubusercontent.com/u/35309918?v=4",
                    },
                    {
                      id: "github/36046405",
                      username: "jusinamine",
                      name: "Mohammed El Amine Benkorreche",
                      profileUrl: "https://github.com/jusinamine",
                      avatarUrl: "https://avatars.githubusercontent.com/u/36046405?v=4",
                    },
                    {
                      id: "github/54083445",
                      username: "CA1R7",
                      name: "Mohammed amine bessaad",
                      profileUrl: "https://github.com/CA1R7",
                      avatarUrl: "https://avatars.githubusercontent.com/u/54083445?v=4",
                    },
                    {
                      id: "github/22131872",
                      username: "GeekAbdelouahed",
                      name: "Abdelouahed Medjoudja",
                      profileUrl: "https://github.com/GeekAbdelouahed",
                      avatarUrl: "https://avatars.githubusercontent.com/u/22131872?v=4",
                    },
                    {
                      id: "github/24633581",
                      username: "AhmedAbdelhak1",
                      name: "Ahmed Abdelhak",
                      profileUrl: "https://github.com/AhmedAbdelhak1",
                      avatarUrl: "https://avatars.githubusercontent.com/u/24633581?v=4",
                    },
                    {
                      id: "github/59193074",
                      username: "merouane2000",
                      name: "Merouane Mohamed Elamine ",
                      profileUrl: "https://github.com/merouane2000",
                      avatarUrl: "https://avatars.githubusercontent.com/u/59193074?v=4",
                    },
                    {
                      id: "github/16967174",
                      username: "SofianeHamlaoui",
                      name: "Sofiane Hamlaoui",
                      profileUrl: "https://github.com/SofianeHamlaoui",
                      avatarUrl: "https://avatars.githubusercontent.com/u/16967174?v=4",
                    },
                    {
                      id: "github/18232579",
                      username: "AM-77",
                      name: "Mohamed Amine",
                      profileUrl: "https://github.com/AM-77",
                      avatarUrl: "https://avatars.githubusercontent.com/u/18232579?v=4",
                    },
                    {
                      id: "github/37228315",
                      username: "AmineVolk",
                      name: "HamdiAmine",
                      profileUrl: "https://github.com/AmineVolk",
                      avatarUrl: "https://avatars.githubusercontent.com/u/37228315?v=4",
                    },
                    {
                      id: "github/37108275",
                      username: "BRAHAIM360",
                      name: "BRAHIM MAHIOUSSI",
                      profileUrl: "https://github.com/BRAHAIM360",
                      avatarUrl: "https://avatars.githubusercontent.com/u/37108275?v=4",
                    },
                    {
                      id: "github/17008973",
                      username: "DGLcsGaming",
                      name: "Faical Ghoul",
                      profileUrl: "https://github.com/DGLcsGaming",
                      avatarUrl: "https://avatars.githubusercontent.com/u/17008973?v=4",
                    },
                    {
                      id: "github/48655772",
                      username: "dfourcfive",
                      name: "dfourcfive",
                      profileUrl: "https://github.com/dfourcfive",
                      avatarUrl: "https://avatars.githubusercontent.com/u/48655772?v=4",
                    },
                    {
                      id: "github/41877815",
                      username: "bychis",
                      name: "Ismael Bokhari",
                      profileUrl: "https://github.com/bychis",
                      avatarUrl: "https://avatars.githubusercontent.com/u/41877815?v=4",
                    },
                    {
                      id: "github/22062732",
                      username: "Ghali-Benbernou",
                      name: "Ghali Benbernou",
                      profileUrl: "https://github.com/Ghali-Benbernou",
                      avatarUrl: "https://avatars.githubusercontent.com/u/22062732?v=4",
                    },
                    {
                      id: "github/26494942",
                      username: "khalilpreview",
                      name: "Ibrahim El Khalil",
                      profileUrl: "https://github.com/khalilpreview",
                      avatarUrl: "https://avatars.githubusercontent.com/u/26494942?v=4",
                    },
                    {
                      id: "github/60758152",
                      username: "Jidmaa",
                      name: "Benhenneda Majid",
                      profileUrl: "https://github.com/Jidmaa",
                      avatarUrl: "https://avatars.githubusercontent.com/u/60758152?v=4",
                    },
                    {
                      id: "github/102021206",
                      username: "abdel7ak96",
                      name: "Abdelhak RAHMOUNI",
                      profileUrl: "https://github.com/abdel7ak96",
                      avatarUrl: "https://avatars.githubusercontent.com/u/102021206?v=4",
                    },
                    {
                      id: "github/53213456",
                      username: "kingsaad98",
                      name: "Saad",
                      profileUrl: "https://github.com/kingsaad98",
                      avatarUrl: "https://avatars.githubusercontent.com/u/53213456?v=4",
                    },
                    {
                      id: "github/32209952",
                      username: "aimen08",
                      name: "Aymen Hamza",
                      profileUrl: "https://github.com/aimen08",
                      avatarUrl: "https://avatars.githubusercontent.com/u/32209952?v=4",
                    },
                    {
                      id: "github/450792",
                      username: "linuxscout",
                      name: "Taha Zerrouki (طه زروقي )",
                      profileUrl: "https://github.com/linuxscout",
                      avatarUrl: "https://avatars.githubusercontent.com/u/450792?v=4",
                    },
                    {
                      id: "github/10636704",
                      username: "bondbenz",
                      name: "bondbenz",
                      profileUrl: "https://github.com/bondbenz",
                      avatarUrl: "https://avatars.githubusercontent.com/u/10636704?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Face_Mask_Detect",
              name: "Facial Mask Detection",
              repositories: [
                {
                  provider: "github",
                  owner: "Ghali-Benbernou",
                  repository: "mask-detect",
                  stats: {
                    contributionCount: 0,
                    languages: ["Jupyter Notebook", "Python"],
                  },
                  contributors: [
                    {
                      id: "github/22062732",
                      username: "Ghali-Benbernou",
                      name: "Ghali Benbernou",
                      profileUrl: "https://github.com/Ghali-Benbernou",
                      avatarUrl: "https://avatars.githubusercontent.com/u/22062732?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Flutter_Reaction_Button",
              name: "Flutter Reaction Button",
              repositories: [
                {
                  provider: "github",
                  owner: "geekabdelouahed",
                  repository: "flutter-reaction-button",
                  stats: {
                    contributionCount: 22,
                    languages: ["Dart", "HTML", "Swift", "Kotlin", "Objective-C"],
                  },
                  contributors: [
                    {
                      id: "github/22131872",
                      username: "GeekAbdelouahed",
                      name: "Abdelouahed Medjoudja",
                      profileUrl: "https://github.com/GeekAbdelouahed",
                      avatarUrl: "https://avatars.githubusercontent.com/u/22131872?v=4",
                    },
                    {
                      id: "github/27334472",
                      username: "felixgabler",
                      name: "Felix Gabler",
                      profileUrl: "https://github.com/felixgabler",
                      avatarUrl: "https://avatars.githubusercontent.com/u/27334472?v=4",
                    },
                    {
                      id: "github/43379502",
                      username: "mostafaAbdelazim",
                      name: "Mostafa Abdelazim",
                      profileUrl: "https://github.com/mostafaAbdelazim",
                      avatarUrl: "https://avatars.githubusercontent.com/u/43379502?v=4",
                    },
                    {
                      id: "github/1782467",
                      username: "kvenn",
                      name: "Kyle Venn",
                      profileUrl: "https://github.com/kvenn",
                      avatarUrl: "https://avatars.githubusercontent.com/u/1782467?v=4",
                    },
                    {
                      id: "github/21372502",
                      username: "rlee1990",
                      name: "Social Jawn",
                      profileUrl: "https://github.com/rlee1990",
                      avatarUrl: "https://avatars.githubusercontent.com/u/21372502?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Godaddy_Reseller_Api_Client",
              name: "Godaddy Reseller Api Client",
              repositories: [
                {
                  provider: "github",
                  owner: "Omar-Belghaouti",
                  repository: "godaddy-reseller-api-client",
                  stats: {
                    contributionCount: 0,
                    languages: ["TypeScript", "JavaScript"],
                  },
                  contributors: [
                    {
                      id: "github/48713070",
                      username: "omdxp",
                      name: "Omar",
                      profileUrl: "https://github.com/omdxp",
                      avatarUrl: "https://avatars.githubusercontent.com/u/48713070?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Godaddy_Reseller",
              name: "Godaddy Reseller",
              repositories: [
                {
                  provider: "github",
                  owner: "bychis",
                  repository: "godaddy-reseller",
                  stats: {
                    contributionCount: 1,
                    languages: ["Python"],
                  },
                  contributors: [
                    {
                      id: "github/41877815",
                      username: "bychis",
                      name: "Ismael Bokhari",
                      profileUrl: "https://github.com/bychis",
                      avatarUrl: "https://avatars.githubusercontent.com/u/41877815?v=4",
                    },
                    {
                      id: "github/48713070",
                      username: "omdxp",
                      name: "Omar",
                      profileUrl: "https://github.com/omdxp",
                      avatarUrl: "https://avatars.githubusercontent.com/u/48713070?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Gold_Prices_Web",
              name: "Gold prices web",
              repositories: [
                {
                  provider: "github",
                  owner: "jusinamine",
                  repository: "gold-prices-web",
                  stats: {
                    contributionCount: 0,
                    languages: ["JavaScript", "CSS", "HTML"],
                  },
                  contributors: [
                    {
                      id: "github/36046405",
                      username: "jusinamine",
                      name: "Mohammed El Amine Benkorreche",
                      profileUrl: "https://github.com/jusinamine",
                      avatarUrl: "https://avatars.githubusercontent.com/u/36046405?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Kuliya",
              name: "Kuliya",
              repositories: [
                {
                  provider: "github",
                  owner: "dzcode-io",
                  repository: "kuliya",
                  stats: {
                    contributionCount: 20,
                    languages: [
                      "C",
                      "Rust",
                      "D",
                      "Java",
                      "JavaScript",
                      "TypeScript",
                      "CMake",
                      "C++",
                      "PHP",
                      "HTML",
                    ],
                  },
                  contributors: [
                    {
                      id: "github/48713070",
                      username: "omdxp",
                      name: "Omar",
                      profileUrl: "https://github.com/omdxp",
                      avatarUrl: "https://avatars.githubusercontent.com/u/48713070?v=4",
                    },
                    {
                      id: "github/20110076",
                      username: "ZibanPirate",
                      name: "Zakaria Mansouri",
                      profileUrl: "https://github.com/ZibanPirate",
                      avatarUrl: "https://avatars.githubusercontent.com/u/20110076?v=4",
                    },
                    {
                      id: "github/30445189",
                      username: "NurElHuda",
                      name: "Nour Tine",
                      profileUrl: "https://github.com/NurElHuda",
                      avatarUrl: "https://avatars.githubusercontent.com/u/30445189?v=4",
                    },
                    {
                      id: "github/5738893",
                      username: "adamayuda",
                      name: "Adam Ay",
                      profileUrl: "https://github.com/adamayuda",
                      avatarUrl: "https://avatars.githubusercontent.com/u/5738893?v=4",
                    },
                    {
                      id: "github/37108275",
                      username: "BRAHAIM360",
                      name: "BRAHIM MAHIOUSSI",
                      profileUrl: "https://github.com/BRAHAIM360",
                      avatarUrl: "https://avatars.githubusercontent.com/u/37108275?v=4",
                    },
                    {
                      id: "github/20127375",
                      username: "nacersalaheddine",
                      name: "Salah Eddine Nacer",
                      profileUrl: "https://github.com/nacersalaheddine",
                      avatarUrl: "https://avatars.githubusercontent.com/u/20127375?v=4",
                    },
                    {
                      id: "github/54677068",
                      username: "souhaib-benbouzid",
                      name: "souhaib",
                      profileUrl: "https://github.com/souhaib-benbouzid",
                      avatarUrl: "https://avatars.githubusercontent.com/u/54677068?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Laravel_Algerian_Education_System",
              name: "Laravel Algerian education system",
              repositories: [
                {
                  provider: "github",
                  owner: "elaborate-code",
                  repository: "laravel-algerian-education-system",
                  stats: {
                    contributionCount: 4,
                    languages: ["PHP"],
                  },
                  contributors: [
                    {
                      id: "github/35309918",
                      username: "medilies",
                      name: "Mohamed Ilies",
                      profileUrl: "https://github.com/medilies",
                      avatarUrl: "https://avatars.githubusercontent.com/u/35309918?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Laravel_Algerian_Provinces",
              name: "Laravel Algerian provinces",
              repositories: [
                {
                  provider: "github",
                  owner: "elaborate-code",
                  repository: "laravel-algerian-provinces",
                  stats: {
                    contributionCount: 4,
                    languages: ["PHP"],
                  },
                  contributors: [
                    {
                      id: "github/35309918",
                      username: "medilies",
                      name: "Mohamed Ilies",
                      profileUrl: "https://github.com/medilies",
                      avatarUrl: "https://avatars.githubusercontent.com/u/35309918?v=4",
                    },
                    {
                      id: "github/93465882",
                      username: "ghs-medilies",
                      name: "ghs-medilies",
                      profileUrl: "https://github.com/ghs-medilies",
                      avatarUrl: "https://avatars.githubusercontent.com/u/93465882?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Leblad",
              name: "Leblad",
              repositories: [
                {
                  provider: "github",
                  owner: "dzcode-io",
                  repository: "leblad",
                  stats: {
                    contributionCount: 7,
                    languages: ["JavaScript", "Shell"],
                  },
                  contributors: [
                    {
                      id: "github/9090674",
                      username: "Fcmam5",
                      name: "Fortas Abdeldjalil",
                      profileUrl: "https://github.com/Fcmam5",
                      avatarUrl: "https://avatars.githubusercontent.com/u/9090674?v=4",
                    },
                    {
                      id: "github/25663785",
                      username: "Redaloukil",
                      name: "LOUKIL Mohamed Reda",
                      profileUrl: "https://github.com/Redaloukil",
                      avatarUrl: "https://avatars.githubusercontent.com/u/25663785?v=4",
                    },
                    {
                      id: "github/45850487",
                      username: "oussamabouchikhi",
                      name: "Oussama Bouchikhi",
                      profileUrl: "https://github.com/oussamabouchikhi",
                      avatarUrl: "https://avatars.githubusercontent.com/u/45850487?v=4",
                    },
                    {
                      id: "github/37228315",
                      username: "AmineVolk",
                      name: "HamdiAmine",
                      profileUrl: "https://github.com/AmineVolk",
                      avatarUrl: "https://avatars.githubusercontent.com/u/37228315?v=4",
                    },
                    {
                      id: "github/52669445",
                      username: "anuragsati",
                      name: "Anurag sati",
                      profileUrl: "https://github.com/anuragsati",
                      avatarUrl: "https://avatars.githubusercontent.com/u/52669445?v=4",
                    },
                    {
                      id: "github/59431792",
                      username: "joeylnguyen",
                      name: "Joey Nguyen",
                      profileUrl: "https://github.com/joeylnguyen",
                      avatarUrl: "https://avatars.githubusercontent.com/u/59431792?v=4",
                    },
                    {
                      id: "github/16373348",
                      username: "spertch9a",
                      name: "Fortas Oussama Ilyes",
                      profileUrl: "https://github.com/spertch9a",
                      avatarUrl: "https://avatars.githubusercontent.com/u/16373348?v=4",
                    },
                    {
                      id: "github/16760467",
                      username: "xxKeefer",
                      name: "Daniel John Keefer",
                      profileUrl: "https://github.com/xxKeefer",
                      avatarUrl: "https://avatars.githubusercontent.com/u/16760467?v=4",
                    },
                    {
                      id: "github/34008130",
                      username: "abderrahmaneMustapha",
                      name: "Toumi abderrahmane",
                      profileUrl: "https://github.com/abderrahmaneMustapha",
                      avatarUrl: "https://avatars.githubusercontent.com/u/34008130?v=4",
                    },
                    {
                      id: "github/17519395",
                      username: "AMTazi",
                      name: "Abdelmounaim Tazi",
                      profileUrl: "https://github.com/AMTazi",
                      avatarUrl: "https://avatars.githubusercontent.com/u/17519395?v=4",
                    },
                    {
                      id: "github/12300606",
                      username: "abachi",
                      name: "Nasser Abachi",
                      profileUrl: "https://github.com/abachi",
                      avatarUrl: "https://avatars.githubusercontent.com/u/12300606?v=4",
                    },
                    {
                      id: "github/20110076",
                      username: "ZibanPirate",
                      name: "Zakaria Mansouri",
                      profileUrl: "https://github.com/ZibanPirate",
                      avatarUrl: "https://avatars.githubusercontent.com/u/20110076?v=4",
                    },
                  ],
                },
                {
                  provider: "github",
                  owner: "abderrahmaneMustapha",
                  repository: "leblad-py",
                  stats: {
                    contributionCount: 0,
                    languages: ["Python"],
                  },
                  contributors: [
                    {
                      id: "github/34008130",
                      username: "abderrahmaneMustapha",
                      name: "Toumi abderrahmane",
                      profileUrl: "https://github.com/abderrahmaneMustapha",
                      avatarUrl: "https://avatars.githubusercontent.com/u/34008130?v=4",
                    },
                    {
                      id: "github/20110076",
                      username: "ZibanPirate",
                      name: "Zakaria Mansouri",
                      profileUrl: "https://github.com/ZibanPirate",
                      avatarUrl: "https://avatars.githubusercontent.com/u/20110076?v=4",
                    },
                  ],
                },
                {
                  provider: "github",
                  owner: "omdxp",
                  repository: "leblad",
                  stats: {
                    contributionCount: 0,
                    languages: ["Go"],
                  },
                  contributors: [
                    {
                      id: "github/48713070",
                      username: "omdxp",
                      name: "Omar",
                      profileUrl: "https://github.com/omdxp",
                      avatarUrl: "https://avatars.githubusercontent.com/u/48713070?v=4",
                    },
                  ],
                },
                {
                  provider: "github",
                  owner: "omdxp",
                  repository: "leblad-rs",
                  stats: {
                    contributionCount: 1,
                    languages: ["Rust"],
                  },
                  contributors: [
                    {
                      id: "github/48713070",
                      username: "omdxp",
                      name: "Omar",
                      profileUrl: "https://github.com/omdxp",
                      avatarUrl: "https://avatars.githubusercontent.com/u/48713070?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "List_to_Tree_aka_l2t",
              name: "List to Tree",
              repositories: [
                {
                  provider: "github",
                  owner: "ZibanPirate",
                  repository: "l2t",
                  stats: {
                    contributionCount: 0,
                    languages: ["JavaScript", "TypeScript"],
                  },
                  contributors: [
                    {
                      id: "github/20110076",
                      username: "ZibanPirate",
                      name: "Zakaria Mansouri",
                      profileUrl: "https://github.com/ZibanPirate",
                      avatarUrl: "https://avatars.githubusercontent.com/u/20110076?v=4",
                    },
                    {
                      id: "github/99233",
                      username: "markomarkovic",
                      name: "Marko Marković",
                      profileUrl: "https://github.com/markomarkovic",
                      avatarUrl: "https://avatars.githubusercontent.com/u/99233?v=4",
                    },
                    {
                      id: "github/20281440",
                      username: "sainitishkumar",
                      name: "Sai Nitish Kumar",
                      profileUrl: "https://github.com/sainitishkumar",
                      avatarUrl: "https://avatars.githubusercontent.com/u/20281440?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Madinati_Meteo",
              name: "Weather Forecast",
              repositories: [
                {
                  provider: "github",
                  owner: "khalilpreview",
                  repository: "madinateo",
                  stats: {
                    contributionCount: 3,
                    languages: ["Python", "CSS", "HTML", "Shell"],
                  },
                  contributors: [
                    {
                      id: "github/26494942",
                      username: "khalilpreview",
                      name: "Ibrahim El Khalil",
                      profileUrl: "https://github.com/khalilpreview",
                      avatarUrl: "https://avatars.githubusercontent.com/u/26494942?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Melyon_Theme",
              name: "Melyon",
              repositories: [
                {
                  provider: "github",
                  owner: "CA1R7",
                  repository: "melyon",
                  stats: {
                    contributionCount: 0,
                    languages: ["TypeScript", "SCSS", "HTML", "JavaScript", "Procfile", "Shell"],
                  },
                  contributors: [
                    {
                      id: "github/54083445",
                      username: "CA1R7",
                      name: "Mohammed amine bessaad",
                      profileUrl: "https://github.com/CA1R7",
                      avatarUrl: "https://avatars.githubusercontent.com/u/54083445?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "MERN_Auth_Roles_Boilerplate",
              name: "MERN Auth Roles Boilerplate",
              repositories: [
                {
                  provider: "github",
                  owner: "adelpro",
                  repository: "MERN-auth-roles-boilerplate",
                  stats: {
                    contributionCount: 12,
                    languages: ["JavaScript", "CSS", "HTML"],
                  },
                  contributors: [
                    {
                      id: "github/47066151",
                      username: "adelpro",
                      name: "adelpro",
                      profileUrl: "https://github.com/adelpro",
                      avatarUrl: "https://avatars.githubusercontent.com/u/47066151?v=4",
                    },
                    {
                      id: "github/60202635",
                      username: "josephDev123",
                      name: "Uzuegbu, Joseph",
                      profileUrl: "https://github.com/josephDev123",
                      avatarUrl: "https://avatars.githubusercontent.com/u/60202635?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Mishkal",
              name: "Mishkal",
              repositories: [
                {
                  provider: "github",
                  owner: "linuxscout",
                  repository: "mishkal",
                  stats: {
                    contributionCount: 14,
                    languages: [
                      "Python",
                      "HTML",
                      "C",
                      "JavaScript",
                      "Smarty",
                      "Shell",
                      "CSS",
                      "Makefile",
                      "Batchfile",
                    ],
                  },
                  contributors: [
                    {
                      id: "github/450792",
                      username: "linuxscout",
                      name: "Taha Zerrouki (طه زروقي )",
                      profileUrl: "https://github.com/linuxscout",
                      avatarUrl: "https://avatars.githubusercontent.com/u/450792?v=4",
                    },
                    {
                      id: "github/3716399",
                      username: "abougouffa",
                      name: "Abdelhak Bougouffa",
                      profileUrl: "https://github.com/abougouffa",
                      avatarUrl: "https://avatars.githubusercontent.com/u/3716399?v=4",
                    },
                    {
                      id: "github/42673854",
                      username: "mohammad-albarham",
                      name: "MOHAMMAD ALBARHAM",
                      profileUrl: "https://github.com/mohammad-albarham",
                      avatarUrl: "https://avatars.githubusercontent.com/u/42673854?v=4",
                    },
                    {
                      id: "github/1501944",
                      username: "valdisvi",
                      name: "Valdis Vitolins",
                      profileUrl: "https://github.com/valdisvi",
                      avatarUrl: "https://avatars.githubusercontent.com/u/1501944?v=4",
                    },
                    {
                      id: "github/4129218",
                      username: "lokal-profil",
                      name: "André Costa",
                      profileUrl: "https://github.com/lokal-profil",
                      avatarUrl: "https://avatars.githubusercontent.com/u/4129218?v=4",
                    },
                    {
                      id: "github/315228",
                      username: "assem-ch",
                      name: "Assem Ch",
                      profileUrl: "https://github.com/assem-ch",
                      avatarUrl: "https://avatars.githubusercontent.com/u/315228?v=4",
                    },
                    {
                      id: "github/1632566",
                      username: "Fahad-Alsaidi",
                      name: "Fahad Al-Saidi",
                      profileUrl: "https://github.com/Fahad-Alsaidi",
                      avatarUrl: "https://avatars.githubusercontent.com/u/1632566?v=4",
                    },
                    {
                      id: "github/180753",
                      username: "karlwettin",
                      name: "Karl Wettin",
                      profileUrl: "https://github.com/karlwettin",
                      avatarUrl: "https://avatars.githubusercontent.com/u/180753?v=4",
                    },
                    {
                      id: "github/18899702",
                      username: "naskio",
                      name: "Mehdi Nassim KHODJA",
                      profileUrl: "https://github.com/naskio",
                      avatarUrl: "https://avatars.githubusercontent.com/u/18899702?v=4",
                    },
                    {
                      id: "github/9639436",
                      username: "PAHXO",
                      name: "PAHXO",
                      profileUrl: "https://github.com/PAHXO",
                      avatarUrl: "https://avatars.githubusercontent.com/u/9639436?v=4",
                    },
                    {
                      id: "github/45575009",
                      username: "harabat",
                      name: "harabat",
                      profileUrl: "https://github.com/harabat",
                      avatarUrl: "https://avatars.githubusercontent.com/u/45575009?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Moadaly",
              name: "Moadaly: Moyenne calculatrice",
              repositories: [
                {
                  provider: "github",
                  owner: "madjsmail",
                  repository: "moadaly",
                  stats: {
                    contributionCount: 2,
                    languages: ["JavaScript", "HTML", "CSS", "Sass", "Makefile"],
                  },
                  contributors: [
                    {
                      id: "github/40744470",
                      username: "madjsmail",
                      name: "Smail Abd El Madjid",
                      profileUrl: "https://github.com/madjsmail",
                      avatarUrl: "https://avatars.githubusercontent.com/u/40744470?v=4",
                    },
                    {
                      id: "github/450792",
                      username: "linuxscout",
                      name: "Taha Zerrouki (طه زروقي )",
                      profileUrl: "https://github.com/linuxscout",
                      avatarUrl: "https://avatars.githubusercontent.com/u/450792?v=4",
                    },
                    {
                      id: "github/75437079",
                      username: "mintech-dot",
                      name: "mintech-dot",
                      profileUrl: "https://github.com/mintech-dot",
                      avatarUrl: "https://avatars.githubusercontent.com/u/75437079?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Mylinks_Space",
              name: "Mylinks",
              repositories: [
                {
                  provider: "github",
                  owner: "bacloud23",
                  repository: "mylinks",
                  stats: {
                    contributionCount: 1,
                    languages: ["HTML", "JavaScript"],
                  },
                  contributors: [
                    {
                      id: "github/130276583",
                      username: "bacloud23",
                      name: "bacloud23",
                      profileUrl: "https://github.com/bacloud23",
                      avatarUrl: "https://avatars.githubusercontent.com/u/130276583?v=4",
                    },
                    {
                      id: "github/31427850",
                      username: "ImgBotApp",
                      name: "Imgbot",
                      profileUrl: "https://github.com/ImgBotApp",
                      avatarUrl: "https://avatars.githubusercontent.com/u/31427850?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Openadhan",
              name: "Openadhan",
              repositories: [
                {
                  provider: "github",
                  owner: "adelpro",
                  repository: "Openadhan",
                  stats: {
                    contributionCount: 6,
                    languages: ["JavaScript", "CSS", "HTML"],
                  },
                  contributors: [
                    {
                      id: "github/47066151",
                      username: "adelpro",
                      name: "adelpro",
                      profileUrl: "https://github.com/adelpro",
                      avatarUrl: "https://avatars.githubusercontent.com/u/47066151?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "PHP_JSON_Tongue",
              name: "PHP JSON Tongue",
              repositories: [
                {
                  provider: "github",
                  owner: "elaborate-code",
                  repository: "php-json-tongue",
                  stats: {
                    contributionCount: 0,
                    languages: ["PHP"],
                  },
                  contributors: [
                    {
                      id: "github/35309918",
                      username: "medilies",
                      name: "Mohamed Ilies",
                      profileUrl: "https://github.com/medilies",
                      avatarUrl: "https://avatars.githubusercontent.com/u/35309918?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Python_Complex",
              name: "Python Complex",
              repositories: [
                {
                  provider: "github",
                  owner: "Omar-Belghaouti",
                  repository: "PythonComplex",
                  stats: {
                    contributionCount: 0,
                    languages: ["Python", "Jupyter Notebook"],
                  },
                  contributors: [
                    {
                      id: "github/48713070",
                      username: "omdxp",
                      name: "Omar",
                      profileUrl: "https://github.com/omdxp",
                      avatarUrl: "https://avatars.githubusercontent.com/u/48713070?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "QuranIPFS",
              name: "QuranIPFS",
              repositories: [
                {
                  provider: "github",
                  owner: "adelpro",
                  repository: "Quranipfs",
                  stats: {
                    contributionCount: 0,
                    languages: ["HTML", "JavaScript", "CSS"],
                  },
                  contributors: [
                    {
                      id: "github/47066151",
                      username: "adelpro",
                      name: "adelpro",
                      profileUrl: "https://github.com/adelpro",
                      avatarUrl: "https://avatars.githubusercontent.com/u/47066151?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "React_Glassmorphism_Components",
              name: "React glassmorphism components",
              repositories: [
                {
                  provider: "github",
                  owner: "jusinamine",
                  repository: "react-glassmorphism-components",
                  stats: {
                    contributionCount: 0,
                    languages: ["JavaScript", "CSS", "HTML", "Shell"],
                  },
                  contributors: [
                    {
                      id: "github/36046405",
                      username: "jusinamine",
                      name: "Mohammed El Amine Benkorreche",
                      profileUrl: "https://github.com/jusinamine",
                      avatarUrl: "https://avatars.githubusercontent.com/u/36046405?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "React_Help_Create",
              name: "React Help Create",
              repositories: [
                {
                  provider: "github",
                  owner: "Omar-Belghaouti",
                  repository: "react-help-create",
                  stats: {
                    contributionCount: 1,
                    languages: ["JavaScript"],
                  },
                  contributors: [
                    {
                      id: "github/48713070",
                      username: "omdxp",
                      name: "Omar",
                      profileUrl: "https://github.com/omdxp",
                      avatarUrl: "https://avatars.githubusercontent.com/u/48713070?v=4",
                    },
                    {
                      id: "github/60205439",
                      username: "Blackflare002",
                      name: "Shane Phillips",
                      profileUrl: "https://github.com/Blackflare002",
                      avatarUrl: "https://avatars.githubusercontent.com/u/60205439?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "React_Native_Currency_Converter",
              name: "ReactNative Currency Converter",
              repositories: [
                {
                  provider: "github",
                  owner: "ilies-space",
                  repository: "currency_converter_rn",
                  stats: {
                    contributionCount: 0,
                    languages: ["JavaScript", "Java", "Objective-C", "Starlark", "Ruby"],
                  },
                  contributors: [
                    {
                      id: "github/63064471",
                      username: "ilies-space",
                      name: "ilies ouldmenouer",
                      profileUrl: "https://github.com/ilies-space",
                      avatarUrl: "https://avatars.githubusercontent.com/u/63064471?v=4",
                    },
                    {
                      id: "github/48713070",
                      username: "omdxp",
                      name: "Omar",
                      profileUrl: "https://github.com/omdxp",
                      avatarUrl: "https://avatars.githubusercontent.com/u/48713070?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "React_Native_Help_Create",
              name: "React Native Help Create",
              repositories: [
                {
                  provider: "github",
                  owner: "Omar-Belghaouti",
                  repository: "react-native-help-create",
                  stats: {
                    contributionCount: 3,
                    languages: ["JavaScript", "MDX", "TypeScript", "CSS"],
                  },
                  contributors: [
                    {
                      id: "github/48713070",
                      username: "omdxp",
                      name: "Omar",
                      profileUrl: "https://github.com/omdxp",
                      avatarUrl: "https://avatars.githubusercontent.com/u/48713070?v=4",
                    },
                    {
                      id: "github/19733683",
                      username: "snyk-bot",
                      name: "Snyk bot",
                      profileUrl: "https://github.com/snyk-bot",
                      avatarUrl: "https://avatars.githubusercontent.com/u/19733683?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "React_Project_Builder",
              name: "React Project Builder",
              repositories: [
                {
                  provider: "github",
                  owner: "AmineVolk",
                  repository: "react-project-builder",
                  stats: {
                    contributionCount: 0,
                    languages: ["JavaScript"],
                  },
                  contributors: [
                    {
                      id: "github/37228315",
                      username: "AmineVolk",
                      name: "HamdiAmine",
                      profileUrl: "https://github.com/AmineVolk",
                      avatarUrl: "https://avatars.githubusercontent.com/u/37228315?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "STRM_Test",
              name: "STRM test",
              repositories: [
                {
                  provider: "github",
                  owner: "linuxscout",
                  repository: "strm-tests",
                  stats: {
                    contributionCount: 9,
                    languages: ["Python", "TeX", "HTML", "Makefile"],
                  },
                  contributors: [
                    {
                      id: "github/450792",
                      username: "linuxscout",
                      name: "Taha Zerrouki (طه زروقي )",
                      profileUrl: "https://github.com/linuxscout",
                      avatarUrl: "https://avatars.githubusercontent.com/u/450792?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Violence_Detection",
              name: "violence detection",
              repositories: [
                {
                  provider: "github",
                  owner: "jusinamine",
                  repository: "violence_detection",
                  stats: {
                    contributionCount: 13,
                    languages: ["Jupyter Notebook", "JavaScript", "CSS", "Python", "HTML"],
                  },
                  contributors: [
                    {
                      id: "github/36046405",
                      username: "jusinamine",
                      name: "Mohammed El Amine Benkorreche",
                      profileUrl: "https://github.com/jusinamine",
                      avatarUrl: "https://avatars.githubusercontent.com/u/36046405?v=4",
                    },
                    {
                      id: "github/32022357",
                      username: "yassine-youcefi",
                      name: "yassine-youcefi",
                      profileUrl: "https://github.com/yassine-youcefi",
                      avatarUrl: "https://avatars.githubusercontent.com/u/32022357?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Voice_Translator_React_Native",
              name: "ReactNative Voice Translator",
              repositories: [
                {
                  provider: "github",
                  owner: "ilies-space",
                  repository: "voiceTranslator-reactNative",
                  stats: {
                    contributionCount: 0,
                    languages: ["JavaScript", "Java", "Objective-C", "Starlark", "Ruby"],
                  },
                  contributors: [
                    {
                      id: "github/63064471",
                      username: "ilies-space",
                      name: "ilies ouldmenouer",
                      profileUrl: "https://github.com/ilies-space",
                      avatarUrl: "https://avatars.githubusercontent.com/u/63064471?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "Weather_Forecast",
              name: "Weather Forecast",
              repositories: [
                {
                  provider: "github",
                  owner: "jidmaa",
                  repository: "weather-forecast",
                  stats: {
                    contributionCount: 0,
                    languages: ["JavaScript", "CSS", "HTML"],
                  },
                  contributors: [
                    {
                      id: "github/60758152",
                      username: "Jidmaa",
                      name: "Benhenneda Majid",
                      profileUrl: "https://github.com/Jidmaa",
                      avatarUrl: "https://avatars.githubusercontent.com/u/60758152?v=4",
                    },
                  ],
                },
              ],
            },
            {
              slug: "WeatherVenue",
              name: "WeatherVenue",
              repositories: [
                {
                  provider: "github",
                  owner: "bacloud23",
                  repository: "WeatherVenue",
                  stats: {
                    languages: ["message", "documentation_url", "status"],
                  },
                  contributors: [],
                },
              ],
            },
            {
              slug: "who_want_to_millionaire",
              name: "Who wants to be a millionaire app mulilingual",
              repositories: [
                {
                  provider: "github",
                  owner: "brahaim360",
                  repository: "who-want-to-be-millionere",
                  stats: {
                    contributionCount: 0,
                    languages: ["JavaScript", "CSS", "HTML"],
                  },
                  contributors: [
                    {
                      id: "github/37108275",
                      username: "BRAHAIM360",
                      name: "BRAHIM MAHIOUSSI",
                      profileUrl: "https://github.com/BRAHAIM360",
                      avatarUrl: "https://avatars.githubusercontent.com/u/37108275?v=4",
                    },
                  ],
                },
              ],
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ] as any,
        }),
      );
    } catch (error) {
      dispatch(projectsPageSlice.actions.set({ projectsList: "ERROR" }));
    }
  };
