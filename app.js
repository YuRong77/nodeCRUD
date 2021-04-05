const express = require("express");
const app = express();

const bodyParser = require("body-parser"); //讀取 req.body    npm install body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors"); // 處理CORS npm install cors
const corsOptions = {
  origin: ["https://yurong77.github.io", "http://127.0.0.1:5500"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const user = require("./routes/user");
app.use("/user", user);

app.get("/", (req, res) => {
  res.send("hello");
});

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`start at http://127.0.0.1:${port}`);
});
