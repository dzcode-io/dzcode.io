import { Action, createSlice } from "@reduxjs/toolkit";
import { ActionType } from "src/redux";

const subscribers: Partial<Record<ActionType, Array<(...args: any[]) => void>>> = {};

export const _subscribers = createSlice({
  name: "_subscribers",
  initialState: {},
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      () => true,
      (_, { type }: Action<ActionType>) => {
        subscribers[type]?.forEach((subscriber) => setTimeout(subscriber, 0));
      },
    );
  },
});
