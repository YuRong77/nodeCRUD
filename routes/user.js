const express = require("express");
const router = express.Router();
const fireData = require("../connections/firebase_admin");
const user = fireData.ref("user"); //通常同一支檔案 都是改同一個資料

router.get("/getList", (req, res) => {
  user.once("value").then((snapshot) => {
    const list = snapshot.val();
    const List = []
    Object.keys(list).forEach(key=>{
      List.push({
        id: key,
        content:list[key].content
      })
    })
    res.json({
      success: true,
      Result: List,
      message: '取得清單'
    });
  });
});

router.post("/addList", (req, res) => {
  console.log(req.body); // 前端傳來的key值 都會在body中
  const content = req.body.content;
  user
    .push()
    .set({ content: content })
    .then(() => {
      // push產生亂數key並新增一筆  set則全部覆蓋  官方使用.push().set()  如果只用.push({...}) 會無法抓取key
      res.json({
        success: true,
        content: content,
        message: "新增成功",
      });
    });
});

router.post("/deleteList", (req, res) => {
  const _id = req.body.id;
  user
    .child(_id)
    .remove()
    .then(() => {
      res.json({
        success: true,
        id: _id,
        message: "刪除成功",
      });
    });
});

module.exports = router;
