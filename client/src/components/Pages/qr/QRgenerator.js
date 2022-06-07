import * as forge from "node-forge";
import React, { useState } from "react";
import { Fab, TextField, TextareaAutosize, Grid } from "@material-ui/core";
import { ArrowBack, GetApp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import QRcode from "qrcode.react";
import "./qrgen.css";

function QRgenerator() {
  // const [qr, setQr] = useState("");
  const [major, setmajor] = useState("");
  const [stdNum, setstdNum] = useState("");
  const [did, setdid] = useState("");
  const [name, setname] = useState("");
  const handleChange = (event) => {
    setname(event.currentTarget.value);
    setmajor(event.currentTarget.value);
    setstdNum(event.currentTarget.value);
    setdid(event.currentTarget.value);
    // setQr();
    // localStorage.getItem("Major", JSON.stringify({ Major }))
    // localStorage.getItem("StdNum", JSON.stringify({ StdNum }))
    // localStorage.getItem("Email", JSON.stringify({ Email }))
    // localStorage.setItem("Name", JSON.stringify({ Name }))
    // localStorage.getItem("Password", JSON.stringify({ Password }))
  };

  let nm = localStorage.getItem("name", JSON.stringify({ name }));
  let mj = localStorage.getItem("major", JSON.stringify({ major }));
  let stm = localStorage.getItem("stdNum", JSON.stringify({ stdNum }));
  let em = localStorage.getItem("did", JSON.stringify({ did }));

  let qr;

  qr.push(nm, mj, stm, em);

  const downloadQR = () => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "myqr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <Link to="/studentID">
        <Fab style={{ marginRight: 10 }}>
          <ArrowBack />
        </Fab>
      </Link>
      <span>학생증</span>

      {/* <div style={{ marginTop: 30 }}>
        <TextField
          onChange={handleChange}
          style={{ width: 320 }}
          value={qr}
          label="QR content"
          size="large"
          variant="outlined"
          color="primary"
        />
      </div> */}

      <div className="qr-main">
        {qr ? (
          <QRcode
            // style={{ margin: 0 }}
            onChange={handleChange}
            id="myqr"
            value={qr}
            size={320}
            includeMargin={true}
          />
        ) : (
          <p>No QR code preview</p>
        )}
      </div>
      <div>
        {qr ? (
          <Grid container>
            <Grid item xs={10}>
              {/* <TextareaAutosize
                style={{ fontSize: 18, width: 250, height: 100 }}
                rowsMax={4}
                defaultValue={qr}
                value={qr}
              /> */}
            </Grid>
            <Grid item xs={2}>
              <Fab
                onClick={downloadQR}
                style={{ marginLeft: 10 }}
                // color="primary"
              >
                <GetApp />
              </Fab>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default QRgenerator;
