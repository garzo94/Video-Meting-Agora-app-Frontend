import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMeeting from "../globalVariables/MeetingContext";
export default function InDateTime({ room }) {
  const [name, setName] = useState(null);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>
        Enter your name before entering the meeting please!
      </Typography>
      <TextField
        variant="standard"
        label="name"
        required
        onChange={(e) => setName(e.target.value)}
        sx={{ mt: 2, width: "40%" }}
      />
      <Button
        sx={{ mt: 8 }}
        onClick={() => {
          navigate(`/room/${room}/${name}`);
        }}
      >
        Join
      </Button>
    </Box>
  );
}
