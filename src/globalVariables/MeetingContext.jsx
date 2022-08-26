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

  const ExtendMeeting = (values) => {
    dispatch({
      type: "EXTEND",
      payload: values,
    });
  };

  const ExtendMeetingBack = (values) => {
    dispatch({
      type: "EXTEND_BACK",
      payload: values,
    });
  };

  const ExtendMeetingBackMessage = (values) => {
    dispatch({
      type: "EXTEND_BACK_MESSAGE",
      payload: values,
    });
  };
  const value = {
    inDateTime: state.inDateTime,
    messagesVar: state.messagesVar,
    extendMeeting: state.extendMeeting,
    extendMeetingBack: state.extendMeetingBack,
    extendMeetingBackMessage: state.extendMeetingBackMessage,
    ExtendMeetingBack,
    ExtendMeetingBackMessage,
    ExtendMeeting,
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
