import React, { useState } from "react";
import { Fab, TextareaAutosize } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { QrReader } from "react-qr-reader";

function QRscanner() {
  const [qrscan, setQrscan] = useState("No result");
  const handleScan = (data) => {
    if (data) {
      setQrscan(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const value = { qrscan };
  console.log(value);

  const defaultValue = { qrscan };
  console.log(defaultValue);

  return (
    <div>
      <Link to="/">
        <Fab style={{ marginRight: 10 }} color="primary">
          <ArrowBack />
        </Fab>
      </Link>
      <span>Home</span>

      <center>
        <div style={{ margin: 10, height: 240, width: 320 }}>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            onResult={handleScan}
          />
        </div>
      </center>

      <TextareaAutosize
        style={{ fontSize: 18, width: 320, height: 100, marginTop: 100 }}
        rowsMax={4}
        defaultValue={qrscan}
        value={qrscan}
      />
    </div>
  );
}

export default QRscanner;
