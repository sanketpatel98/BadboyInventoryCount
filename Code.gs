var sheetName = 'Sheet1'; // Replace with the name of your sheet

function doGet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  var jsonData = [];

  var headers = data[0]; // Get the headers from the first row

  for (var i = 1; i < data.length; i++) { // Start from row 2 to skip header
    var row = data[i];
    var rowData = {
      "ProdCode": row[0],
      "Description": row[1],
      "Class": row[2],
      "Vendor": row[3],
      "quantity": row[4] // Use "quantity" as key for "Area A"
    };

    jsonData.push(rowData);
  }

  var response = ContentService.createTextOutput(JSON.stringify(jsonData));
  response.setMimeType(ContentService.MimeType.JSON);
  return response;
}


function doPost(e) {
  var requestData = JSON.parse(e.postData.contents);

  // Write the new data
  for (var i = 0; i < requestData.length; i++) {
    var data = requestData[i];
    updateSheet(
      i + 1, // Start from the first row (excluding headers)
      data.ProdCode,
      data.Description,
      data.Class,
      data.Vendor,
      data.quantity, // Using "quantity" key instead of "Area A"
      // You can leave other area values empty here
    );
  }

  return ContentService.createTextOutput('Data updated successfully.');
}






function clearSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  sheet.clearContents();
}

var sheetName = 'Sheet1'; // Replace with the name of your sheet
function updateSheet(rowNumber, prodCode, description, classValue, vendor, areaA, areaB, areaC, areaD, areaE, areaF, areaG, areaH, areaI) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  var startRow = 1; // Start from the first row (headers are in this row)
  var startColumn = 1; // Start from the first column (column A)

  var rowData = [prodCode, description, classValue, vendor, areaA, areaB, areaC, areaD, areaE, areaF, areaG, areaH, areaI];
  sheet.getRange(startRow + rowNumber, startColumn, 1, rowData.length).setValues([rowData]);
}






