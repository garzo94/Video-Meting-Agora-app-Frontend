export const initialState = {
  inDateTime: false,
  messagesVar: false,
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

    default:
      state;
  }
}
