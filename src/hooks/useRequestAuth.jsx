import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const client = axios.create({
  baseURL: "https://rapidmeet.up.railway.app/",
});
export default function useRequestAuth() {
  const { enqueueSnackbar } = useSnackbar();
  const [meetingData, setMeetingData] = useState({});
  const [userData, setUserData] = useState({});
  const CreateMeeting = useCallback(
    (data) => {
      client
        .post("/api/my_room/", data)
        .then(() => {})
        .catch((err) => {
          enqueueSnackbar(err, { variant: "error" });
        });
    },
    [enqueueSnackbar]
  );
  const GetMeetingData = useCallback(
    ({ query }) => {
      client
        .get(`/api/my_room/${query}`)
        .then((res) => {
          setMeetingData(res.data);
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: "error" });
        });
    },
    [enqueueSnackbar]
  );

  const UserMeetingData = useCallback(
    ({ query }, values) => {
      client
        .post(`/api/room_meeting/${query}/`, values)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          enqueueSnackbar(err, { variant: "error" });
        });
    },
    [enqueueSnackbar]
  );
  return {
    CreateMeeting,
    GetMeetingData,
    UserMeetingData,
    meetingData,
    userData,
  };
}
