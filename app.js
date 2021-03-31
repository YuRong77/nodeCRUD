const express = require("express");
const app = express();

const bodyParser = require("body-parser"); //讀取 req.body    npm install body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors"); // npm install cors
const corsOptions = {
  origin: ["https://yurong77.github.io/blogTest/", "http://127.0.0.1:5500"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
const user = require("./routes/user");
app.use("/user", user);

app.get("/", (req, res) => {
  res.send("hello");
});

// const fireData = require('./connections/firebase_admin')
// fireData
//   .ref("test")
//   .set({ title2: "hello" })
//   .then(() => {
//     fireData.ref("test").once("value", (snapshot) => {
//       console.log(snapshot.val());
//     });
//   });

// fireData.ref("test").once("value", (snapshot) => {
//   const list = snapshot.val()
//   console.log(list);
// });

// fireData.ref("test").once("value").then( snapshot => {
//   const list = snapshot.val()
// });

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`start at http://127.0.0.1:${port}`);
});
