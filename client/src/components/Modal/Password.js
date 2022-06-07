import React, { useState, useEffect } from "react";
import axios from "axios";
// import UserList from "../components/UserList";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, auth, generateDID } from "../../_actions/user_action";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Password.css";
import { Loading } from "../Modal/Loading/Loading.js";
import { render } from "react-dom";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./Loading/AnimatedProgressProvider";
import Spinner from "../Spinner";

const percentage = 100;

const Password = ({ setOpenModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userKey = localStorage.getItem("userKey");
  let stdNum = localStorage.getItem("stdNum");
  let major = localStorage.getItem("major");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Flick, setFlick] = useState(false);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setUsers(response.data);
      setLoading(false);
    });
  }, []);

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // 적은 내용이 이메일이 서버로 보내지고, 이메일을 찾고 비밀번호를 비교한 후 토큰을 생성해서 쿠키에 저장하여 클라이언트에게 전해줌

    let body = {
      userKey: userKey,
      stdNum: stdNum,
      major: major,
      password: Password,
    };

    /* 
        (3) Dispatch 
        : Action Creater로 return 해준 Action을 파라메터로 받아 
          store의 reducer에게 넘겨주는 역할을 해주는 열차
        */

    // dispatch를 하여 로그인 완료 후 처음 페이지로 이동
    dispatch(generateDID(body)).then((response) => {
      if (response.payload.success === true) {
        console.log(response);
        localStorage.setItem("did", response.payload.did);
        navigate("/studentID");
        setFlick(!setFlick);
      } else {
        console.log(response);
        alert("DID발급 오류");
      }
    });
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer-2">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        {/* <div className="title">
          <h1>회원가입</h1>
        </div> */}
        <div className="register-content">
          <div className="form-div">
            <form onSubmit={onSubmitHandler}>
              <h5>비밀번호를 입력해주세요.</h5>
              {/* <Loading /> */}
              <input
                type="password"
                placeholder="Password"
                value={Password}
                onChange={onPasswordHandler}
                className="form-control form-group"
              />
              <br />
              <div className="d-grid gap-2">
                <button
                  className="registerbtn btn btn-block"
                  id="cancelBtn"
                  onClick={() => {
                    setFlick(!Flick);
                  }}
                >
                  학생증 발급
                </button>
                <div style={{ padding: "40px 40px 40px 40px" }}>
                  <div label="Fully controlled text animation using react-move">
                    <AnimatedProgressProvider
                      valueStart={0}
                      valueEnd={100}
                      duration={1}
                      easingFunction={easeQuadInOut}
                      repeat
                    >
                      {(value) => {
                        const roundedValue = Math.round(value);
                        return (
                          <>
                            {Flick ? (
                              <CircularProgressbar
                                value={value}
                                text={`${roundedValue}%`}
                                styles={buildStyles({ pathTransition: "none" })}
                              />
                            ) : null}
                          </>
                        );
                      }}
                    </AnimatedProgressProvider>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Continue</button>
        </div> */}
      </div>
    </div>
  );
};

export default Password;
