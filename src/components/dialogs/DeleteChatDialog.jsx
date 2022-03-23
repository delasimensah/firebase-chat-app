import React from "react";
import { useNavigate } from "react-router-dom";

// firebase
import { deleteChat } from "../../firebase/chats";

// mui
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const DeleteChatDialog = ({ onClose, isOpen, chatId }) => {
  const navigate = useNavigate();

  const handleDeleteChat = async () => {
    await deleteChat(chatId);
    navigate("/");
  };

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle sx={{ fontSize: "16px" }}>
        Are you sure you want to delete this chat?
      </DialogTitle>

      <List>
        <ListItem button onClick={handleDeleteChat}>
          <ListItemText
            primary={
              <Typography sx={{ color: "red", textAlign: "center" }}>
                Delete
              </Typography>
            }
          />
        </ListItem>

        <ListItem button onClick={onClose}>
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

export default DeleteChatDialog;
