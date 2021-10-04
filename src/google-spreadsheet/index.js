const { GoogleSpreadsheet } = require("google-spreadsheet");

const fetchSheet = async () => {
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(
    "1VbxoUPZ0j6ROvqs2G4fPiJXNlVahnu_geRLmnrYGFdA"
  );

  // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  const cells = await sheet.loadCells()
  console.log(cells);
  console.log(sheet.rowCount);
  return doc.title;
};

module.exports = fetchSheet;
