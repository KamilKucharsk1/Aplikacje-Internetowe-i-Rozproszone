const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded());

app.post("/Application", (req, res) => {
  const numberToCheck = req.body.numberToCheck;
  console.log(numberToCheck);
  res.end();
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.post("/number", (req, res) => {});

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';
app.listen(port, host);

console.log("App is listening on " + host + ":" + port);
