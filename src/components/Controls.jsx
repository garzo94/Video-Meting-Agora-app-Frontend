import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { useNavigate } from "react-router-dom";

export default function Controls({ localTracks, client, toggleCamMic }) {
  const [cameraMuted, setcameraMuted] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const navigate = useNavigate();
  async function handleLeave() {
    for (let localTrack of localTracks) {
      localTrack.stop();
      localTrack.close();
      window.location.reload(true);
    }
    client.unpublish(localTracks).then(() => client.leave());
    navigate("/");
  }

  async function toggleCamera() {
    if (localTracks[1].muted) {
      await localTracks[1].setMuted(false);
      setMicMuted(false);
    } else {
      await localTracks[1].setMuted(true);
      setMicMuted(true);
    }
  }

  async function toggleMic() {
    if (localTracks[0].muted) {
      await localTracks[0].setMuted(false);
      setMicMuted(false);
    } else {
      await localTracks[0].setMuted(true);
      setMicMuted(true);
    }
  }
  const style = { fontSize: "40px" };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <IconButton size="large" onClick={toggleMic}>
        {micMuted ? <MicOffIcon sx={style} /> : <MicIcon sx={style} />}
      </IconButton>
      <IconButton size="large" onClick={handleLeave}>
        <CallEndIcon sx={style} />
      </IconButton>
      <IconButton size="large" onClick={toggleCamera}>
        {cameraMuted ? (
          <VideocamOffIcon sx={style} />
        ) : (
          <VideocamIcon sx={style} />
        )}
      </IconButton>
    </Stack>
  );
}
