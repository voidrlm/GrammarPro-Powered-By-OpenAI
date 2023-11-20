import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { TextField, Button, Container, Paper } from "@mui/material";

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [themeMode, setThemeMode] = useState("light");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggleTheme = () => {
    setThemeMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    handleMenuClose();
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
              <MenuItem onClick={handleToggleTheme}>
                {themeMode === "light" ? (
                  <>
                    <Brightness4Icon /> Dark Mode
                  </>
                ) : (
                  <>
                    <Brightness7Icon /> Light Mode
                  </>
                )}
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ marginTop: "20px" }}>
          <Paper elevation={3} sx={{ padding: "20px", minHeight: "300px" }}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: message.sender === "user" ? "right" : "left",
                  }}
                >
                  {message.text}
                </div>
              ))}
            </div>
          </Paper>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <TextField
              label="Type a message..."
              variant="outlined"
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button variant="contained" onClick={handleSendMessage}>
              Send
            </Button>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
