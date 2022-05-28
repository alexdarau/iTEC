const express = require('express');
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

var registerRoutes = require("./server/routes/registerOAuth.js");
var loginRoutes = require("./server/routes/login.js");
var employee = require("./server/routes/employee.js");
var adminRoutes = require("./server/routes/admin")

console.log(process.env.MONGO_DB_CONN_STRING)
mongoose.connect(
    process.env.MONGO_DB_CONN_STRING,
    {
      dbName: "iTEC",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (e) => {
      console.log("db connection", !e ? "successfull" : e);
    }
  );

//CORS HEADER MIDDLEWARE
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,  X-Access-Token");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

app.use(registerRoutes);
app.use(loginRoutes);
app.use(employee);
app.use(adminRoutes);
