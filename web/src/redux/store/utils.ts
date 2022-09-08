import { Action, PayloadAction } from "@reduxjs/toolkit";
import { ActionTypesRecord, SlicesKey } from "src/redux/store";

export const keyMatcher =
  <K extends SlicesKey>(
    sliceKey: K,
    subActionType?: ActionTypesRecord[K] | ActionTypesRecord[K][],
  ) =>
  (action: Action<string>): boolean => {
    const subActionTypes = Array.isArray(subActionType) ? subActionType : [subActionType || ""];

    return subActionTypes.some((type) => action.type.startsWith(`${sliceKey}/${type}`));
  };

export const setReducer = <S extends Record<string, unknown>>(
  state: S,
  action: PayloadAction<Partial<S>>,
) => {
  (Object.keys(action.payload) as (keyof typeof action.payload)[]).forEach((key) => {
    if (typeof action.payload[key] !== "undefined") {
      state[key] = action.payload[key] as S[keyof S];
    }
  });
};
