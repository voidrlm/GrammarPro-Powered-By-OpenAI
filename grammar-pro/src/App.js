import React, { useState } from "react";
import axios from "axios";
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
  Divider,
} from "@mui/material";

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [themeMode, setThemeMode] = useState("light");
  const [openKeyDialog, setOpenKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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
    localStorage.setItem("apiKey", apiKey);
    handleCloseKeyDialog();
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const [loading, setLoading] = useState(false);
  const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Copied to clipboard");
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() !== "") {
      let newText = "\n \n \n Correct spelling mistakes and fix the grammar.";
      let inputData = newMessage + newText;

      setLoading(true);

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputData }],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("apiKey")}`,
            },
          }
        );

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
        console.error("Error making API request:", error);
        setErrorMessage(
          "An error occurred while sending the message. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAlertClose = () => {
    setErrorMessage(null);
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
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: themeMode === "light" ? "#f5f5f5" : "#333",
          color: themeMode === "light" ? "#333" : "#fff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: themeMode === "light" ? "#fff" : "#424242",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <Toolbar>
            <div style={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: themeMode === "light" ? "#333" : "#fff",
                  fontWeight: "bold",
                }}
              >
                Grammar Pro
              </Typography>
              <Typography
                variant="subtitle1"
                color="inherit"
                sx={{
                  fontSize: "12px",
                  color: themeMode === "light" ? "#555" : "#ccc",
                  fontWeight: "bold",
                }}
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
              style={{ color: themeMode === "light" ? "#555" : "#ccc" }}
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
                    <Brightness4Icon />
                    <span style={{ marginLeft: "5px" }}>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Brightness7Icon />{" "}
                    <span style={{ marginLeft: "5px" }}>Light Mode</span>
                  </>
                )}
              </MenuItem>
              <MenuItem
                onClick={handleOpenKeyDialog}
                sx={{ color: themeMode === "light" ? "#333" : "#fff" }}
              >
                Enter API Key
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Container
          component="main"
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
              backgroundColor: themeMode === "light" ? "#fff" : "#424242",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
          >
            {messages.map((message, index) => (
              <React.Fragment key={index}>
                <div
                  style={{
                    textAlign: message.sender === "user" ? "right" : "left",
                    width: "100%",
                    marginBottom: "10px",
                    padding: "10px",
                    backgroundColor: themeMode === "light" ? "#f0f0f0" : "#555",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      textAlign: message.sender === "user" ? "right" : "left",
                      width: "100%",
                      marginBottom: "10px",
                      color: "555",
                      fontWeight: "bold",
                    }}
                  >
                    Here is the improved version.{" "}
                    <button
                      onClick={() => copyToClipboard(message.text)}
                      style={{
                        padding: "5px 5px",
                        cursor: "pointer",
                        backgroundColor: "#3498db",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        outline: "none",
                        transition: " background-color 0.3s ease",
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  {message.text}
                </div>

                {index < messages.length - 1 && (
                  <Divider
                    sx={{
                      backgroundColor: themeMode === "light" ? "#ddd" : "#777",
                    }}
                  />
                )}
              </React.Fragment>
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
              margin: "20px",
            }}
          >
            <TextField
              label="Enter your text to optimize..."
              variant="outlined"
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{
                flex: 1,
                marginRight: "10px",
                backgroundColor: themeMode === "light" ? "#fff" : "#424242",
                color: themeMode === "light" ? "#333" : "#fff",
                borderRadius: "10px",
              }}
              sx={{ borderRadius: "10px" }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: themeMode === "light" ? "#2196F3" : "#64B5F6",
                color: themeMode === "light" ? "#fff" : "#333",
                borderRadius: "10px",
              }}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Container>

        <Dialog
          open={openKeyDialog}
          onClose={handleCloseKeyDialog}
          sx={{
            color: themeMode === "light" ? "#333" : "#fff",
            borderRadius: "10px",
          }}
        >
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
