import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const style = {
    mainContainer: `bg-slate-200 flex flex-col rounded shadow p-5 my-5 h-full`,
    inputContainer: `flex flex-col items-center`,
    heading: `text-[#116A7B] font-bold text-lg text-center mb-3`,
    textInput: `border p-2 w-full text-lg mb-4 w-6/12`,
    submitButton: `bg-[#116A7B] text-white active:bg-pink-600 font-bold uppercase text-sm mt-2 px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`,
    currentUserContainer: `p-1 flex flex-row align-middle h-3/5`,
    currentUser: `text-[#116A7B] mb-1 font-bold text-md text-center mt-3`,
    signOutButton: `bg-[#116A7B] ml-3 text-white active:bg-pink-600 font-bold uppercase text-xs mt-2 px-3 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`,
    passwordLink: `text-sm font-bold text-center mt-3`
  };

function ForgotPassword() {
    const [loginEmail, setLoginEmail] = useState("");
    const auth = getAuth();
    const [message, setMessage] = useState("");

    async function resetPassword(e){
        e.preventDefault()

        try {
            setMessage("")
            await sendPasswordResetEmail(auth, loginEmail)
            setMessage("An email has been sent to this address. Follow the link in that email to reset your password");
      } catch {
        setMessage("This email does not exist in our system")
      }
    }


  return (
     <div className={style.mainContainer}>
      <div className={style.inputContainer}>
        <h3 className={style.heading}> Reset Your Password </h3>
        <input
          className={style.textInput}
          placeholder="Email address"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />

        <button className={style.submitButton} onClick={resetPassword}>
          {" "}
          Reset Password
        </button>
        <div>{message}</div>
      </div>

    </div>
  )
}

export default ForgotPassword;

