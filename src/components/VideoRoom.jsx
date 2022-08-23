import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from "./VideoPlayer";
import { Box, Grid, Typography } from "@mui/material";
import Controls from "./Controls";

const APP_ID = "77780af0adae470b9bf4d235b64c14c4";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});
export default function VideoRoom({ token, uid, channel, name }) {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
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
        console.log(tracks, "hola");
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
    </Box>
  );
}
