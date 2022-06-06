import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Register from "../../Modal/Register";
import Login from "../../Modal/Login";

const Home = () => {
  const [LoginOpen, setLoginOpen] = useState(false);
  const [modalOpen, setRegisterOpen] = useState(false);

  return (
    <div className="home">
      {LoginOpen && <Login setOpenModal={setLoginOpen} />}
      {modalOpen && <Register setOpenModal={setRegisterOpen} />}
      <div className="home-logo">
        <img className="homeImg" src="img/JBID.png" alt="" />
      </div>
      <div className="home-content">
        <div className="home-container">
          <div className="login">
            <div className="login-card-1">
              <div className="login-content"></div>
            </div>
            <div className="login-card-2">
              <div className="login-content d-grid gap-2">
                <button
                  className="openModalBtn btn  btn-block"
                  onClick={() => {
                    setLoginOpen(true);
                  }}
                >
                  로그인
                </button>
                <br />
                <button
                  className="openModalBtn btn btn-block"
                  onClick={() => {
                    setRegisterOpen(true);
                  }}
                >
                  회원가입
                </button>
                <div className="jbLogo">
                  <img className="jbImg" src="img/JBlogo.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
