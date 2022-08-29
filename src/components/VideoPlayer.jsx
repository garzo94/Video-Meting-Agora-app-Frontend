import React, { useRef, useEffect } from "react";
import { Grid, Box } from "@mui/material";

export default function VideoPlayer({ user, usersLength, name, uid }) {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
    {
    }
  }, []);

  // const height = usersLength >= 3 ? "40%" : "75%";

  return (
    <Grid
      item
      ref={ref}
      lg={4}
      md={4}
      sx={{ height: "288px", position: "relative", display: "" }}
      className="holaa perro"
    >
      <Box sx={{ borderRadius: "15px", backgroundColor: "black" }}>
        <h4
          style={{
            position: "absolute",
            borderRadius: "10px",
            zIndex: "1",
            margin: "5px",
            left: "8px",
            bottom: "2px",
            fontSize: "20px",
            lineHeight: "26px",
            fontWeight: "500",
            color: "white",
          }}
        >
          {uid === user.uid ? name : "Alex 2"}
        </h4>
      </Box>
    </Grid>
  );
}
