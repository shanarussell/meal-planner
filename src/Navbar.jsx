import React from 'react'
import {Link} from "react-router-dom"

const style = {
  navContainer: `bg-[#116A7B] flex flex-row rounded shadow p-3 mt-5 text-white justify-end`,
  name: `mr-2`,
  button: `bg-slate-100 rounded mx-3 text-[#116A7B] px-3`,
};

const Navbar = () => {
  return (
    <div>
      <div className={style.navContainer}>
        <div className={style.name}>Welcome, Name</div>
        <div className={style.button}><Link to="/login">Log In</Link></div>
        <div className={style.button}><Link to="/register">Register</Link></div>
        <div className={style.button}><Link to="/">Home</Link></div>
      </div>
    </div>
  );
}

export default Navbar
