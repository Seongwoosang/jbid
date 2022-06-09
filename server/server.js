const express = require("express");
const app = express();
const port = 5000;
const bodyparser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
const crypto = require("crypto");
const base62 = require("base62");
const forge = require("node-forge");
const mathjs = require("mathjs");
const fs = require("fs");
const child_process = require("child_process");

// bodyarser가 서버에서 오는 정보를 분석해서 가져오도록
// application/x-www-form-urlencoded 데이터를 분석해서 가져옴
app.use(bodyparser.urlencoded({ extends: true }));
// application/json 데이터를 분석해서 가져옴
app.use(bodyparser.json());
// 토큰을 쿠키에 저장하기 위해 사용
app.use(cookieParser());

const mongoose = require("mongoose"); // mongoDB 사용
const MONGODB_URL =
  "mongodb+srv://wsblockchain:1234qwer@cluster0.4xg3v.mongodb.net/mytable?retryWrites=true&w=majority";
mongoose.connect(
  MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected");
    }
  }
);

app.get("/", (req, res) => res.send("Hello World! 안녕하세요"));

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요!");
});

// 회원가입
app.post("/api/users/register", (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);
  // 정보 저장, 에러 시 json 형식으로 전달
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });

  /* postman에 밑처럼 정보 입력 시 맞으면 success: true 출력
        {
            "name": "GaGa123",
            "email": "GaGa123@naver.com",
            "password": "1234567"
        } 
    */
});

// 학생증 회원가입
app.post("/api/users/stdIdRegister", (req, res) => {
  let currentToken = req.cookies.x_auth;
  User.updateMany(
    { token: currentToken },
    { major: req.body.major, stdNum: req.body.stdNum },
    (err, userInfo) => {
      if (err) return res.json({ success: false, err });
      return;
      // res.status(200).json({
      //   success: true,
      // });
    }
  );
  let token = req.cookies.x_auth;
  let stdNum = req.body.stdNum;
  let major = req.body.major;
  let name, email;

  try {
    User.find({ token: token }, { _id: 0, email: 1, name: 1 }, (err, data) => {
      if (err) throw err;
      if (data) {
        email = data[0].email;
        name = data[0].name;
        console.log(email, name);

        const infoDump = String(stdNum) + String(major) + String(email);
        console.log("infoDump", infoDump);
        const infoHash = crypto
          .createHash("sha256")
          .update(infoDump)
          .digest("hex");

        console.log(name);
        salt = forge.util.encodeUtf8(
          base62.encode(
            mathjs.random(1, 99999999999999999999999999999999999999)
          )
        );
        var emailDump = infoHash + String(name) + String(salt);
        var emailDumpUtf8 = forge.util.encodeUtf8(emailDump);
        var md = forge.md.sha256.create();
        var ud = md.update(emailDumpUtf8);
        const userKey = ud.digest().toHex();
        const userKeyJson = { userKey: "" };
        userKeyJson.userKey = userKey;
        User.updateOne(
          { token: currentToken },
          { userKey: userKey },
          (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
              success: true,
              userKey: userKeyJson.userKey,
              major: major,
              stdNum: stdNum,
            });
          }
        );
      }
    });
  } catch (err) {
    return res.json({ msg: "failed_Exception", error: String(err) });
  }
});

