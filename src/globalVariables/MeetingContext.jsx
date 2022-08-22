import { createContext, useReducer, useContext } from "react";
import MeetingReducer, { initialState } from "./MeetingReducer";

const Context = createContext(initialState);

import React from "react";

export function Provider({ children }) {
  const [state, dispatch] = useReducer(MeetingReducer, initialState);

  const InDateTame = () => {
    dispatch({
      type: "DATE_TIME",
    });
  };

  const value = {
    inDateTime: state.inDateTime,
    InDateTame,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

const useMeeting = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useText must be used within ShopContext");
  }

  return context;
};

export default useMeeting;
