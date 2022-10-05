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
    }
    client.unpublish(localTracks).then(() => client.leave());
    navigate("/");
    window.location.reload(true);
  }

  async function toggleCamera() {
    if (localTracks[1].muted) {
      await localTracks[1].setMuted(false);
      setcameraMuted(false);
    } else {
      await localTracks[1].setMuted(true);
      setcameraMuted(true);
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
  const style = {
    fontSize: "40px",
    color: "white",
    background: "#353744",
    borderRadius: "50px",
    p: 1.1,
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <IconButton size="small" onClick={toggleMic}>
        {micMuted ? (
          <MicOffIcon sx={{ ...style, background: "red" }} />
        ) : (
          <MicIcon sx={style} />
        )}
      </IconButton>
      <IconButton size="small" onClick={toggleCamera}>
        {cameraMuted ? (
          <VideocamOffIcon sx={{ ...style, background: "red" }} />
        ) : (
          <VideocamIcon sx={style} />
        )}
      </IconButton>
      <IconButton size="small" onClick={handleLeave}>
        <CallEndIcon sx={{ ...style, background: "red" }} />
      </IconButton>
    </Stack>
  );
}