app.post("/api/generateDID", (req, res) => {
  const email = findEmailByStdNum;
  var studentDB = User.find();
  const userKey = req.body.userKey;
  const stdNum = req.body.stdNum;
  const major = req.body.major;
  var timeStamp = parseInt(new Date().getTime() / 1000);
  const walletKey = req.body.password;
  const walletName = crypto
    .createHash("sha256")
    .update(email + String(timeStamp))
    .digest("hex");

  var findEmailByStdNum = User.find(
    { stdNum: stdNum },
    { email: 1, _id: 0 },
    (err, data) => {
      if (err) throw err;
      if (data) console.log(data[0].email);
      return data[0].email;
    }
  );
  const comparePw = User.findOne({ email: findEmailByStdNum }, (err, user) => {
    if (!user) {
      let err = new Error("User not found");
      return err.message;
    }
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        let err2 = new Error("Password not found");
        return err2.message;
      }
    });
  });

  try {
    if (comparePw === "Password not found") {
      let err = new Error("password not found");
      throw err.message;
    }
    if (comparePw === "User not found") {
      let err2 = new Error("Password not found");
      throw err2.message;
    } else {
      let genDID = child_process.spawnSync("python", [
        "C:\\Users\\성우상\\OneDrive\\바탕 화면\\cp\\wschain\\indy-scripts\\start_docker\\generate_did.py",
        walletName,
        walletKey,
        stdNum,
      ]);
      genDID;
      console.log("stdout", genDID.stdout.toString());
    }
  } catch (err) {
    return res.json({ msg: "failed_Exception", error: String(err) });
  }

  try {
    let jsonData;
    let error;
    let did, comp, compUtf8, didTimeHash;

    fs.readFile(
      "C:\\Users\\성우상\\OneDrive\\바탕 화면\\cp\\wschain\\" +
        walletName +
        "_gen_did.json",
      (err, data) => {
        // 파일 읽기
        if (err) {
          throw err;
        }
        let extractData = data.toString();
        jsonData = JSON.parse(extractData);

        error = jsonData.error;

        if (error === "Error") {
          fs.unlink(
            "C:\\Users\\성우상\\OneDrive\\바탕 화면\\cp\\wschain\\" +
              walletName +
              "_gen_did.json",
            (err) => {
              if (err) throw err;
            }
          );
          return res.json({ msg: "DID generate error" });
        }

        fs.unlink(
          "C:\\Users\\성우상\\OneDrive\\바탕 화면\\cp\\wschain\\" +
            walletName +
            "_gen_did.json",
          (err) => {
            if (err) throw err;
          }
        );

        did = jsonData.did;

        comp = String(did) + String(walletKey);
        compUtf8 = forge.util.encodeUtf8(comp);
        didTimeHash = crypto
          .createHash("sha256")
          .update(compUtf8)
          .digest("hex");

        var issuedData = {
          email: "",
          userKey: "",
          walletId: "",
          did: "",
          didTimeHash: "",
        };
        issuedData.email = email;
        issuedData.userKey = userKey;
        issuedData.walletId = walletName;
        issuedData.did = did;
        issuedData.didTimeHash = didTimeHash;

        User.updateMany(
          { stdNum: stdNum },
          {
            did: issuedData.did,
            walletId: issuedData.walletId,
            didTimeHash: issuedData.didTimeHash,
          },
          (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
              success: true,
              did: did,
              error: error,
            });
          }
        );

        // return res.json({ 'did': did, 'error': error });
      }
    );
  } catch (err) {
    return res.json({ msg: "failed_Exception", error: String(err) });
  }
});
// 로그인
app.post("/api/users/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호까지 맞다면 토큰을 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 정상적일 경우 토큰을 쿠키나 로컬스토리지 등에 저장
        // 쿠키에 저장
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });

        /* 밑처럼 로그인 테스트
                    {
                        "email": "test@naver.com",
                        "password": "1234567"
                    }
                */
      });
    });
  });
});

// auth 인증
app.get("/api/users/auth", auth, (req, res) => {
  // 여기까지 미들웨어(auth.js)를 통과해 왔다는 얘기는 Authentication이 True라는 말
  // 클라이언트에게 유저 정보 전달
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // role이 0이면 일반 유저, 그외는 관리자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    stdNum: req.user.stdNum,
    major: req.user.major,
    did: req.user.did,
    userKey: req.user.userKey,
  });
});

// 로그아웃 - 토큰을 지워주기(자동으로 인증이 풀리므로 로그아웃)
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
