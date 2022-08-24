import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from "./VideoPlayer";
import { Box, Grid, Typography } from "@mui/material";
import Controls from "./Controls";
import Countdown from "react-countdown";
import styled from "styled-components";
import CountDown from "./CountDown";
import useMeeting from "../globalVariables/MeetingContext";
import IconButton from "@mui/material/IconButton";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import { useSnackbar } from "notistack";
import Tooltip from "@mui/material/Tooltip";

const APP_ID = "77780af0adae470b9bf4d235b64c14c4";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});
export default function VideoRoom({
  token,
  uid,
  channel,
  name,
  date,
  duration,
}) {
  const { enqueueSnackbar } = useSnackbar();
  var startDate =
    new Date(
      date.year,
      date.month - 1,
      date.day,
      date.hour,
      date.minutes
    ).getTime() + 11000;

  //   const PurpleCount = styled.div`
  //     span {
  //       color: purple;
  //     }
  function handleMoreTime() {
    console.log("que pedo");
    duration + 300000;
  }
  const { videoTag, VideoTag } = useMeeting();
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  console.log(videoTag, "videooo");

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };
  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);
    client
      .join(APP_ID, channel, token, uid)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      client.unpublish(tracks).then(() => client.leave());
    };
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}
      >
        {users.map((user) => (
          <VideoPlayer
            key={user.uid}
            user={user}
            usersLenght={users.length}
            name={name}
          />
        ))}
      </Grid>
      <h2
        style={{
          position: "absolute",
          bottom: "-30px",
          left: "5px",
          fontSize: 40,
        }}
      >
        {channel}
      </h2>

      <Controls localTracks={localTracks} client={client} />
      {/* <PurpleCount>
        <Countdown date={startDate + 600000} />
      </PurpleCount> */}
      <CountDown
        countdownTimestampMs={startDate + duration}
        localTracks={localTracks}
        client={client}
      />
    </Box>
  );
}
