import React, { useState } from "react";

// mui
import { Menu, MenuItem } from "@mui/material";

// components
import DeleteChatDialog from "./dialogs/DeleteChatDialog";

const ChatDropdownMenu = ({ anchorEl, open, handleClose, chatId }) => {
  const [openDeleteChatDialog, setOpenDeleteChatDialog] = useState(false);

  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => setOpenDeleteChatDialog(true)}
          sx={{ color: "red", fontSize: "15px" }}
        >
          Delete Chat
        </MenuItem>
      </Menu>

      <DeleteChatDialog
        onClose={() => setOpenDeleteChatDialog(false)}
        isOpen={openDeleteChatDialog}
        chatId={chatId}
      />
    </>
  );
};

export default ChatDropdownMenu;
