import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";

const style = {
  navContainer: `bg-[#116A7B] h-30 flex flex-col rounded shadow p-2 mt-5 text-white items-center justify-end md:flex-row md:justify-items-stretch`,
  name: `text-center mr-2`,
  button: `h-7 bg-slate-100 rounded text-center m-2 w-24 text-[#116A7B] px-3 sm:mt-2`,
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
          
            <Link to="/login"><div className={style.button}>Log In</div></Link>
          
        )}
        {!user && (
         
            <Link to="/register"><div className={style.button}>Register</div></Link>
          
        )}
       
          <Link to="/"><div className={style.button}>Home</div></Link>
        
      </div>
    </div>
  );
};

Navbar.propTypes = {
  user: PropTypes.object,
};

export default Navbar;
