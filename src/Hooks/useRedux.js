import { useSelector, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { SUPPORTING_FORMAT } from "@/extra/Constants";

const preloadedState = {
  images: [],
  scale: 100,
  column: 7,
  windows: [],
  saveOption: { format: SUPPORTING_FORMAT[0].join("/") },
};

export default function useRedux(stateName, initValue) {
  const dispatch = useDispatch();

  let targetState = useSelector((rootState) => {
    if (rootState[stateName] === undefined) {
      dispatch({ type: stateName, newState: initValue });
      return initValue;
    }
    return rootState[stateName];
  });

  const setTargetState = (newState) =>
    dispatch({ type: stateName, newState: newState });

  return [targetState, setTargetState];
}

export const REDUX_STORE = configureStore({
  reducer: (curRootState, action) => {
    return { ...curRootState, [action.type]: action.newState };
  },
  preloadedState,
  middleware: [],
});
