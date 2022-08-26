import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import useMeeting from "../globalVariables/MeetingContext";
import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogTime() {
  const { ExtendMeetingBack, ExtendMeetingBackMessage } = useMeeting();
  const [open, setOpen] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  function handleDesagree() {
    setOpen(false);
    ExtendMeetingBack(true);
    ExtendMeetingBackMessage("No");
  }

  function handleAgree() {
    setOpen(false);
    ExtendMeetingBack(true);
    ExtendMeetingBackMessage("Yes");
    enqueueSnackbar(
      "The meeting was extended 5 minutes!",
      { variant: "success", autoHideDuration: 5000 }
    );
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you whant to extend the meeting?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Alex has requested to extend the meeting, do you agree to extend it an additional 5 minutes?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDesagree}>Disagree</Button>
          <Button onClick={handleAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
