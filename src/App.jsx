import { useState } from "react";
import VideoRoom from "./components/VideoRoom";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import MainPage from "./pages/MainPage";

function App() {
  // const [joined, setJoined] = useState(false);
  return (
    //   <div className="App">
    //     <h1>Virtual Call</h1>
    //     {!joined && <button onClick={() => setJoined(true)}>Join Room</button>}
    //     {joined && <VideoRoom />}
    //   </div>
    // );
    <SnackbarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
