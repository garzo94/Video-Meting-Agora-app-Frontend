import React from "react";
import { Box, Typography } from "@mui/material";

export default function OutOfDateTime({ month, day, time }) {
  return (
    <Box
      sx={{
        widht: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>This meeting starts</Typography>
      <Typography>{`on ${month} ${day}`}</Typography>
      <Typography>{`at ${time}`}</Typography>
    </Box>
  );
}
