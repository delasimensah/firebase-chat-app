import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./utils/muiTheme.js";

// contexts
import { UserProvider } from "./contexts/UserContext";
import { MessageProvider } from "./contexts/MessageContext";

// components
import App from "./App";

// global styles
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={muiTheme}>
        <UserProvider>
          <MessageProvider>
            <App />
          </MessageProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
