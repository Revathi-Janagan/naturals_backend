const express = require("express");
const app = express();
const connection = require("./helper/db");
const routes = require("./routes/index");

app.use(express.json());
app.use("/api",routes);

app.listen(4020, (req, res) => {
  console.log("Server is running on Port 4020");
});
