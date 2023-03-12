import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<UserList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
