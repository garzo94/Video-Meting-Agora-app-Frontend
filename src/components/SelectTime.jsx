import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectTime({ handleDuration, duration }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth sx={{ mt: 2, width: 275 }}>
        <InputLabel id="demo-simple-select-label">Duration</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={duration}
          label="Meeting Duration"
          onChange={handleDuration}
        >
          <MenuItem value={5}>5 Minutes</MenuItem>
          <MenuItem value={10}>10 Minutes</MenuItem>
          <MenuItem value={15}>15 Minutes</MenuItem>
          <MenuItem value={20}>20 Minutes</MenuItem>
          <MenuItem value={25}>25 Minutes</MenuItem>
          <MenuItem value={30}>30 Minutes</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
