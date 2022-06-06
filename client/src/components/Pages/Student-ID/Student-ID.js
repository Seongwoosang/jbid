import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu } from "antd";
import axios from "axios";
import { shallowEqual, useSelector } from "react-redux";
import "./StudentID.css";
import { auth } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import Navbar from "../../Nav/Navbar";

const { Header, Content, Footer } = Layout;
const StudentID = () => {
  var deleteCookie = function (name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
  };
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);
  // const user = useSelector((state) => state.user.userData);
  const major = localStorage.getItem("major");
  const stdNum = localStorage.getItem("stdNum");
  const name = localStorage.getItem("name");

  const onClickHandler = () => {
    axios.get(`/api/users/logout`).then((response) => {
      if (response.data.success) {
        localStorage.clear();
        deleteCookie("x_auth");
        navigate("/login");
      } else {
        alert("로그아웃 하는데 실패 했습니다.");
      }
    });
  };

  return (
    <div className="pages">
      <div className="home">
        <div className="home-logo">
          <img className="homeImg" src="img/JBID.png" alt="" />
        </div>
        <div className="stdId-content">
          <div className="stdId-container">
            <div className="stdId">
              {/* <div className="login-card-1">
              <div className="login-content"></div>
            </div> */}
              <div className="stdId-card-2">
                <div className="stdId-card-card">
                  <h3>중부대학교</h3>
                  <img className="profileImg" src="img/profile.png" alt="" />
                  <p>학번 : {stdNum}</p>
                  <p>성명 : {name}</p>
                  <p>학과 : {major}</p>
                  <li className="nav-item">
                    {" "}
                    <Link
                      exact
                      to="/"
                      activeClassName="active"
                      className="nav-links"
                      onClick={onClickHandler}
                    >
                      로그아웃
                    </Link>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentID;
