import React, { useRef, useEffect } from "react";
import { Grid, Box } from "@mui/material";

export default function VideoPlayer({ user, usersLength, name, uid }) {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
    {
    }
  }, []);

  const height = usersLength >= 3 ? "40%" : "75%";
  // console.log(usersLength, "userssss");

  return (
    <Grid
      item
      ref={ref}
      lg={usersLength >= 3 ? 3 : 5}
      md={usersLength >= 3 ? 3 : 5}
      sx={{ height: { height }, m: 3, position: "relative" }}
      className="holaa perro"
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
            color: "white",
          }}
        >
          {uid === user.uid ? name : "Alex 2"}
        </h4>
      </Box>
    </Grid>
  );
}
