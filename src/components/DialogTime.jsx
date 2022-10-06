import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMeeting from "../globalVariables/MeetingContext";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DialogTime({ timeDisable }) {
  const [width, setWidth] = useState("0%");
  const [guests, setGuests] = useState("1/2");
  const {
    ExtendMeetingBack,
    ExtendMeetingBackMessage,
    ExtendMeeting,
    extendMeetingBackMessage,
  } = useMeeting();
  const [open, setOpen] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  console.log(timeDisable, "queeee");
  useEffect(() => {
    if (timeDisable === false) {
      setWidth("50%");
      setGuests("2/2");
    }
  }, [timeDisable]);

  useEffect(() => {
    if (extendMeetingBackMessage === "Yes" && timeDisable) {
      setGuests("2/2");
      setWidth("100%");
    }
  }, [extendMeetingBackMessage]);

  function handleAgree() {
    setWidth("50%");
    if (timeDisable) {
      ExtendMeeting(true);
      enqueueSnackbar("Waiting for the others votes...", {
        autoHideDuration: 5000,
      });
    }

    if (timeDisable === false) {
      setWidth("100%");
      ExtendMeetingBack(true);
      ExtendMeetingBackMessage("Yes");
      enqueueSnackbar("The meeting was extended 5 minutes!", {
        variant: "success",
        autoHideDuration: 5000,
      });
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={{
          position: "absolute",
          left: "975px",
          top: "275px",
          width: "300px",
        }}
      >
        <DialogTitle
          sx={{
            color: "#242424",
            fontSize: "16px",
            lineHeight: "26px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {"Extend Time"}
          <IconButton size="small" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Vote now to extend meeting timing by 5 mins`}
            <div
              style={{
                position: "relative",
                width: "188px",
                height: "8px",
                background: "#D9D9D9",
                borderRadius: "18px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  height: "8px",
                  width: `${width}`,
                  background: "#2BAC47",
                  borderRadius: "18px",
                }}
              />
            </div>
            <h1
              style={{ fontSize: "16px", color: "#242424;", textAlign: "end" }}
            >
              {guests}
            </h1>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleAgree}
            sx={{
              fontSize: "14px",
              lineHeight: "24px",
              color: "white",
              bgcolor: "#3347B0",
              width: "68px",
              height: "28px",
              textTransform: "capitalize",
              mt: "0px",
              ":hover": {
                color: "white",
                background: "#3347B0",
                boxShadow:
                  "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);",
              },
            }}
          >
            Vote
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
