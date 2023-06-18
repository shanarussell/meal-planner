import Home from "./Home";
import { useState } from "react";

import Navbar from "./Navbar";
import AuthLogin from "./authentication/AuthLogin";
import AuthRegister from "./authentication/AuthRegister";
import NewUserPage from "./NewUserPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

const style = {
  mainContainer: `bg-[#CDC2AE] flex flex-col pr-5 pl-8 min-h-screen`,
};

function App() {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  return (
    <div className={style.mainContainer}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <NewUserPage />} />

          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthRegister />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
