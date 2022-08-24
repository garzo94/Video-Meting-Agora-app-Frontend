export const initialState = {
  inDateTime: false,
  videoTag: false,
};

export default function MeetingReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "DATE_TIME":
      return {
        ...state,
        inDateTime: !state.inDateTime,
      };
    case "VIDEO_TAG":
      return {
        ...state,
        videoTag: !state.videoTag,
      };

    default:
      state;
  }
}
