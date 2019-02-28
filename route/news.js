const app = require("express").Router();
const crud = require("../models/crud");
const md5 = require("js-md5");
const saveAs = require("../models/file");

app.get("/get", async (req, res) => {
  let data = await crud.getNews();
  res.send(data);
});

app.post("/delete", async (req, res) => {
  let data = await crud.deleteNews(req.body.id);
  res.send({
    status: data.status * data.info.affectedRows
  });
});

app.post("/put", async (req, res) => {
  saveAs(md5(req.body.content) + ".md", req.body.content);
  let data = await crud.putNews(req.body.title, md5(req.body.content));
  res.send({ status: data.status });
});

app.get("/detail", async (req, res) => {
  let id = req.query.hash;
  fs.readFile(`../upload/${id}.md`, (err, data) => {
    if (err) {
      res.end({
        code: 0,
        info: "NOT FOUND",
        data: ""
      });
    } else {
      res.end({
        code: 1,
        info: "SUCCESS",
        data: data.toString()
      });
    }
  });
});

module.exports = app;
