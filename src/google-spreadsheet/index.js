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
  // console.log(doc.sheetCount);
  // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  // const cells = await sheet.loadCells();
  // console.log(sheet.title);
  // const rows = await sheet.getRows();
  // console.log(rows[0]);
  const sheetDetails = [];
  for (let i = 0; i < doc.sheetCount; i++) {
    const sheet = doc.sheetsByIndex[i];
    await sheet.loadCells();
    const sheetHeaders = [];
    for (let j = 0; j < sheet.columnCount; j++) {
      sheetHeaders.push(sheet.getCell(0, j).value);
    }
    const sheetDetail = {
      title: sheet.title,
      columnCount: sheet.columnCount,
      rowCount: sheet.rowCount,
      sheetHeaders,
    };
    sheetDetails.push(sheetDetail);
  }
  const excelDetails = {
    excelTitle: doc.title,
    sheetCount: doc.sheetCount,
    sheetsDetails: sheetDetails,
  };
  return excelDetails;
};

module.exports = fetchSheet;
