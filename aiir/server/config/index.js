const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/Application", (req, res) => {
  const customers = [{ id: 1, firstName: "John", lastName: "Doe" }];

  res.json(customers);
});

app.get("http:/40.89.186.174:5000/tasks", (req, res) => {
  console.log(res);
});

app.listen(PORT, function() {
  console.log("Server is running on Port:", PORT);
});
