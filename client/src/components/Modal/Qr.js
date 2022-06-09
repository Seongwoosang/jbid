import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, auth } from "../../_actions/user_action";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Modal.css";
// import { Fab, TextField, TextareaAutosize, Grid } from "@material-ui/core";
// import { ArrowBack, GetApp } from "@material-ui/icons";
import QRcode from "qrcode.react";
import * as forge from 'node-forge';
var qr;



const Qr = ({ setOpenModal }) => {

  var sha256 = forge.md.sha256.create();
  var did = localStorage.getItem("did");
  // let pw = localStorage.getItem("");
  var qrString; 
  var count = 15;
  
  let QrModal = setOpenModal;

  const [Seconds, setSeconds] = useState(count);
  // const [Qr, setQr] = useState("");

  const time = useRef(15)
  const timerId = useRef(null);
  
  const onQrHandler = (event) => {
  }

  const onSecHandler = (event) => {
  }
  
  const setQrCode = () => {
    var timeStamp = Math.round(+new Date() / 1000);
    var hashedData = sha256.update(forge.util.encodeUtf8(did)).digest().toHex();
    var hashedDataWithDid = sha256.update(forge.util.encodeUtf8(hashedData + timeStamp)).digest().toHex();
    qrString = (hashedDataWithDid + "_" + did + "_" + timeStamp);
    qr = qrString
    return qr
  }

  useEffect(() => {
    time.current -= 1;
    timerId.current = setInterval(() => {
      setSeconds(time.current % 60);
      time.current -= 1;
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time.current <= 0) { 
      time.current += 15;
    }
  })
  if (time.current === 15) {
    setQrCode();
  }

  
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="register-content">
          <div className="qr-main">
            {qr ? (
              <QRcode     
                style={{ margin: 10 }}
                onChange={onQrHandler}
                id="myqr"
                value={qr}
                size={250}
                includeMargin={true}
              />
            ) : (
                <p>No QR code preview</p>  
            )}
          </div>
          <div onChange={onSecHandler} >
            QR 유효 시간 : {Seconds}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qr;
