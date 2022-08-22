import { useState } from "react";
// import VideoRoom from "./components/VideoRoom";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import MainPage from "./pages/MainPage";
import JoinMeeting from "./pages/JoinMeeting";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  // const [joined, setJoined] = useState(false);
  return (
    //   <div className="App">
    //     <h1>Virtual Call</h1>
    //     {!joined && <button onClick={() => setJoined(true)}>Join Room</button>}
    //     {joined && <VideoRoom />}
    //   </div>
    // );
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      {/* <CssBaseline /> */}
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/join/:room" element={<JoinMeeting />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
