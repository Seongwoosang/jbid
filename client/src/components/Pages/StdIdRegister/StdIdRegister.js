import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { stdIdRegister } from "../../../_actions/user_action";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsCheckLg } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import "./StdIdRegister.css";
import Password from "../../Modal/Password";

function StdIdRegisterPage(props) {
  const [PasswordOpen, setPasswordOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Major, setMajor] = useState("");
  const [StdNum, setStdNum] = useState("");
  let [On, setOn] = useState(true);

  const onMajorHandler = (event) => {
    setMajor(event.currentTarget.value);
  };

  const onStdNumHandler = (event) => {
    setStdNum(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // if (Password !== ConfirmPassword) {
    //   return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    // }

    let body = {
      major: Major,
      stdNum: StdNum,
    };

    dispatch(stdIdRegister(body)).then((response) => {
      if (response.payload.success === true) {
        console.log(response);
        localStorage.setItem("major", response.payload.major);
        localStorage.setItem("stdNum", response.payload.stdNum);
        localStorage.setItem("userKey", response.payload.userKey);
        alert("정상적으로 회원 정보가 등록되었습니다. 학생증을 발급해주세요!");
        // navigate("/studentID");
        setOn(!setOn);
      } else {
        alert("회원가입에 실패했습니다.");
      }
    });
  };

  const onSubmitHandler2 = (event) => {
    event.preventDefault();
  };

  const onSubmitHandler3 = (event) => {
    event.preventDefault();
  };

  return (
    <div className="home">
      {PasswordOpen && <Password setOpenModal={setPasswordOpen} />}
      <div className="home-logo">
        <img className="homeImg" src="img/JBID.png" alt="" />
      </div>
      <div className="stdRegister-container">
        {/* <div className="login-card-1">
              <div className="login-content"></div>
            </div> */}
        <div className="stdRegister-card">
          <h3>학생증 발급</h3>
          <div className="stdRegister-content">
            <div className="form-div">
              {On === true ? (
                <form onSubmit={onSubmitHandler}>
                  <h3>Student ID</h3>

                  <label>학과 *</label>
                  <input
                    type="text"
                    placeholder="학과"
                    value={Major}
                    onChange={onMajorHandler}
                    className="form-control form-group"
                  />

                  <label>학번 *</label>
                  <input
                    type="number"
                    placeholder="학번"
                    value={StdNum}
                    onChange={onStdNumHandler}
                    className="form-control form-group"
                  />
                  <br />
                  <div className="d-grid gap-2">
                    <button className="registerbtn btn btn-block">
                      회원 정보 등록&nbsp;&nbsp;
                      <FaPen />
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={onSubmitHandler2}>
                  <h3>Student ID</h3>

                  <label>학과 *</label>
                  <input
                    type="text"
                    placeholder=""
                    value={localStorage.getItem("major")}
                    className="form-control form-group"
                  />

                  <label>학번 *</label>
                  <input
                    type="text"
                    placeholder=""
                    value={localStorage.getItem("stdNum")}
                    className="form-control form-group"
                  />
                  <br />
                  {/* <div className="d-grid gap-2">회원정보 등록 완료 ! ! ! !</div> */}
                  <div className="stdIdRegister-btn d-grid gap-2">
                    <button disabled className="registerbtn-2 btn btn-block">
                      회원정보 등록 완료&nbsp;&nbsp;
                      <BsCheckLg />
                    </button>
                  </div>
                  <br />

                  <div className="d-grid gap-2">
                    <button
                      className="passwordbtn btn btn-block"
                      onClick={() => {
                        setPasswordOpen(true);
                      }}
                    >
                      학생증 발급
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StdIdRegisterPage;
