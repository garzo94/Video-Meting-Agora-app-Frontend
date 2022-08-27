import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup
    .string("Enter your name")
    .required("Your name is required to join the meeting"),
});
export default function InDateTime({ room }) {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setName(values.name);
      navigate(`/room/${room}/${values.name}`);
    },
  });
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
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="standard"
          id="name"
          name="name"
          label="Name"
          required
          onChange={formik.handleChange}
          sx={{ mt: 2, width: "40%" }}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <Button sx={{ mt: 8 }} type="submit">
          Join
        </Button>
      </form>
    </Box>
  );
}
