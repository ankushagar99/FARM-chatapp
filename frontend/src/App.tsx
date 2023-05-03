import { useState } from "react";
import "./App.css";
import CreateRoom from "./pages/createroom/createroom";
import ChatRoom from "./pages/chatroom/chatroom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ChatRoom/>
    </div>
  );
}

export default App;
