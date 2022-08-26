export const initialState = {
  inDateTime: false,
  messagesVar: false,
  extendMeeting: false,
  extendMeetingBack: false,
  extendMeetingBackMessage: "",
};

export default function MeetingReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "DATE_TIME":
      return {
        ...state,
        inDateTime: !state.inDateTime,
      };
    case "MESSAGES":
      return {
        ...state,
        messagesVar: payload,
      };
    case "EXTEND":
      return {
        ...state,
        extendMeeting: payload,
      };
    case "EXTEND_BACK":
      return {
        ...state,
        extendMeetingBack: payload,
      };
    case "EXTEND_BACK_MESSAGE":
      return {
        ...state,
        extendMeetingBackMessage: payload,
      };

    default:
      state;
  }
}
