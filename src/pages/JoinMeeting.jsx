import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import OutOfDateTime from "../components/OutOfDateTime";
import useRequestAuth from "../hooks/useRequestAuth";
import moment from "moment";
import InDateTime from "../components/InDateTime";

export default function JoinMeeting() {
  const { GetMeetingData, meetingData } = useRequestAuth();
  const { room } = useParams();
  const isInDate = moment().isAfter(meetingData.start);
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
  }, [room]);

  return (
    <>
      {isInDate ? (
        <InDateTime room={room} />
      ) : (
        <OutOfDateTime month={month} day={day} time={time} />
      )}
    </>
  );
}
