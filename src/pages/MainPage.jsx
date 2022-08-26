import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import OutlinedInput from "@mui/material/OutlinedInput";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useSnackbar } from "notistack";
import * as yup from "yup";
import { useFormik } from "formik";
import { v1 as uuidv1 } from "uuid";
import useRequestAuth from "../hooks/useRequestAuth";
import moment from "moment";
import SelectTime from "../components/SelectTime";

const validationSchema = yup.object({
  room: yup.string("Enter your room name").required("Room name is required"),
});
export default function MainPage() {
  const { CreateMeeting } = useRequestAuth();
  const formik = useFormik({
    initialValues: {
      room: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const uidRoom = uuidv1();

      CreateMeeting({
        uid: uidRoom,
        start: dateApi,
        duration: duration,
        room_name: values.room,
      });

      setLink(`http://127.0.0.1:5173/join/${uidRoom}/`);
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const [date, setDate] = useState(new Date());
  const [dateApi, setDateApi] = useState(
    moment(new Date()).format("YYYY-MM-DD HH:mm")
  );
  const [link, setLink] = useState("");
  const [duration, setDuration] = useState("5");
  const handleCopytoClipBoard = () => {
    enqueueSnackbar("Copied!", {
      variant: "success",
    });
    navigator.clipboard.writeText(link);
  };

  const handleChange = (newDate) => {
    setDate(newDate);
    const dateMoment = moment(newDate).format("YYYY-MM-DD HH:mm");
    setDateApi(dateMoment);
  };

  const handleDuration = (event) => {
    setDuration(event.target.value);
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
            borderLeft: "1px solid gray",
          }}
        >
          <Typography sx={{ fontSize: "2rem", fontWeight: "500", mb: 4 }}>
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
                  width: 275,
                  color: "black",
                  "& .MuiSvgIcon-root": { color: "black" },
                },
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <SelectTime handleDuration={handleDuration} duration={duration} />

          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              label="Enter your room name"
              name="room"
              id="room"
              onChange={formik.handleChange}
              error={formik.touched.room && Boolean(formik.errors.room)}
              helperText={formik.touched.room && formik.errors.room}
              sx={{ mt: 2, width: 275 }}
            />

            <OutlinedInput
              id="standard-adornment-password"
              type="text"
              value={link}
              sx={{ borderRadius: "20px", mt: 7, p: 0.5 }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleCopytoClipBoard}>
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button type="submit" sx={{ width: "10rem" }}>
              Generate Link
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
