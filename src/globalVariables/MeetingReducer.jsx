export const initialState = {
  inDateTime: false,
};

export default function MeetingReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "DATE_TIME":
      return {
        ...state,
        inDateTime: !state.inDateTime,
      };

    default:
      state;
  }
}
