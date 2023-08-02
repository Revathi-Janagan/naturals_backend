const express = require("express");
const app = express();
const connection = require("./helper/db");
const routes = require("./routes/index");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");



app.use(express.json());
app.use("/api",routes);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log(process.env.PORT);
const PORT = process.env.PORT 

app.listen(4020, (req, res) => {
  console.log(`Server is running on Port ${PORT}`);
});
