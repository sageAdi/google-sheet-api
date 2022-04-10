require("dotenv").config();

const express = require("express");
const fetchSheet = require("./google-spreadsheet");
const { googleapis } = require("./googleapis");

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  res.send("Welcome to Google Apis");
});

app.post("/google_spreadsheet", async (req, res) => {
  const data = await fetchSheet();
  res.status(200).send({ data });
});

app.post("/googleapis", async (req, res) => {
  const data = await googleapis();
  console.log(data);
  res.status(200).send({ data });
});

app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
