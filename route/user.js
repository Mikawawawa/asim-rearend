const app = require("express").Router();
const crud = require("../models/crud");
const mailToList = require("../models/mail");
const saveToCos = require("../models/cos");

app.get("/get", async (req, res) => {
  let data = await crud.getUser();
  res.send(data);
});

app.post("/put", async (req, res) => {
  let data = await crud.putUser(
    req.body.firstname,
    req.body.lastname,
    req.body.region,
    req.body.email,
    req.body.paper
  );
  res.send({ status: data.status * data.info.affectedRows });
  if (typeof req.body.paper !== "undefined") {
    mailToList(
      `收到${req.body.firstname} ${req.body.lastname}的文件`,
      req.body.paper
    );
    saveToCos(req.body.paper.split("、"));
  }
});

app.post("/delete", async (req, res) => {
  let data = await crud.deleteUser(req.body.id);
  res.send({ status: data.status * data.info.affectedRows });
});
module.exports = app;
