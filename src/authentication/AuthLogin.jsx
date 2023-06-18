import { useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";


import { auth } from "../firebase";

const style = {
  mainContainer: `bg-slate-100 flex flex-col rounded shadow p-5 my-5 h-full`,
  inputContainer: `flex flex-col items-center`,
  heading: `text-[#116A7B] font-bold text-lg text-center mb-3`,
  textInput: `border p-2 w-full text-lg mb-4 w-6/12`,
  submitButton: `bg-[#116A7B] text-white active:bg-pink-600 font-bold uppercase text-sm mt-2 px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`,
  currentUserContainer: `p-1 flex flex-row align-middle h-3/5`,
  currentUser: `text-[#116A7B] mb-1 font-bold text-md text-center mt-3`,
  signOutButton: `bg-[#116A7B] ml-3 text-white active:bg-pink-600 font-bold uppercase text-xs mt-2 px-3 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`,
};

function AuthLogin({user, setUser}) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      // Clear the input fields after successful login
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.inputContainer}>
        <h3 className={style.heading}> Log In </h3>
        <input
          className={style.textInput}
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          className={style.textInput}
          type="password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button className={style.submitButton} onClick={login}>
          {" "}
          Login
        </button>
      </div>

      {user && (
        <div className={style.inputContainer}>
          <h4 className={style.currentUser}>
            {" "}
            Current logged in user: {user?.email}
          </h4>

          <button className={style.signOutButton} onClick={logout}>
            {" "}
            Sign Out{" "}
          </button>
        </div>
      )}
    </div>
  );
}

AuthLogin.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
}

export default AuthLogin;
