const express = require("express");
const { google } = require("googleapis");
const keys = require("./keys.json");

const app = express();

app.get("/", async (req, res) => {
  const auth = new google.auth.JWT(keys.client_email, null, keys.private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);

  auth.authorize(async (err) => {
    if (err) console.log(err);
    else {
      console.log("Successfully connected!!!");
      const data = await googleSheet(auth);

      res.status(200).send(JSON.stringify(data));
    }
  });
});

const googleSheet = async (auth) => {
  const sheetObject = google.sheets({ version: "v4", auth });

  const opt = {
    spreadsheetId: "1ZvosuLBTXy28Tss5hpn5TBHbytjr3sUC4XFm9NXBX5c",
    range: "Sheet4",
  };

  const metaData = await sheetObject.spreadsheets.values.get(opt);
  return metaData.data.values;
};

app.listen(8001, () => console.log("Running on port 8001"));
