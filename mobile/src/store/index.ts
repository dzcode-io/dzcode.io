import { configureStore } from "@reduxjs/toolkit";

import articlesScreenSlice from "./articles-screen/slice";
import contributeScreenSlice from "./contribute-screen/slice";
import faqScreenSlice from "./faq-screen/slice";
import generalSlice from "./general/slice";
import learnScreenSlice from "./learn-screen/slice";
import projectsScreenSlice from "./projects-screen/slice";

export const store = configureStore({
  reducer: {
    articlesScreen: articlesScreenSlice.reducer,
    contributeScreen: contributeScreenSlice.reducer,
    faqScreen: faqScreenSlice.reducer,
    learnScreen: learnScreenSlice.reducer,
    projectsScreen: projectsScreenSlice.reducer,
    general: generalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
