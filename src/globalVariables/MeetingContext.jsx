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

  const MessagesVar = (values) => {
    dispatch({
      type: "MESSAGES",
      payload: values,
    });
  };
  const value = {
    inDateTime: state.inDateTime,
    messagesVar: state.messagesVar,
    MessagesVar,
    InDateTame,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

const useMeeting = () => {
  const context = useContext(Context);

  return context;
};

export default useMeeting;
