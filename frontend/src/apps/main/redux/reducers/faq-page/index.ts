const INITIAL_STATE = {
  faqData: [
    // general questions
    {
      question: "What are the Goals of dzCode ?",
      answer:
        "Our main goals are, First build up a strong open source software community in Algeria, Higher software quality in algeria and help algerian developers gain experience in a professional environment.",
    },
    {
      question: "How to join dzCode ?",
      answer:
        "By joining our slack channel https://join.slack.com/t/dzcode/shared_invite/zt-ek9kscb7-m8z_~cBjX79l~uchuABPFQ",
    },
    {
      question: "Where can I start ?",
      answer:
        "First join our slack channel, Second check out the latest projects if you want to code. or checkout article section to read some maybe write your own. socialize we have a great friendly community! make sure to have fun.",
    },
    {
      question: "How to join slack channel?",
      answer:
        "Here is an invitation https://join.slack.com/t/dzcode/shared_invite/zt-ek9kscb7-m8z_~cBjX79l~uchuABPFQ, enjoy!",
    },
    {
      question: "I don't have experience in coding can i join?",
      answer:
        "Absolutely, you can read articles, socialize and have fun. while you are at you can learn to code.",
    },
    {
      question: "Is dzCode for Algerians only ?",
      answer:
        "No, we focus on solving algerian problems.but dzCode is open for everyone.",
    },
    {
      question: "Why Algerian software market?",
      answer: "Huge potential, better software, better life! 😄",
    },
    {
      question: "Why open source ?",
      answer:
        "Open source licensing encourages innovation through collaboration. give a chance to work at a professional environment for everyone.and contribute to real production projects.",
    },
    {
      question: "How can I help you ?",
      answer:
        "There is many ways to help, you like coding checkout our current projects https://www.dzcode.io/Projects , you like writing ? you can write IT related articles https://www.dzcode.io/Articles, you can add your own project, help out with design or even putting suggestion. 😄",
    },
    {
      question: "I know X technology and i'm good at it how can I help ?",
      answer:
        "Checkout our current projects at https://www.dzcode.io/Projects, look for a project that uses this technology, clone it and start coding 😄",
    },
    {
      question: "How to get the most out of dzCode?",
      answer:
        "Contribute to our projects and put them in your resume, read and write some article to learn and share knowledge, socialize, make connection and expand your network, connection help you get a job, make friendships and have fun !.",
    },
    {
      question: "How can I contact you ?",
      answer: "you can contact us through our email contact@dzcode.io.",
    },
    {
      question: "Are there any meetups ?",
      answer:
        "Currently there are no meetups due to covid-19 pandemic but there will be after that inchallah",
    },
    {
      question: "How can I sponsor dzCode ?",
      answer:
        "We would like to to have a chat with you please pm us at contact@dzcode.io",
    },

    // article related questions
    {
      question: "The Articles should they be in English ?",
      answer:
        "yes, to reach a wide range of audience we will add a feature to allow article localization and multiple language articles in the future.",
    },
    {
      question: "Can I write about anything ?",
      answer: "as long as its IT related yes you can write about anything.",
    },

    // project related questions
    {
      question: "Can I add a my project ?",
      answer:
        "absolutely, if it solves an algerian problem. or target the algerian user.",
    },
    {
      question: "Can I list my project in dzCode ?",
      answer:
        "yes you can list your project at dzCode, as long as it follows our rules, we define dzCode as an index to open source Algeria",
    },
    {
      question: "Who will maintain my project ?",
      answer:
        "you're the one responsible to maintain it. however we will provide you with all the technical help and privileges needed to do so.",
    },
    {
      question: "Why should i add my project to dzCode ?",
      answer:
        "We define dzCode as an index to open source Algeria. there are many benefits to indexing your projects at dzCode. one of the important once is getting noticed by the algerian development community.",
    },
  ],
};

export const faqPage = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
