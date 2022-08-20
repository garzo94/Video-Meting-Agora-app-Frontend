import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from "./VideoPlayer";

const APP_ID = "77780af0adae470b9bf4d235b64c14c4";
const TOKEN =
  "007eJxTYIgR+bp3hkz025i9PecWMiyfq7/oxJu57611pa3O1/mXbJqpwGBubm5hkJhmkJiSmGpibpBkmZRmkmJkbJpkZpJsaJJs8vnR/6QiE8bkZu7/DIxQCOKzMbgbejka+DEwAAAa6iIs";
const CHANNEL = "G1JA0N";
const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});
export default function VideoRoom() {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      // user.audioTrack.play()
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
      .join(APP_ID, CHANNEL, TOKEN, null)
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      VideoRoom
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 200px)",
        }}
      >
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
}
