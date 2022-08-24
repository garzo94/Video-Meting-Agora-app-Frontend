import React, { useState, useEffect } from "react";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import { getRemainingTimeUntilMsTimestamp } from "./Utils/CountdownTimerUtils";
import { useNavigate } from "react-router-dom";
import MoreTimeIcon from "@mui/icons-material/MoreTime";

const defaultRemainingTime = {
  seconds: "0",
  minutes: "0",
};
export default function CountDown({
  countdownTimestampMs,
  localTracks,
  client,
}) {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const [timeDisable, setTimeDisable] = useState(false);
  function moreTime(time, disable) {
    console.log(disable, "disable");
    if (disable === false) {
      return time;
    }
    if (disable === true) {
      return time + 400000;
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(moreTime(countdownTimestampMs, timeDisable));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdownTimestampMs, timeDisable]);

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
      <Box sx={{ position: "absolute" }}>
        <Tooltip title="Add 5 minutes more">
          <IconButton
            size="large"
            onClick={() => {
              setTimeDisable(true);
            }}
            disabled={timeDisable}
            sx={{
              position: "absolute",
              left: "1000px",
              bottom: "-20px",
            }}
          >
            <MoreTimeIcon sx={{ fontSize: 60 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
