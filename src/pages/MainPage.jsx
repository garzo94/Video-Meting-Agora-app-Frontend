import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function MainPage() {
  const [date, setDate] = useState(new Date("2022-08-18T21:11:54"));
  const handleChange = (newValue) => {
    setDate(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1, height: "100%", width: "100%" }}>
      {/* Left Side */}
      <Grid container spacing={2} sx={{ height: "95vh", width: "95vw" }}>
        <Grid
          lg={6}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              component="h2"
              sx={{ fontSize: "4rem", fontWeight: "500" }}
            >
              Welcome Page
            </Typography>
            <Typography
              component="h3"
              sx={{ fontSize: "2rem", fontWeight: "400" }}
            >
              Optimal Meeting
            </Typography>
          </Box>
        </Grid>
        {/* /Right Side */}
        <Grid
          lg={6}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderLeft: "1px solid white",
          }}
        >
          <Typography sx={{ fontSize: "2rem", fontWeight: "500", mb: 4 }}>
            {" "}
            Schedule your meeting:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date&Time picker"
              value={date}
              onChange={handleChange}
              className="date"
              InputProps={{
                sx: {
                  borderColor: "white",
                  color: "white",
                  "& .MuiSvgIcon-root": { color: "white" },
                },
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField sx={{ mt: 5, p: 2 }} />
          <Button sx={{ width: "10rem" }}>Generate Link</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
