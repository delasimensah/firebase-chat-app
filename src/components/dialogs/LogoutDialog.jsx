import React from "react";

// firebase
import { logout } from "../../firebase/authentication.js";

// mui
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const LogoutDialog = ({ handleClose, open }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ fontSize: "16px" }}>
        Are you sure you want to logout?
      </DialogTitle>

      <List>
        <ListItem
          button
          onClick={() => {
            logout();
            localStorage.setItem("chatlist", []);
          }}
        >
          <ListItemText
            primary={
              <Typography sx={{ color: "red", textAlign: "center" }}>
                Logout
              </Typography>
            }
          />
        </ListItem>

        <ListItem button onClick={handleClose}>
          <ListItemText
            primary={
              <Typography sx={{ textAlign: "center" }}>Cancel</Typography>
            }
          />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default LogoutDialog;
