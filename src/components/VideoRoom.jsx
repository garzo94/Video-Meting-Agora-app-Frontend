import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from "./VideoPlayer";
import { Box, Grid } from "@mui/material";
import Controls from "./Controls";
import CountDown from "./CountDown";
import { useSnackbar } from "notistack";

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
  const [users, setUsers] = useState([]);
  const [usersUnique, setUsersUnique] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [localTracks, setLocalTracks] = useState([]);
  var startDate = new Date(
    date.year,
    date.month - 1,
    date.day,
    date.hour,
    date.minutes
  ).getTime();

  console.log(usersUnique, "uniqueeee");
  const CHANNEL = channel;

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === "video") {
      setUsers((previousUsers) => {
        return [...previousUsers, user];
      });
    }
    // if (mediaType === "audio") {
    //   user.audioTrack.play();
    // }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    console.log("whaat");
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
    <Box
      sx={{
        position: "relative",
        bgcolor: "#1E1E1E",
        height: "100vh",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "88vh",
          position: "relative",
          wdith: "100%",
        }}
      >
        {users.map((user) => (
          <VideoPlayer
            key={user.uid}
            user={user}
            usersLength={users.length}
            name={name}
            uid={uid}
          />
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          height: "72px",
          background: "#171717",
          right: "0px",
          bottom: "0px",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <h2
          style={{
            position: "absolute",
            color: "#FDFDFD",
            left: "117px",
            fontSize: "20px",
            fontWeight: "500",
          }}
        >
          {channel}
        </h2>
        <div
          style={{
            position: "absolute",
            width: "6px",
            height: "6px",
            borderRadius: "50px",
            background: "white",
            left: "205px",
          }}
        />
        <CountDown
          countdownTimestampMs={startDate + duration}
          localTracks={localTracks}
          client={client}
          CHANNEL={CHANNEL}
        />
        <Controls
          localTracks={localTracks}
          client={client}
          users={users}
          id={uid}
        />
      </Box>
    </Box>
  );
}
