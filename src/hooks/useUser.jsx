import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function useUser() {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return { user };
}

export default useUser;
