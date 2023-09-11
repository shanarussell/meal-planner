import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";

const style = {
  navContainer: `bg-[#116A7B] h-30 flex flex-col rounded shadow p-2 mt-5 text-white items-center justify-end md:flex-row`,
  name: `text-center mr-2`,
  button: `h-7 bg-slate-100 rounded text-center m-2 w-full text-[#116A7B] px-3 sm:mt-2 sm:w-full md:w-1/6`,
};

const Navbar = ({ user }) => {
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
        {!user && (
          <div className={style.button}>
            <Link to="/register">Register</Link>
          </div>
        )}
        <div className={style.button}>
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  user: PropTypes.object,
};

export default Navbar;
