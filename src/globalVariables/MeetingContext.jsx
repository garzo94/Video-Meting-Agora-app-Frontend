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

  const VideoTag = () => {
    dispatch({
      type: "VIDEO_TAG",
      payload: !state.VideoTag,
    });
  };
  const value = {
    inDateTime: state.inDateTime,
    videoTag: state.videoTag,
    VideoTag,
    InDateTame,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

const useMeeting = () => {
  const context = useContext(Context);

  return context;
};

export default useMeeting;
