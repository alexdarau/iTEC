const express = require('express');
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

var registerRoutes = require("./server/routes/registerOAuth.js");
var loginRoutes = require("./server/routes/login.js");

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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

app.use(registerRoutes);
app.use(loginRoutes);