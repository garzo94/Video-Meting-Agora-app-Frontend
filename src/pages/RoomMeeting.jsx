import React, { useEffect, useState } from "react";
import VideoRoom from "../components/VideoRoom";
import useRequestAuth from "../hooks/useRequestAuth";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function RoomMeeting() {
  const { UserMeetingData, userData, GetMeetingData, meetingData } =
    useRequestAuth();
  const { room } = useParams();
  const { name } = useParams();
  const [duration, setDuration] = useState("");
  useEffect(() => {
    UserMeetingData({ query: room }, { name: name });
  }, [room]);

  useEffect(() => {
    if (room) {
      GetMeetingData({ query: room });
    }
  }, []);
  useEffect(() => {
    if (meetingData.duration) {
      var hms = meetingData.duration;
      var a = hms.split(":");
      var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
      setDuration(seconds * 1000);
    }
  }, [meetingData.duration]);

  const dateStart = meetingData.start;

  const date = {
    year: Number(moment(dateStart).format("YYYY")),
    month: Number(moment(dateStart).format("M")),
    day: Number(moment(dateStart).format("D")),
    hour: Number(moment(dateStart).format("H")) + 6,
    minutes: Number(moment(dateStart).format("m")),
  };

  return (
    <>
      {userData.token ? (
        <VideoRoom
          token={userData.token}
          uid={userData.uid}
          channel={userData.channel}
          name={name}
          date={date}
          duration={duration}
        />
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}
