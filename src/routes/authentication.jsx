import React, { useState } from "react";

// mui
import { Stack, TextField, Typography, Button } from "@mui/material";

const defaultFormFields = {
  username: "",
  email: "",
  password: "",
};

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { username, email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleAuthentication = () => {
    if (isLogin) {
      console.log({ email, password });
      resetFormFields();
      return;
    }

    console.log({ username, email, password });
    resetFormFields();
  };

  return (
    <Stack
      sx={{ height: "100vh", width: "100vw" }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        sx={{
          p: 3,
          border: "1px solid black",
          width: {
            xs: "90%",
            md: "40%",
          },
          borderRadius: 3,
        }}
        spacing={3}
      >
        <Typography
          sx={{ textAlign: "center", textTransform: "uppercase" }}
          variant="h5"
        >
          {isLogin ? "Login" : "Register"}
        </Typography>

        <Stack spacing={3}>
          {!isLogin && (
            <TextField
              name="username"
              label="Username"
              variant="standard"
              type="text"
              value={username}
              onChange={handleChange}
            />
          )}

          <TextField
            name="email"
            label="Email"
            variant="standard"
            type="email"
            value={email}
            onChange={handleChange}
          />

          <TextField
            name="password"
            label="Password"
            variant="standard"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </Stack>

        <Stack spacing={1}>
          <Button
            variant="contained"
            disableElevation
            onClick={handleAuthentication}
            disabled={
              isLogin
                ? email === "" || password === ""
                : username === "" || email === "" || password === ""
            }
          >
            {isLogin ? "Login" : "Register"}
          </Button>

          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography sx={{ fontSize: "13px" }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </Typography>

            <Button
              sx={{
                textTransform: "capitalize",
                fontSize: "13px",
                "&:hover": {
                  background: "transparent",
                },
              }}
              onClick={() => {
                setIsLogin(!isLogin);
                resetFormFields();
              }}
              variant="text"
              disableRipple
            >
              {isLogin ? "Register" : "Login"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Authentication;
