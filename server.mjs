import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import sessions from "express-session";
import bodyParser from "body-parser";
import data from "./data.json";
import faker from "faker";

const oneDay = 1000 * 60 * 60 * 24;
const app = express();
app.use(express.static("public"));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());
app.use(express.json());
// app.use(cors());

const PORT = process.env.PORT || 5000;

let session = new Map();

let id = 0;

let dataInMemory = { ...data };

let userInfo = {
  userName: "",
  avatar: "",
};

app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    req.header("access-control-request-headers")
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Simple authentication to check if user have login before.
app.get("/api/authentication", (req, res) => {
  const cookie = req.cookies;

  if (cookie.id && session.has(cookie.id)) {
    res.send({
      success: true,
      name: userInfo.userName,
      avatar: userInfo.avatar,
    });
  } else {
    res.send({ success: false });
  }
});

// Always authenticating user when he sign ups via login
app.post("/api/login", (req, res) => {
  const body = req.body;

  if (body.userName) {
    userInfo.userName = body.userName;
  }

  let tempAvatar = faker.image.avatar();
  if (!userInfo.avatar) {
    userInfo.avatar = tempAvatar;
  }

  let options = {
    maxAge: 1000 * 60 * 60, // would expire after 1 hours
    httpOnly: false,
  };

  session.set(`cookies ${id}`, userInfo);
  res.cookie("id", `cookies ${id}`, options);
  res.send({ success: true, avatar: userInfo.avatar, id });
  id++;
});

app.post("/api/post/:uuid", (req, res) => {
  const uuid = req.params.uuid;
  const postObject = req.body;
  let returnObject;
  if (postObject.like !== undefined) {
    for (let i = 0; i < dataInMemory.table.length; i++) {
      if (dataInMemory.table[i].uuid === uuid) {
        if (+postObject.like === 1) {
          dataInMemory.table[i].isLike = true;
        } else {
          dataInMemory.table[i].isLike = false;
        }
        returnObject = dataInMemory.table[i];
        break;
      }
    }
  }

  if (postObject.going !== undefined) {
    for (let i = 0; i < dataInMemory.table.length; i++) {
      if (dataInMemory.table[i].uuid === uuid) {
        if (+postObject.going === 1) {
          dataInMemory.table[i].isGoing = true;
        } else {
          dataInMemory.table[i].isGoing = false;
        }
        returnObject = dataInMemory.table[i];
        break;
      }
    }
  }

  if (postObject.comment !== undefined) {
    for (let i = 0; i < dataInMemory.table.length; i++) {
      if (dataInMemory.table[i].uuid === uuid) {
        dataInMemory.table[i].chatsArray.push(postObject.comment);
        returnObject = dataInMemory.table[i];
        break;
      }
    }
  }

  res.send({ updatedObject: returnObject, uuid });
});

app.get("/api/post/:uuid", (req, res) => {
  const uuid = req.params.uuid;
  for (let i = 0; i < dataInMemory.table.length; i++) {
    if (dataInMemory.table[i].uuid === uuid) {
      res.send(dataInMemory.table[i]);
      return;
    }
  }
});

// End point to filter the posts based on search and pageNo
app.get("/api/posts/", (req, res) => {
  const pageNo = req.query?.page || 0;
  const sDate = req.query?.sDate;
  const eDate = req.query?.eDate;
  const channel = req.query?.chn;

  let table = [...dataInMemory.table];
  const object = {};
  object.table = [];

  if (sDate && eDate) {
    const querySD = new Date(sDate);
    const queryED = new Date(eDate);
    table = table.filter(x => {
      const sD = new Date(x.startDate);
      const eD = new Date(x.endDate);
      return (
        querySD <= queryED &&
        querySD <= sD &&
        sD <= queryED &&
        querySD <= eD &&
        eD <= queryED
      );
    });
  }

  if (channel) {
    table = table.filter(x => x.channelName === channel);
  }

  for (let i = 0; i < Math.min(10, table.length); i++) {
    if (table[pageNo * 10 + i]) object.table.push(table[pageNo * 10 + i]);
  }

  object.total = table.length;

  res.send(object);
});

app.listen(PORT, () => {
  console.log("App is listening on port " + PORT);
});
