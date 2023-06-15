import { useState } from "react";
import "./App.css";
import CreateRoom from "./pages/createroom/createroom";
import ChatRoom from "./pages/chatroom/chatroom";
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
