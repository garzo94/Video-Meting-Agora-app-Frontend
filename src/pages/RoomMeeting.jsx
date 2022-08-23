import React, { useEffect } from "react";
import VideoRoom from "../components/VideoRoom";
import useRequestAuth from "../hooks/useRequestAuth";
import { useParams } from "react-router-dom";

export default function RoomMeeting() {
  const { UserMeetingData, userData } = useRequestAuth();
  const { room } = useParams();
  const { name } = useParams();
  useEffect(() => {
    UserMeetingData({ query: room }, { name: name });
  }, [room]);

  console.log(userData);

  return (
    <>
      {userData.token ? (
        <VideoRoom
          token={userData.token}
          uid={userData.uid}
          channel={userData.channel}
          name={name}
        />
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}
