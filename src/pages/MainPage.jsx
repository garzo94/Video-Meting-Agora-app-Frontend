import React, { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import IconButton from "@mui/material/IconButton";
import { useSnackbar } from "notistack";
import * as yup from "yup";
import { useFormik } from "formik";
import { v1 as uuidv1 } from "uuid";
import useRequestAuth from "../hooks/useRequestAuth";
import moment from "moment";
import SelectTime from "../components/SelectTime";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "../Theme/Theme";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = yup.object({
  room: yup.string("Enter your room name").required("Room name is required"),
});

export default function MainPage() {
  const [open, setOpen] = useState(false);
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
      setOpen(true);
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
    enqueueSnackbar("Link Copied!", {
      variant: "info",
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
    <ThemeProvider theme={Theme}>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Dialog
          open={open}
          onClose={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "500",
              fontSize: "26px",
              color: "#111111",
            }}
          >
            {"Meeting link generated"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {link}
              <Button
                onClick={handleCopytoClipBoard}
                sx={{
                  fontSize: "18px",
                  lineHeight: "24px",
                  color: "white",
                  bgcolor: "#3347B0",
                  textTransform: "capitalize",
                  mt: "20px",
                  ":hover": {
                    color: "white",
                    background: "#3347B0",
                    boxShadow:
                      "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);",
                  },
                }}
              >
                Copy Link
              </Button>
            </DialogContentText>
            <IconButton></IconButton>
          </DialogContent>
          <DialogActions sx={{ position: "absolute", right: "10px" }}>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>

        <Box
          component="img"
          sx={{
            width: "164px;",
            height: "164px;",
            top: "175px;",
            left: "144px",
            position: "absolute",
          }}
          alias="image1"
          src="src\assets\Image1.png"
        />
        <Box
          component="img"
          sx={{
            width: "150px;",
            height: "180px;",
            top: "440px;",
            left: "228px",
            position: "absolute",
          }}
          alias="image2"
          src="src\assets\Image2.png"
        />
        <Box
          component="img"
          sx={{
            width: "180px;",
            height: "164px;",
            top: "153px;",
            left: "1121px",
            position: "absolute",
          }}
          alias="image2"
          src="src\assets\Image3.png"
        />
        <Box
          component="img"
          sx={{
            width: "150px;",
            height: "150px;",
            top: "461px;",
            left: "1110px",
            position: "absolute",
          }}
          alias="image2"
          src="src\assets\Image4.png"
        />
        <Box
          component="img"
          sx={{
            width: "189px;",
            height: "32px;",
            top: "32px;",
            position: "absolute",
          }}
          alias="RapidMeet"
          src="src\assets\Logo.png"
        />
        <Box sx={{ left: "900" }}>
          <Box
            component="img"
            sx={{
              width: "9.28px;",
              height: "12.53px;",
              top: "107.94px;",
              left: "985px",
              position: "absolute",
            }}
            alias="vector"
            src="src\assets\Vector (1).png"
          />

          <Box
            component="img"
            sx={{
              width: "19.69px;",
              height: "11.45px;",
              top: "114.45px;",
              left: "994px",
              position: "absolute",
            }}
            alias="vector"
            src="src\assets\Vector.png"
          />
          <Box
            component="img"
            sx={{
              width: "13.28px;",
              height: "8.34px;",
              top: "131.52px;",
              left: "997.46px",
              position: "absolute",
            }}
            alias="vector"
            src="src\assets\Vector (2).png"
          />
        </Box>

        <Grid
          lg={12}
          md={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            top: "117.33px;",
            position: "absolute",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontStyle: "normal",
              fontSize: "36px",
              lineHeight: "47px",
              color: "#222222",
            }}
          >
            Make your meeting more productive.
          </Typography>
          <h3
            style={{
              width: "750px",
              color: "#646464",
              fontWeight: "400",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            A video meeting platform connect your teams, save time and increase
            productivity. It lets you make most out of the meeting in less time.
            <span style={{ color: "#24327D", fontWeight: "600" }}>
              {" "}
              How it works?
            </span>
          </h3>
          <Box
            sx={{
              position: "absolute",
              width: "93px",
              height: "9px",
              left: "394px",
              top: "34px",
              background: "#AFA3FC",
              zIndex: "-1",
            }}
          />
          <Box
            sx={{
              position: "aboslute",
              left: "70.40%",
              right: "1023px",
              bottom: "82.72%",
              background: "#000000",
              transform: "rotate(-12.06def)",
            }}
          ></Box>

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
              color="secondary"
              InputProps={{
                style: {},
              }}
              onChange={formik.handleChange}
              error={formik.touched.room && Boolean(formik.errors.room)}
              helperText={formik.touched.room && formik.errors.room}
              sx={{ mt: 2, width: 275, mb: "46px", borderColor: "pink" }}
            />

            {/* <OutlinedInput

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
            /> */}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date&Time"
                value={date}
                color="secondary"
                onChange={handleChange}
                className="date"
                InputProps={{
                  sx: {
                    width: 275,
                    color: "#3347B0",
                    mb: "35px",
                    "& .MuiSvgIcon-root": { color: "#3347B0" },
                  },
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <SelectTime
              handleDuration={handleDuration}
              color="secondary"
              duration={duration}
            />
            <Button
              type="submit"
              sx={{
                width: "191px",
                mt: "24px",
                p: "12px 28px",
                background: "#3347B0",
                color: "white",
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "24px",
                textTransform: "capitalize",
                letterSpacing: "0.02em",
                ":hover": {
                  color: "white",
                  background: "#3347B0",
                  boxShadow:
                    "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);",
                },
              }}
            >
              Generate Link
            </Button>
          </form>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
