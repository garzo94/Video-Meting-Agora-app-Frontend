import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

export default function InDateTime() {
  const [name, setName] = useState(null);
  console.log(name);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography>Enter your name before entering please!</Typography>
      <TextField
        variant="standard"
        label="name"
        required
        onChange={(e) => setName(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button sx={{ mt: 8 }}>Join</Button>
    </Box>
  );
}
