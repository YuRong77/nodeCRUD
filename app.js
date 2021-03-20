const express = require("express");
const app = express();

// firebase
const admin = require("firebase-admin");
const serviceAccount = require("./nodecrud-b3a6b-firebase-adminsdk-jc17w-76ba009dc2.json");

app.get("/", (req, res) => {
  res.send("hello get");
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodecrud-b3a6b-default-rtdb.firebaseio.com",
});

const fireData = admin.database();

fireData
  .ref("test")
  .set({ title2: "hello" })
  .then(() => {
    fireData.ref("test").once("value", (snapshot) => {
      console.log(snapshot.val());
    });
  });

// fireData.ref("test").once("value", (snapshot) => {
//   console.log(snapshot.val());
// });

app.get("/", (res, req) => {});

const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`start at http://127.0.0.1:${port}`);
});
