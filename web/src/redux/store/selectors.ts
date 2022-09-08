import { useSelector } from "react-redux";
import { SlicesKey, State } from "src/redux/store";

export const useSliceSelector = <K extends SlicesKey>(
  sliceKey: K,
  equalityFn?: Parameters<typeof useSelector>["1"],
) => useSelector<State, State[K]>((state) => state[sliceKey], equalityFn);
