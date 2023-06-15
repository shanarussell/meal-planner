import { useState } from "react";
import { Link } from "react-router-dom";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

const style = {
  navContainer: `bg-[#116A7B] flex flex-row rounded shadow p-3 mt-5 text-white justify-end`,
  name: `mr-2`,
  button: `bg-slate-100 rounded mx-3 text-[#116A7B] px-3`,
  
};

const Navbar = () => {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <div className={style.navContainer}>
        {user && <div className={style.name}>Welcome, {user?.email}</div>}
        {user ? (
          <div className={style.button} onClick={logout}>
            Log Out
          </div>
        ) : (
          <div className={style.button}>
            <Link to="/login">Log In</Link>
          </div>
        )}
        {!user && <div className={style.button}>
          <Link to="/register">Register</Link>
        </div>}
        <div className={style.button}>
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
