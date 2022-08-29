import React, { useState, useEffect } from "react";
import { Box, Typography, Tooltip, IconButton, Stack } from "@mui/material";
import { getRemainingTimeUntilMsTimestamp } from "./Utils/CountdownTimerUtils";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import { useSnackbar } from "notistack";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBox from "./ChatBox";
import useMeeting from "../globalVariables/MeetingContext";
import { useNavigate } from "react-router-dom";
import DialogTime from "./DialogTime";

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
  let extendTimeDialog;
  const navigate = useNavigate();
  const { messagesVar, MessagesVar, ExtendMeeting, extendMeetingBackMessage } =
    useMeeting();
  const [chat, setChat] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const [timeDisable, setTimeDisable] = useState(false);
  const style = {
    fontSize: "40px",
    color: "white",
    background: "#353744",
    borderRadius: "50px",
    p: 1.1,
  };

  useEffect(() => {
    if (chat === true) {
      MessagesVar(false);
    }
  }, [chat]);
  console.log(extendMeetingBackMessage, "messageee");
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
    if (extend === "Yes") {
      return time + 300000;
    } else if (disable === false) {
      return time;
    } else {
      return time;
    }
  }

  function handleExtendMeeting() {
    setTimeDisable(true);
  }

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
    <Box>
      {timeDisable ? <DialogTime timeDisable={timeDisable} /> : null}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {extendTimeDialog ? extendTimeDialog : null}
        <Box
          sx={{
            position: "absolute",
            left: "225px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              botom: "20px",

              height: "33px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "46px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "88px",
              p: "6px 10px",
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                letterSpacing: "0.05em",
                fontWeight: "400",
                fontSize: "16px",
              }}
            >
              00:
            </Typography>
            <Typography
              sx={{
                color: "#ffffff",
                letterSpacing: "0.05em",
                fontWeight: "400",
                fontSize: "16px",
              }}
            >{`${remainingTime.minutes}:`}</Typography>
            <Typography
              sx={{
                color: "#ffffff",
                letterSpacing: "0.05em",
                fontWeight: "400",
                fontSize: "16px",
              }}
            >
              {remainingTime.seconds}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", left: "1130px", position: "absolute" }}>
          <Tooltip title="Extend time">
            <IconButton
              size="large"
              onClick={handleExtendMeeting}
              disabled={timeDisable}
            >
              <MoreTimeIcon sx={style} />
            </IconButton>
          </Tooltip>
          {messagesVar && chat === false ? (
            <IconButton size="large" onClick={() => setChat(!chat)}>
              <ChatIcon sx={style} />
            </IconButton>
          ) : (
            <IconButton size="large" onClick={() => setChat(!chat)}>
              <ChatIcon sx={style} />
            </IconButton>
          )}
        </Box>
      </Box>
      <ChatBox CHANNEL={CHANNEL} timeDisable={timeDisable} chat={chat} />
    </Box>
  );
}
