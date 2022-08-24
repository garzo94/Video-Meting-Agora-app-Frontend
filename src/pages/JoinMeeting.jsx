import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OutOfDateTime from "../components/OutOfDateTime";
import useRequestAuth from "../hooks/useRequestAuth";
import moment from "moment";
import InDateTime from "../components/InDateTime";

export default function JoinMeeting() {
  const { GetMeetingData, meetingData } = useRequestAuth();
  const [isInDate, setIsInDate] = useState(null);

  const { room } = useParams();
  useEffect(() => {
    if (meetingData.start) {
      setIsInDate(
        moment().format() > new Date(meetingData.start).toISOString()
      );
    }
  }, [meetingData]);

  //   console.log(
  //     moment().format(),
  //     new Date(meetingData.start).toISOString(),
  //     "dataaa"
  //   );

  const month = moment(meetingData.start, "YYYY-MM-DDTHH:mm:ss.SSS[Z]").format(
    "MMMM"
  );
  const day = moment(meetingData.start, "YYYY-MM-DDTHH:mm:ss.SSS[Z]").format(
    "D"
  );
  const time = moment(meetingData.start, "YYYY-MM-DDTHH:mm:ss.SSS[Z]").format(
    "HH:mm A"
  );

  useEffect(() => {
    if (room) {
      GetMeetingData({ query: room });
    }
  }, []);

  return (
    <>
      {isInDate ? (
        <InDateTime room={room} date={meetingData.start} />
      ) : meetingData.start && isInDate !== null && isInDate === false ? (
        <OutOfDateTime month={month} day={day} time={time} />
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}
