import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../_actions/user_action";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  // const [Major, setMajor] = useState("");
  // const [StdNum, setStdNum] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  // localStorage.setItem("Email", JSON.stringify({ Email }));
  // localStorage.setItem("Name", JSON.stringify({ Name }));

  // const onMajorHandler = (event) => {
  //   setMajor(event.currentTarget.value);
  // };

  // const onStdNumHandler = (event) => {
  //   setStdNum(event.currentTarget.value);
  // };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
      // major: Major,
      // stdnum: StdNum,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success === true) {
        alert("회원 정보 입력 완료");
        navigate("/StdIdRegister");
      } else {
        alert("Failed to sign up");
      }
    });
  };

  return (
    <div className="register-wrapper">
      <div className="register-inner">
        <div className="register-container">
          <div className="form-div">
            <form onSubmit={onSubmitHandler}>
              <h3>Sign up</h3>

              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={Name}
                onChange={onNameHandler}
                className="form-control form-group"
              />

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

              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Password"
                value={ConfirmPassword}
                onChange={onConfirmPasswordHandler}
                className="form-control form-group"
              />
              <br />
              <div className="d-grid gap-2">
                <button className="btn  btn-block">Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
