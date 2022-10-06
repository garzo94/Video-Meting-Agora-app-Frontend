import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Logo from "../../public/assets/Logo.png";

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
        position: "relative",
      }}
    >
      <Box
        component="img"
        sx={{
          width: "189px;",
          height: "32px;",
          top: "32px;",
          position: "absolute",
        }}
        alt="RapidMeett"
        src={Logo}
      />

      <h1
        style={{
          position: "absolute",
          top: "160px",
          fontWeight: "500",
          fontSize: "24px",
          color: "#111111",
          lineHeight: "31px",
        }}
      >
        Enter your name before entering the meeting please!
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          position: "absolute",
          top: "215px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          id="name"
          name="name"
          label="Name"
          required
          onChange={formik.handleChange}
          sx={{ mt: 2, width: "328px", height: "48px" }}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <Button
          sx={{
            width: "191px",
            mt: "24px",
            p: "12px 28px",
            background: "#3347B0",
            top: "62px",
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
          type="submit"
        >
          Join
        </Button>
      </form>
    </Box>
  );
}
