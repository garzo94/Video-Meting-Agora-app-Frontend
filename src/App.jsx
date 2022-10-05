
// import VideoRoom from "./components/VideoRoom";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import MainPage from "./pages/MainPage";
import JoinMeeting from "./pages/JoinMeeting";
import CssBaseline from "@mui/material/CssBaseline";
import RoomMeeting from "./pages/RoomMeeting";
import { Provider } from "./globalVariables/MeetingContext";

function App() {
  // const [joined, setJoined] = useState(false);
  return (
    //   <div className="App">
    //     <h1>Virtual Call</h1>
    //     {!joined && <button onClick={() => setJoined(true)}>Join Room</button>}
    //     {joined && <VideoRoom />}
    //   </div>
    // );
    <Provider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <CssBaseline />

        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/join/:room" element={<JoinMeeting />} />
            <Route path="/room/:room/:name" element={<RoomMeeting />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
