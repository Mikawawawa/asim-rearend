const app = require("express").Router();
const fs = require("fs");
const md5 = require("js-md5");
const mailToList = require("../models/mail");
const sendToCos = require("../models/cos");
const saveAs = require("../models/file");

var multer = require("multer");
var upload = multer({ dest: "upload/" });
app.post("/paper", upload.array("file", 12), function(req, res) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  let result = [];
  req.files.forEach(async Element => {
    result.push(Element.originalname);
    fs.rename(Element.path, Element.destination + Element.originalname, err => {
      if (err) console.log(err);
    });
  });

  res.send(result);
});

app.post("/upload", (req, res) => {
  // console.log(req.body);
  let name = req.body.name;
  if (req.body.trans) {
    req.body.content = new Buffer(req.body.content, "Base64");
    saveAs(`${name}.${req.body.type}`, req.body.content);
    res.send({
      code: 1,
      data: `${name}.${req.body.type}`
    });
  } else {
    saveAs(`${name}.${req.body.type}`, req.body.content);
    res.send({
      code: 1,
      data: `${name}.${req.body.type}`
    });
  }

  if (req.body.noticy === true) {
    sendToCos();
    mailToList(name);
  }
});

app.post("/detail", async (req, res) => {
  let id = req.body.hash;
  fs.readFile(`public/${id}.md`, (err, data) => {
    if (err) {
      res.send({
        code: 0,
        info: "NOT FOUND",
        data: ""
      });
    } else {
      res.send({
        code: 1,
        info: "SUCCESS",
        data: data.toString()
      });
    }
  });
});

module.exports = app;
