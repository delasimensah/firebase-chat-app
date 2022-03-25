import React, { useState } from "react";
import { IoLogOutOutline, IoCreateOutline } from "react-icons/io5";

// context
import { useUser } from "../contexts/UserContext";

// mui
import { Stack, Typography, IconButton, Tooltip, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";

// components
import LogoutDialog from "./dialogs/LogoutDialog";
import NewChatDialog from "./dialogs/NewChatDialog";

const CustomIconButton = styled(IconButton)({
  "&:hover": {
    background: "transparent",
  },
});

const ChatListHeader = ({
  openNewChatDialog,
  setOpenNewChatDialog,
  unread,
}) => {
  const { currentUser } = useUser();

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <>
        <Tooltip title="Logout">
          <CustomIconButton onClick={() => setOpenLogoutDialog(true)}>
            <IoLogOutOutline />
          </CustomIconButton>
        </Tooltip>

        <LogoutDialog
          handleClose={() => setOpenLogoutDialog(false)}
          open={openLogoutDialog}
        />
      </>

      <Badge color="error" badgeContent={unread} max={99}>
        <Typography sx={{ textTransform: "capitalize" }}>
          {currentUser.username}
        </Typography>
      </Badge>

      <>
        <Tooltip title="New Chat">
          <CustomIconButton onClick={() => setOpenNewChatDialog(true)}>
            <IoCreateOutline />
          </CustomIconButton>
        </Tooltip>

        <NewChatDialog
          handleClose={() => setOpenNewChatDialog(false)}
          open={openNewChatDialog}
        />
      </>
    </Stack>
  );
};

export default ChatListHeader;
