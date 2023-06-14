import Home from "./Home";

import Navbar from "./Navbar";
import AuthLogin from "./AuthLogin";
import AuthRegister from "./AuthRegister";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const style = {
  mainContainer: `bg-[#CDC2AE] flex flex-col pr-5 pl-8 min-h-screen`,
};

function App() {
  return (
    <div className={style.mainContainer}>
      


      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthRegister />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
