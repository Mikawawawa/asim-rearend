const app = require("express").Router();
const crud = require("../models/crud");

app.get("/get", async (req, res) => {
  let data = await crud.getEmail();
  res.send(data);
});

app.post("/delete", async (req, res) => {
  let data = await crud.deleteEmail(req.body.address);
  res.send(data.status * data.info.affectedRows);
});

app.post("/put", async (req, res) => {
  let data = await crud.putEmail(req.body.address);
  res.send(data.status * data.info.affectedRows);
});

module.exports = app;
