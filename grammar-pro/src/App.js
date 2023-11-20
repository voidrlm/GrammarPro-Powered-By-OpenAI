import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDarkModeToggle = () => {
    handleMenuClose();
  };

  const handleLightModeToggle = () => {
    handleMenuClose();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              Grammar Pro
            </Typography>
            <Typography
              variant="subtitle1"
              color="inherit"
              sx={{ fontSize: "12px" }}
            >
              Powered by OpenAI
            </Typography>
          </div>
          <IconButton
            color="inherit"
            aria-label="settings"
            aria-controls="settings-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <SettingsIcon />
          </IconButton>
          <Menu
            id="settings-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDarkModeToggle}>
              <Brightness4Icon /> Dark Mode
            </MenuItem>
            <MenuItem onClick={handleLightModeToggle}>
              <Brightness7Icon /> Light Mode
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {/* The rest of your app content goes here */}
      <div style={{ padding: "20px" }}>
        <p>.</p>
      </div>
    </div>
  );
}

export default App;
