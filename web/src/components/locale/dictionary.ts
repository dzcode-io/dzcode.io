import { PyramidSplitString } from "@dzcode.io/utils/dist/ts";

export type AllDictionaryKeys = keyof typeof dictionary;

type DictionaryGroups = PyramidSplitString<AllDictionaryKeys, "-">[number];

export type DictionaryKeys<G extends DictionaryGroups> = AllDictionaryKeys &
  (`${G}-${string}` | `${G}`);

// @TODO-ZM: use a de-deduplication tool for repeated text

export const dictionary = {
  "navbar-section-contribute": { en: "Contribute", ar: "أساهم" },
  "navbar-section-connect": { en: "Connect", ar: "أتواصل" },
  "navbar-section-learn": { en: "Learn", ar: "أتعلّم" },
  "navbar-section-projects": { en: "Projects", ar: "مشاريع" },
  "navbar-section-articles": { en: "Articles", ar: "مقالات" },
  "navbar-section-faq": { en: "FAQ", ar: "أسئلة / أجوبة" },

  "footer-category-title-helpful-links": {
    en: "Helpful Links",
    ar: "روابط مفيدة",
  },
  "footer-category-link-text-home": { en: "Home", ar: "الصفحة الرئيسية" },
  "footer-category-link-text-learn": { en: "Learn", ar: "اتعلم" },
  "footer-category-link-text-projects": { en: "Projects", ar: "مشاريع" },
  "footer-category-link-text-articles": { en: "Articles", ar: "مقالات" },
  "footer-category-link-text-faq": { en: "FAQ", ar: "أسئلة / أجوبة" },
  "footer-category-title-social-media": {
    en: "Social Media",
    ar: "وسائل التواصل الاجتماعي",
  },
  "footer-category-link-text-github": { en: "Github", ar: "جيتهاب" },
  "footer-category-link-text-discord": { en: "Discord", ar: "ديسكورد" },
  "footer-category-link-text-facebook": { en: "Facebook", ar: "فيسبوك" },
  "footer-category-link-text-instagram": { en: "Instagram", ar: "انستغرام" },
  "footer-category-link-text-youTube": { en: "YouTube", ar: "يوتيوب" },
  "footer-category-link-text-twitter": { en: "Twitter", ar: "تويتر" },
  "footer-category-link-text-linkedIn": { en: "LinkedIn", ar: "لينكد إن" },
  "faq-title": {
    en: "Frequently Asked Questions | DzCode i/o",
    ar: "الأسئلة الأكثر طرحًا | DzCode i / o",
  },
  "faq-description": {
    en: "Frequently asked questions about DzCode i/o",
    ar: "الأسئلة المتداولة حول DzCode i / o",
  },
  "faq-header-title": {
    en: "Frequently Asked Questions",
    ar: "الأسئلة الأكثر طرحًا",
  },
  "faq-need-help": {
    en: "Still need help? send us an email at ",
    ar: "هل ما زلت بحاجة إلى المساعدة؟ أرسل إلينا بريدًا إلكترونيًا على ",
  },
  "faq-topic-1": {
    en: "General",
    ar: "أسئلة عامة",
  },
  "faq-topic-1-question-1": {
    en: "What exactly is DzCode i/o ?",
    ar: "ما هو DzCode i/o بالضبط؟",
  },
  "faq-topic-1-answer-1": {
    en: `An open-source online community of Algerian developers, collaborating on solving Algerian technical problems.`,
    ar: `مجتمع مفتوح المصدر على الإنترنت للمطورين الجزائريين ، يتعاونون في حل المشاكل التقنية الجزائرية.`,
  },
  "faq-topic-1-question-2": {
    en: "What are the goals of DzCode i/o ?",
    ar: "ما هي أهداف DzCode i/o؟",
  },
  "faq-topic-1-answer-2": {
    en: `@TODO: reflect the latest goals of DzCode i/o`,
    ar: `@TODO: reflect the latest goals of DzCode i/o`,
  },
  "faq-topic-1-question-3": {
    en: "What would I benefit from DzCode i/o?",
    ar: "ما الذي سأستفيد منه من DzCode i/o؟",
  },
  "faq-topic-1-answer-3": {
    en: `
- You will meet other Algerian developers, experienced and noobs, and there you can expand your professional network!
- You'll get to experience a professional environment, which is completely different than the one you used to in school, uni, or on YouTube 😄.
- Your contribution will be shown on your Github profile, and that is a big plus in your CV!
`,
    ar: `
- ستلتقي بمطورين جزائريين آخرين ، من ذوي الخبرة والمبتدئين ، وهناك يمكنك توسيع شبكتك المهنية!
- ستتمتع بتجربة بيئة احترافية مختلفة تمامًا عن تلك التي اعتدت عليها في المدرسة أو الجامعة أو على YouTube 😄.
- ستظهر مساهمتك في ملفك الشخصي على Github ، وهذه إضافة كبيرة في سيرتك الذاتية!
`,
  },
  "faq-topic-2": {
    en: "Participation",
    ar: "المشاركة",
  },
  "faq-topic-2-question-1": {
    en: "How do I join DzCode i/o ?",
    ar: "كيف أنضم إلى DzCode i / o؟",
  },
  "faq-topic-2-answer-1": {
    en: `We're most active in Discord, we recommend you [join us there](https://discord.gg/TGbPsSMJC2).`,
    ar: `نحن أكثر نشاطًا في Discord ، نوصيك بـ [الانضمام إلينا هناك](https://discord.gg/TGbPsSMJC2).`,
  },
  "faq-topic-2-question-2": {
    en: "I want to code, where should I start?",
    ar: "أرغب في البرمجة ، من أين أبدأ؟",
  },
  "faq-topic-2-answer-2": {
    en: `Go to [/Contribute](/Contribute) page, you will see a list of projects with available tasks for you to pick from whatever you like and start programming 🔥.`,
    ar: `انتقل إلى صفحة [المساهمة](/Contribute) ، سترى قائمة بالمشاريع بالمهام المتاحة لتختار منها ما تريد وتبدأ البرمجة 🔥.`,
  },
  "faq-topic-2-question-3": {
    en: "I like the idea, what are the different ways I can contribute to DzCode i/o ?",
    ar: "تعجبني الفكرة ، ما هي الطرق المختلفة التي يمكنني من خلالها المساهمة في DzCode i/o؟",
  },
  "faq-topic-2-answer-3": {
    en: `
Besides the open tasks on [/Contribute](/Contribute) page, you can also contribute to DzCode i/o by:

- Adding your open-source projects to the dzcode.io website.
`,
    ar: `
إلى جانب المهام المفتوحة في صفحة المساهمة ، يمكنك أيضًا المساهمة في DzCode i / o عن طريق:

- إضافة مشاريعك مفتوحة المصدر إلى موقع dzcode.io .
`,
  },
  "faq-topic-4": {
    en: "Projects",
    ar: "المشاريع",
  },
  "faq-topic-4-question-1": {
    en: "How to add my open-source project to dzcode.io",
    ar: "كيفية إضافة مشروعي مفتوح المصدر إلى dzcode.io",
  },
  "faq-topic-4-answer-1": {
    en: `Follow [these steps](https://github.com/dzcode-io/dzcode.io/blob/main/data/models/documentation/About_dzcode_io/Add_Your_Project_To_dzcode_io/content.md).`,
    ar: `اتبع هذه [الخطوات](https://github.com/dzcode-io/dzcode.io/blob/main/data/models/documentation/About_dzcode_io/Add_Your_Project_To_dzcode_io/content.md).`,
  },
  "faq-topic-4-question-2": {
    en: "What makes my project eligible to be added to dzcode.io",
    ar: "ما الذي يجعل مشروعي مؤهلاً للإضافة إلى dzcode.io",
  },
  "faq-topic-4-answer-2": {
    en: `It has to solve an Algerian problem, or, be written by an Algerian Developer.`,
    ar: `يجب أن تحل مشكلة جزائرية ، أو أن يكتبها مطور جزائري.`,
  },
  "faq-topic-4-question-3": {
    en: "Why should I add my project to dzcode.io?",
    ar: "لماذا يجب علي إضافة مشروعي إلى dzcode.io؟",
  },
  "faq-topic-4-answer-3": {
    en: `
- Your project will potentially get noticed by more Algerian developers.
- You will get potential contributions from other developers, which will eventually make your piece of software better.
`,
    ar: `
- من المحتمل أن يحظى مشروعك باهتمام المزيد من المطورين الجزائريين.
- ستحصل على مساهمات محتملة من مطورين آخرين ، مما سيجعل برنامجك في النهاية أفضل.
`,
  },
  "landing-title": {
    en: "Algeria Codes | DzCode i/o",
    ar: "الجزائر تبرمج | DzCode i / o",
  },
  "landing-description": {
    en: "DzCode i/o is community of developers that tries to solve technical problems in Algeria via open-source software, this website helps you find, contribute and add to the list of open-source projects that solve some technical problems in Algerian.",
    ar: "DzCode i / o هو مجتمع من المطورين الذين يحاولون حل المشاكل التقنية في الجزائر عبر برمجيات مفتوحة المصدر ، وهذا الموقع يساعدك في العثور على ، والمساهمة والإضافة إلى قائمة المشاريع مفتوحة المصدر التي تحل بعض المشاكل التقنية في الجزائر.",
  },
  "landing-heading-title": {
    en: `Algerian Open-Source Community`,
    ar: `مجموعة جزائرية للبرامج مفتوحة المصدر`,
  },
  "landing-heading-subtitle": {
    en: `DzCode i/o helps you find, contribute and add to the list of open-source projects that solve Algerian problems.`,
    ar: `يساعدك DzCode i / o في العثور على والمساهمة والإضافة إلى قائمة المشاريع مفتوحة المصدر التي تحل مشاكل الجزائر.`,
  },
  "landing-cta-button-1": {
    en: "Explore Projects",
    ar: "استكشف المشاريع",
  },
  "landing-cta-button-2": {
    en: "Make a Contribution",
    ar: "قدم مساهمة",
  },
  "landing-milestones-title": {
    en: "Project roadmap",
    ar: "خارطة طريق المشروع",
  },
  "landing-milestones-subtitle": {
    en: "See how and when new features are released and share your ideas and feedback to help us better shape dzcode roadmap",
    ar: "تعرف على كيفية ووقت إصدار الميزات الجديدة وشارك بأفكارك وملاحظاتك لمساعدتنا في تشكيل خارطة طريق dzcode بشكل أفضل",
  },
  "team-title": {
    en: "Meet the team! | DzCode i/o",
    ar: "تعرّف على الفريق! | DzCode i / o",
  },
  "team-description": {
    en: "Meet and connect with all the contributors of all the listed projects on dzcode.io website",
    ar: "تعرف على جميع المساهمين في جميع المشاريع المدرجة وتواصل معهم على موقع dzcode.io الإلكتروني",
  },
  "team-header-title": {
    en: "Get to know our team 💻",
    ar: "تعرف على فريقنا 💻",
  },
  "team-card-cta-button": {
    en: "Contributions",
    ar: "المساهمات",
  },
  "team-card-repositories": {
    en: "Repositories",
    ar: "مستودعات",
  },
  "contributor-title-pre": {
    en: "See the profile page of",
    ar: "انظر إلى صفحة الملف الشخصي لـ",
  },
  "contributor-title-post": {
    en: " | DzCode i/o",
    ar: " | DzCode i / o",
  },
  "contributor-breadcrumbs-1": {
    en: "Team",
    ar: "الفريق",
  },
  "contributor-activities": {
    en: "Total Activities",
    ar: "إجمالي الأنشطة",
  },
  "contributor-from-n-repositories-pre": {
    en: "From",
    ar: "من",
  },
  "contributor-from-n-repositories-post": {
    en: "repositories",
    ar: "مستودعات",
  },
  "contributor-contributed-to-projects": {
    en: "Contributed to projects",
    ar: "ساهم في المشاريع",
  },
  "contributor-needs-help": {
    en: "Needs help with",
    ar: "يحتاج مساعدة في",
  },
  "projects-title": {
    en: "Browse a growing list of Algerian open-source projects | DzCode i/o",
    ar: "تصفح قائمة المشاريع الجزائرية مفتوحة المصدر | DzCode i / o",
  },
  "projects-description": {
    en: "Browse a growing list of Algerian open-source projects and be up-to-date with the state of open-source software in Algeria, you can also add your project to the list!",
    ar: "تصفح قائمة متزايدة من المشاريع الجزائرية مفتوحة المصدر وكن على اطلاع دائم بأحدث البرامج مفتوحة المصدر في الجزائر ، كما يمكنك إضافة مشروعك إلى القائمة!",
  },
  "projects-header-title": {
    en: "Open Source Projects",
    ar: "مشاريع مفتوحة المصدر",
  },
  "projects-card-cta-button": {
    en: "Details",
    ar: "تفاصيل",
  },
  "project-title-pre": {
    en: "See the details of",
    ar: "انظر إلى تفاصيل مشروع",
  },
  "project-title-post": {
    en: "project | DzCode i/o",
    ar: " | DzCode i / o",
  },
  "project-breadcrumbs-1": {
    en: "Projects",
    ar: "مشاريع",
  },
  "project-total-stars": {
    en: "Total Stars",
    ar: "إجمالي النجوم",
  },
  "project-from-n-repositories-pre": {
    en: "From",
    ar: "من",
  },
  "project-from-n-repositories-post": {
    en: "repositories",
    ar: "مستودعات",
  },
  "project-total-activities": {
    en: "Total Activities",
    ar: "إجمالي الأنشطة",
  },
  "project-from-n-contributors-pre": {
    en: "From",
    ar: "من",
  },
  "project-from-n-contributors-post": {
    en: "contributors",
    ar: "مساهمين",
  },
  "project-contributors": {
    en: "Contributors",
    ar: "مساهمين",
  },
  "project-show-top-n": {
    en: "Show top",
    ar: "عرض أعلى",
  },
  "project-repositories": {
    en: "Repositories",
    ar: "مستودعات",
  },
  "project-you-can-help": {
    en: "You can help",
    ar: "يمكنك المساعدة",
  },
  "notfound-title": {
    en: "A broken link? | DzCode i/o",
    ar: "عنوان url معطل؟ | DzCode i / o",
  },
  "notfound-description": {
    en: "A broken link?",
    ar: "عنوان url معطل؟",
  },
  "notfound-subtitle": {
    // @TODO-ZM: link to /contibutors/github/NurElHuda later when we have contibutors page
    en: `Finally someone saw the 404 page <a href="https://github.com/NurElHuda">Nour</a> built 😄`,
    ar: `أخيرًا شاهد شخص ما صفحة 404 التي أنشأتها <a href="https://github.com/NurElHuda">نور</a> 😄`,
  },
  "notfound-back-home": {
    en: "Go Back Home",
    ar: "ارجع إلى الصفحة الرئيسية",
  },
  "contribute-title": {
    en: "Contribute to algerian open-source projects | DzCode i/o",
    ar: "ساهم في المشاريع الجزائرية مفتوحة المصدر | DzCode i / o",
  },
  "contribute-description": {
    en: "Browse and contribute to Algerian open-source projects",
    ar: "تصفح وساهم في مشاريع جزائرية مفتوحة المصدر",
  },
  "contribute-filter-projects": {
    en: "Project",
    ar: "المشروع",
  },
  "contribute-filter-languages": {
    en: "Programming Language",
    ar: "لغة البرمجة",
  },
  "contribute-filter-labels": {
    en: "Label",
    ar: "الوسم",
  },
  "contribute-read-issue": {
    en: "Learn more",
    ar: "اقرأ المزيد",
  },
  "contribute-review-changes": {
    en: "Review changes",
    ar: "مراجعة التغييرات",
  },
  "contribution-title-pre": {
    en: "Help with: ",
    ar: "ساعد في: ",
  },
  "contribution-title-post": {
    en: " | DzCode i/o",
    ar: " | DzCode i / o",
  },
  "contribution-breadcrumbs-1": {
    en: "Contributions",
    ar: "المساهمات",
  },
  "elapsed-time-suffixes": {
    en: "y|mo|d|h|min|Just now",
    ar: " عام| شهر| يوم| ساعة| دقيقة| الآن",
  },
  "articles-title": {
    en: "Read and discuss articles written by algerian developers | DzCode i/o",
    ar: "اقرأ وناقش المقالات التي كتبها المطورون الجزائريون | DzCode i / o",
  },
  "articles-description": {
    en: "Browse, read or modify a growing list of articles written by Algerian developers, or Add your own article to the list!",
    ar: "تصفح أو اقرأ أو عدل قائمة متزايدة من المقالات التي كتبها مطورون جزائريون ، أو أضف مقالك الخاص إلى القائمة!",
  },
  "articles-content-back": {
    en: "Back to the list",
    ar: "عد إلى القائمة",
  },
  "articles-content-authors": {
    en: "This article is written by",
    ar: "هذا المقال كتبه",
  },
  "articles-content-contributors": {
    en: "With the help of",
    ar: "بمساعدة",
  },

  "learn-title": {
    en: "Learn about software development through open-source | DzCode i/o",
    ar: "تعرف على البرمجة من خلال البرامج مفتوحة المصدر | DzCode i / o",
  },
  "learn-description": {
    en: "Learn and share your knowledge with other Algerian developers!",
    ar: "تعلم وشارك معرفتك مع مطورين جزائريين آخرين!",
  },
  "learn-content-back": {
    en: "Back to the list",
    ar: "عد إلى القائمة",
  },
  "learn-content-authors": {
    en: "This article is written by",
    ar: "هذا المقال كتبه",
  },
  "learn-content-contributors": {
    en: "With the help of",
    ar: "بمساعدة",
  },
  "ui-theme-DARK": { en: "Dark", ar: "داكن" },
  "ui-theme-LIGHT": { en: "Light", ar: "فاتح" },
  "ui-theme-AUTO": { en: "Auto", ar: "تلقائي" },
  "global-generic-error": {
    en: "Oops, something went wrong, please try again...",
    ar: "عفوًا ، حدث خطأ ما ، يرجى المحاولة مرة أخرى ...",
  },
  "global-error-email-us": {
    en: "Email us 📩",
    ar: "راسلنا 📩",
  },
  "global-try-again": {
    en: "Try Again",
    ar: "حاول مرة أخري",
  },
  // @TODO-ZM: add other languages
  "global-programming-language-javascript": {
    en: "Javascript",
    ar: "جافا سكريبت",
  },
  "global-programming-language-typescript": {
    en: "Typescript",
    ar: "تايب سكريبت",
  },
  "global-contribution-label-bug": {
    en: "Bug",
    ar: "خطأ",
  },
  "global-algeria-codes": {
    en: "Algeria Codes",
    ar: "الجزائر تبرمج",
  },
} as const;
