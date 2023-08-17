const express = require("express");
const app = express();
const connection = require("./helper/db");
const routes = require("./routes/index");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", methods: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));
app.use("/api", routes);

console.log(process.env.PORT);
const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on Port ${PORT}`);
});
