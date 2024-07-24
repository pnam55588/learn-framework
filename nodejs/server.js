const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const https = require("https");
const crypto = require("crypto");
const { base64url } = require("./helpers/helpers");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

let db = {
  users: [
    {
      id: "123",
      name: "Nam",
      email: "nam@gmail.com",
      password: "123",
      age: 22,
    },
    {
      id: "124",
      name: "Sally",
      email: "sal@gmail.com",
      password: "1234",
      age: 23,
    },
  ],
};
jwtSecret =process.env.JWT_SECRET || ""
  

app.get("/", (req, res) => {
  return res.send("Hello World");
});
app.post("/login", (req, res) => {
  const userReq = {
    email: req.body.email,
    password: req.body.password,
  };
  const user = db.users.find(
    (user) => user.email === userReq.email && user.password === userReq.password
  );
  if (user) {
    const header = {
      alg: "HS256",
      typ: "JWT",
    };
    const payload = {
      sub: user.id,
      exp: Date.now() + 3600 * 1000,
    };
    const encodeHeader = base64url(JSON.stringify(header));
    const encodePayload = base64url(JSON.stringify(payload));
    const tokenData = encodeHeader + "." + encodePayload;
    const hmac = crypto.createHmac("sha256", jwtSecret);
    const signature = hmac.update(tokenData).digest("base64url");
    res.json({ token: tokenData + "." + signature });
    return;
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

app.get("/user", (req, res) => {
  const token = req.headers.authorization?.slice(7);
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const [encodeHeader, encodePayload, tokenSignature] = token.split(".");
  const tokenData = encodeHeader + "." + encodePayload;
  const hmac = crypto.createHmac("sha256", jwtSecret);
  const signature = hmac.update(tokenData).digest("base64url");
  if (signature !== tokenSignature) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const payload = JSON.parse(atob(encodePayload));

  if(payload.exp < Date.now()){
    return res.status(401).json({ message: "Token expired" });
  }

  const user = db.users.find((user) => user.id === payload.sub);
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  return res.json(user);
});

https
  .createServer(
    {
      key: fs.readFileSync("./testdomain.nam+1-key.pem"),
      cert: fs.readFileSync("./testdomain.nam+1.pem"),
    },
    app
  )
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
