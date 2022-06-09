import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Pages/Home/home";
import Navbar from "./components/Nav/Navbar";
// import Login from "./components/Pages/Login/login";
// import Register from "./components/Modal/Register";
// import Register from "./components/Pages/Register/Register";
import StudentID from "./components/Pages/Student-ID/Student-ID";
import StdIdRegister from "./components/Pages/StdIdRegister/StdIdRegister";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./hoc/auth";
// import QRscan from "./components/Pages/qr/QRscanner";

function App() {
  const NewHome = Auth(Home, false);
  // const NewLogin = Auth(Login, false);
  // const NewRegister = Auth(Register, false);
  const NewStudentID = Auth(StudentID, true);
  const NewStdIdRegister = Auth(StdIdRegister, true);
  // const NewQRscanner = Auth(QRscan, true);


  return (
    <BrowserRouter>
      {/* <div className="pages"> */}
      <Routes>
        <Route path="/" element={<NewHome />} />
        {/* <Route path="/login" element={<NewLogin />} /> */}
        {/* <Route path="/register" element={<NewRegister />} /> */}
        <Route path="/studentID" element={<NewStudentID />} />
        <Route path="/stdIdRegister" element={<NewStdIdRegister />} />
        {/* <Route path="/QRscanner" element={<NewQRscanner />} /> */}
      </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
