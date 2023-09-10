import Home from "./Home";
import { useState, useEffect } from "react";

import Navbar from "./Navbar";
import AuthLogin from "./authentication/AuthLogin";
import AuthRegister from "./authentication/AuthRegister";
import ForgotPassword from "./authentication/ForgotPassword";
import NewUserPage from "./NewUserPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";


import { auth } from "./firebase";

const style = {
  mainContainer: `bg-[#CDC2AE] flex flex-col pr-5 pl-8 min-h-screen`,
};

function App() {

  //get current user (and pass this through props)
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // const userID = user.uid;

  // //log out
  // const logout = async () => {
  //   await signOut(auth);
  // };


  return (
    <div className={style.mainContainer}>
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          <Route
            path="/"
            element={user ? <Home user={user} /> : <NewUserPage />}
          />

          <Route
            path="/login"
            element={<AuthLogin user={user} setUser={setUser} />}
          />
          <Route
            path="/register"
            element={<AuthRegister user={user} setUser={setUser} />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
