import React, { useState, useEffect } from "react";
import { Box, Typography, Tooltip, IconButton, Stack } from "@mui/material";
import { getRemainingTimeUntilMsTimestamp } from "./Utils/CountdownTimerUtils";
import { useNavigate } from "react-router-dom";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import { useSnackbar } from "notistack";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBox from "./ChatBox";
import useMeeting from "../globalVariables/MeetingContext";

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
  const { messagesVar, MessagesVar } = useMeeting();
  const [chat, setChat] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const [timeDisable, setTimeDisable] = useState(false);
  const [agreeMoreTime, setAgreeMoreTime] = useState(false);
  console.log(messagesVar, chat, "adding");

  useEffect(() => {
    if (chat === true) {
      MessagesVar(false);
    }
  }, [chat]);

  function moreTime(time, disable) {
    if (disable === false) {
      return time;
    }
    if (disable === true) {
      return time + 300000;
    }
  }

  useEffect(() => {
    if (timeDisable && agreeMoreTime === false) {
      enqueueSnackbar(
        "You have made a request to extend the meeting, if approved the meeting will be extended 5 more minutes.",
        { variant: "info", autoHideDuration: 4000 }
      );
    }
    if (timeDisable) {
    }
  }, [timeDisable]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(moreTime(countdownTimestampMs, timeDisable));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdownTimestampMs, timeDisable]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  //   useEffect(() => {
  //     if (remainingTime.seconds === "00" && remainingTime.minutes === "00") {
  //       for (let localTrack of localTracks) {
  //         localTrack.stop();
  //         localTrack.close();
  //       }
  //       client.unpublish(localTracks).then(() => client.leave());
  //       navigate("/");
  //       window.location.reload(true);
  //     }
  //   }, [remainingTime.seconds]);

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
            onClick={() => {
              setTimeDisable(true);
            }}
            disabled={timeDisable}
          >
            <MoreTimeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Tooltip>
        {messagesVar && chat === false ? (
          <IconButton size="large" onClick={() => setChat(!chat)}>
            <ChatIcon sx={{ fontSize: 60, color: "red", bgcolor: "red" }} />
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
