import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const style = {
  mainContainer: `bg-slate-100 flex flex-col rounded shadow p-5 my-5 h-full`,
  inputContainer: `flex flex-col items-center`,
  heading: `text-[#116A7B] font-bold text-lg text-center mb-3`,
  textInput: `border p-2 w-full text-lg mb-4 w-6/12`,
  submitButton: `bg-[#116A7B] text-white active:bg-pink-600 font-bold uppercase text-sm mt-2 px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`,
};

function AuthRegister() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.inputContainer}>
        <h3 className={style.heading}> Register User </h3>
        <input
          className={style.textInput}
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          className={style.textInput}
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button className={style.submitButton} onClick={register}>
          {" "}
          Create User
        </button>
      </div>
    </div>
  );
}

export default AuthRegister;
