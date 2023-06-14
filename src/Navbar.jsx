import React from 'react'

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
        <div className={style.button}>Log In</div>
        <div className={style.button}>Register</div>
        <div className={style.button}>Log Out</div>
      </div>
    </div>
  );
}

export default Navbar
