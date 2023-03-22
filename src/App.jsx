import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
  const authCheck = useAuthCheck();

  return authCheck ? (
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
  ) : (
    <div> Checking Authentication... </div>
  );
}

export default App;
