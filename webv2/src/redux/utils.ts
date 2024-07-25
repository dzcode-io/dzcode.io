import { PayloadAction } from '@reduxjs/toolkit';

export const setReducer = <S>(state: S, action: PayloadAction<Partial<S>>) => {
  (Object.keys(action.payload) as (keyof typeof action.payload)[]).forEach((key) => {
    if (typeof action.payload[key] !== 'undefined') {
      state[key] = action.payload[key] as S[keyof S];
    }
  });
};

export const setReducerFactory =
  <S>() =>
  (state: S, action: PayloadAction<Partial<S>>) =>
    setReducer(state, action);
