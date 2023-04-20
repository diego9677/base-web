import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";


function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="" element={<Navigate to={"/home"} />} />
    </Routes>
  );
}

export default App;
