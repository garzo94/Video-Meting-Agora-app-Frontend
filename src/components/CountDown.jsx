import React, { useState, useEffect } from "react";
import { Box, Typography, Tooltip, IconButton, Stack } from "@mui/material";
import { getRemainingTimeUntilMsTimestamp } from "./Utils/CountdownTimerUtils";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import { useSnackbar } from "notistack";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBox from "./ChatBox";
import useMeeting from "../globalVariables/MeetingContext";
import { useNavigate } from "react-router-dom";

const defaultRemainingTime = {
  seconds: "0",
  minutes: "0",
};
export default function CountDown({
  countdownTimestampMs,
  localTracks,
  client,
  CHANNEL,
}) {
  const navigate = useNavigate();
  const { messagesVar, MessagesVar, ExtendMeeting, extendMeetingBackMessage } =
    useMeeting();
  const [chat, setChat] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const [timeDisable, setTimeDisable] = useState(false);

  useEffect(() => {
    if (chat === true) {
      MessagesVar(false);
    }
  }, [chat]);

  useEffect(() => {
    if (extendMeetingBackMessage === "Yes" && timeDisable) {
      enqueueSnackbar(
        "Your request was approved, the meeting was extended 5 minutes!",
        { variant: "success", autoHideDuration: 5000 }
      );
    }
    if (extendMeetingBackMessage === "No" && timeDisable) {
      enqueueSnackbar("Sorry, your request to extend the meeting was denied", {
        autoHideDuration: 5000,
      });
    }
  }, [extendMeetingBackMessage]);

  function moreTime(time, disable, extend) {
    console.log(disable, "heey");
    if (extend === "Yes") {
      return time + 300000;
    } else if (disable === false) {
      return time;
    } else {
      return time;
    }
  }

  function handleExtendMeeting() {
    ExtendMeeting(true);
    setTimeDisable(true);
  }

  useEffect(() => {
    if (timeDisable) {
      enqueueSnackbar(
        "You have made a request to extend the meeting, if approved the meeting will be extended 5 more minutes.",
        { variant: "info", autoHideDuration: 5000 }
      );
    }
    if (timeDisable) {
    }
  }, [timeDisable]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(
        moreTime(countdownTimestampMs, timeDisable, extendMeetingBackMessage)
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdownTimestampMs, timeDisable, extendMeetingBackMessage]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  useEffect(() => {
    if (remainingTime.seconds === "00" && remainingTime.minutes === "00") {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.unpublish(localTracks).then(() => client.leave());
      navigate("/");
      window.location.reload(true);
    }
  }, [remainingTime.seconds]);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          width: "300px",
          height: "50px",
          border: "2px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginX: "auto",
        }}
      >
        <Typography sx={{ ml: "5px" }}>{remainingTime.minutes}</Typography>
        <Typography sx={{ ml: "5px" }}>minutes</Typography>
        <Typography sx={{ ml: "5px" }}>{remainingTime.seconds}</Typography>
        <Typography sx={{ ml: "5px" }}>seconds</Typography>
      </Box>
      <Stack sx={{ position: "absolute", right: "60px", bottom: "0px" }}>
        <Tooltip title="Add 5 minutes more">
          <IconButton
            size="large"
            onClick={handleExtendMeeting}
            disabled={timeDisable}
          >
            <MoreTimeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Tooltip>
        {messagesVar && chat === false ? (
          <IconButton size="large" onClick={() => setChat(!chat)}>
            <ChatIcon sx={{ fontSize: 40, color: "red" }} />
          </IconButton>
        ) : (
          <IconButton size="large" onClick={() => setChat(!chat)}>
            <ChatIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
      </Stack>

      <ChatBox CHANNEL={CHANNEL} timeDisable={timeDisable} chat={chat} />
    </Box>
  );
}
