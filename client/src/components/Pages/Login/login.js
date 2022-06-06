import React, { useState, Component } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
// import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./login.css";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // 적은 내용이 이메일이 서버로 보내지고, 이메일을 찾고 비밀번호를 비교한 후 토큰을 생성해서 쿠키에 저장하여 클라이언트에게 전해줌

    let body = {
      email: Email,
      password: Password,
    };

    /* 
        (3) Dispatch 
        : Action Creater로 return 해준 Action을 파라메터로 받아 
          store의 reducer에게 넘겨주는 역할을 해주는 열차
        */

    // dispatch를 하여 로그인 완료 후 처음 페이지로 이동
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/studentID");
        alert("로그인 성공");
      } else {
        alert("Error");
      }
    });

    // dispatch(loginUser(body)).then((response) => {
    //   if (response.payload.loginSuccess) {
    //     Navigate(-1);
    //   } else {
    //     alert("Error");
    //   }
    // });
  };

  return (
    <div className="login-wrapper">
      <div className="login-inner">
        <div className="login-container">
          <div className="form-div">
            <form onSubmit={onSubmitHandler}>
              <h3>로그인</h3>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={Email}
                onChange={onEmailHandler}
                className="form-control form-group"
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={Password}
                onChange={onPasswordHandler}
                className="form-control form-group"
              />
              <br />
              <div className="d-grid gap-2">
                <button className="btn btn-block">로그인</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// require("react-dom");
// window.React2 = require("react");
// console.log(window.React1 === window.React2);

export default Login;
