import React, { useState } from "react";
import { IoChevronBackOutline, IoEllipsisVerticalSharp } from "react-icons/io5";
import { stringToColor } from "../utils/stringToColor";
import { useNavigate } from "react-router-dom";

// mui
import { Stack, IconButton, Typography, Avatar } from "@mui/material";

// components
import ChatDropdownMenu from "./ChatDropdownMenu";

const ChatHeader = ({ username, chat }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ p: 1 }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton
          disableRipple
          sx={{
            p: 0,
            "&:hover": {
              background: "transparent",
            },
          }}
          onClick={() => navigate("/")}
        >
          <IoChevronBackOutline />
        </IconButton>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar sx={{ background: stringToColor(username) }}>
            {username.toUpperCase()[0]}
          </Avatar>
        </Stack>

        <Typography sx={{ textTransform: "capitalize" }}>{username}</Typography>
      </Stack>

      <>
        <IconButton onClick={handleClick}>
          <IoEllipsisVerticalSharp />
        </IconButton>

        <ChatDropdownMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          chatId={chat}
        />
      </>
    </Stack>
  );
};

export default ChatHeader;
