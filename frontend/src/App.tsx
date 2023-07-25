import { lazy } from "react";
import "./App.css";
const CreateRoom = lazy(() => import("./pages/createroom/createroom"));
const ChatRoom = lazy(() => import("./pages/chatroom/chatroom"));
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateRoom />} />
        <Route path="/chat/:id" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
