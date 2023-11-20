import React, { useState } from "react";
import axios from "axios"; // Import axios
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  TextField,
  Button,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [themeMode, setThemeMode] = useState("light");
  const [openKeyDialog, setOpenKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState("");

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

  const handleOpenKeyDialog = () => {
    setOpenKeyDialog(true);
  };

  const handleCloseKeyDialog = () => {
    setOpenKeyDialog(false);
  };

  const handleSaveApiKey = () => {
    // You can perform additional validation here if needed
    localStorage.setItem("apiKey", apiKey);
    handleCloseKeyDialog();
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() !== "") {
      let newText = "\n \n \n Write this better.";
      let inputData = newMessage + newText;

      // Set loading to true when making the API request
      setLoading(true);

      // Make a request to OpenAI GPT-3.5 Chat API
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions", // GPT-3.5 Chat API endpoint
          {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: inputData }, // Use inputData here
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("apiKey")}`, // Use the stored API key
            },
          }
        );

        // Handle the response from the API as needed
        console.log(response.data.choices[0].message.content);
        setMessages([
          ...messages,
          {
            text: response.data.choices[0].message.content,
            sender: "assistant",
          },
        ]);
        setNewMessage("");
      } catch (error) {
        // Handle errors
        console.error("Error making API request:", error);
      } finally {
        // Set loading back to false after the request is complete (success or error)
        setLoading(false);
      }
    }
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
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
              <MenuItem onClick={handleOpenKeyDialog}>Enter API Key</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Container
          component="main"
          maxWidth="xs"
          sx={{
            marginTop: "20px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  textAlign: message.sender === "user" ? "right" : "left",
                  width: "100%",
                }}
              >
                {message.text}
              </div>
            ))}
          </Paper>
          <form
            onSubmit={handleSendMessage}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TextField
              label="Type a message..."
              variant="outlined"
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ flex: 1, marginRight: "10px" }}
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </Button>
          </form>
        </Container>

        <Dialog open={openKeyDialog} onClose={handleCloseKeyDialog}>
          <DialogTitle>Enter API Key</DialogTitle>
          <DialogContent>
            <TextField
              label="API Key"
              variant="outlined"
              fullWidth
              value={apiKey}
              onChange={handleApiKeyChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseKeyDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveApiKey} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default App;
