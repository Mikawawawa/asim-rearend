const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const config = require("./config.json");

// const apiRouter = require("./route/api");
const newsRouter = require("./route/news");
const mailRouter = require("./route/mail");
const utilRouter = require("./route/extra");
const userRouter = require("./route/user");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
    limit: "50mb"
  })
);
app.use(cookieParser());

app.use(express.static(config.static));

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //项目上线后改成页面的地址
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.use("/news", newsRouter);
app.use("/mail", mailRouter);
app.use("/util", utilRouter);
app.use("/user", userRouter);

app.use(function(req, resFile, next) {
  createError(404);
  next();
});

// error handler
app.use(function(err, req, resFile, next) {
  // set locals, only providing error in development
  resFile.locals.message = err.message;
  resFile.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  let status = err.message == "Not Found" ? 404 : 500;
  if (err) console.log(err);
  resFile.status(status);
  resFile.send({
    code: status,
    info: err.message
  });
});

app.listen(config.port);
