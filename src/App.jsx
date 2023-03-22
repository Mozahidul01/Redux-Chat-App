import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LogIn />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/inbox"
          element={<Conversation />}
        />
        <Route
          path="/inbox/:id"
          element={<Inbox />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
