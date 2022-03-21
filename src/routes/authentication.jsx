import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase
import { register, login } from "../firebase/authentication";

// mui
import { Stack, TextField, Typography, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const defaultFormFields = {
  username: "",
  email: "",
  password: "",
};

const Authentication = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loading, setLoading] = useState(false);

  const { username, email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleAuthentication = async () => {
    setLoading(true);

    if (isLogin) {
      try {
        await login(email, password);
      } catch (error) {
        console.log(error.message);
        resetFormFields();
        setLoading(false);
      }
      return;
    }

    try {
      await register(formFields);
    } catch (error) {
      console.log(error.message);
      resetFormFields();
      setLoading(false);
    }
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
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "primary.main",
          }}
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
          <LoadingButton
            variant="contained"
            disableElevation
            onClick={handleAuthentication}
            disabled={
              isLogin
                ? email === "" || password === ""
                : username === "" || email === "" || password === ""
            }
            loading={loading}
          >
            {isLogin ? "Login" : "Register"}
          </LoadingButton>

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
