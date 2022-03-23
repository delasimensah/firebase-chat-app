import React, { useState } from "react";
import {
  IoSend,
  IoChevronBackOutline,
  IoEllipsisVerticalSharp,
} from "react-icons/io5";
import { stringToColor } from "../utils/stringToColor";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// mui
import {
  Stack,
  TextField,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";

// components
import ChatDropdownMenu from "../components/ChatDropdownMenu";

const Chat = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { chat } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack justifyContent="center" alignItems="center">
      <Stack
        sx={{
          width: {
            xs: "100%",
            sm: "40%",
          },
          height: "100vh",
        }}
      >
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
              <Avatar sx={{ background: stringToColor(state) }}>
                {state.toUpperCase()[0]}
              </Avatar>
            </Stack>
            <Typography sx={{ textTransform: "capitalize" }}>
              {state}
            </Typography>
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
        <Stack sx={{ flexGrow: 1, overflowY: "auto" }}>
          <Typography>messages</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 2 }}>
          <TextField placeholder="Type message here" fullWidth />
          <IconButton>
            <IoSend />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Chat;
