import React, { useRef, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import useMeeting from "../globalVariables/MeetingContext";

export default function VideoPlayer({ user, usersLength, name }) {
  const ref = useRef();
  const { VideoTag } = useMeeting();

  useEffect(() => {
    user.videoTrack.play(ref.current);
    {
    }
  }, []);


  const height = usersLength >= 3 ? "40%" : "75%";

  return (
    <Grid
      item
      ref={ref}
      lg={usersLength >= 3 ? 3 : 5}
      md={usersLength >= 3 ? 3 : 5}
      sx={{ height: { height }, m: 3, position: "relative" }}
    >
      <Box sx={{ borderRadius: "5px", backgroundColor: "black" }}>
        <h4
          style={{
            position: "absolute",
            borderRadius: "10px",
            zIndex: "1",
            margin: "5px",
            left: "8px",
            bottom: "5px",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
          }}
        >
          My name
        </h4>
      </Box>
    </Grid>
  );
}
