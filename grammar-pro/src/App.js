import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div>
            <Typography variant="h6" component="div">
              Grammar Pro
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              Powered by OpenAI
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      {/* The rest of your app content goes here */}
      <div style={{ padding: "20px" }}>
        <p></p>
      </div>
    </div>
  );
}

export default App;
