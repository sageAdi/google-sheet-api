const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const auth = new google.auth.JWT(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const googleapis = async () => {
  return new Promise((res, rej) => {
    auth.authorize(async (err) => {
      if (err) rej(err);
      else {
        console.log("Successfully connected!!!");
        const data = await googleSheet(auth);
        const header = data[0];
        // console.log(header);
        let objectArray = [];
        for (let i = 1; i < data.length; i++) {
          let dataObject = {};
          for (let j = 0; j < data[i].length; j++) {
            dataObject[`${header[j]}`] = data[i][j];
          }
          dataObobjectArrayject.push(arrayData);
          // console.log(arrayData);
        }
        const body = data.filter((val) => val!==(header));
        console.log(body);
        // fs.writeFileSync(
        //   path.join(__dirname, "/data/sheet.json"),
        //   JSON.stringify(objectArray)
        // );
        res(objectArray);
      }
    });
  });
};

const googleSheet = async (auth) => {
  const sheetObject = google.sheets({ version: "v4", auth });

  const opt = {
    spreadsheetId: "1VbxoUPZ0j6ROvqs2G4fPiJXNlVahnu_geRLmnrYGFdA",
    range: "Sheet1",
  };

  const metaData = await sheetObject.spreadsheets.values.get(opt);
  return metaData.data.values;
};

module.exports = { googleapis };
