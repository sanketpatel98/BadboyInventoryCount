var sheetName = 'Sheet1'; // Replace with the name of your sheet

// function doGet(e) {
//   var location = e.parameter.location;

//   var ss = SpreadsheetApp.getActiveSpreadsheet();
//   var sheet = ss.getSheetByName(sheetName);

//   var dataRange = sheet.getDataRange();
//   var data = dataRange.getValues();

//   var jsonData = [];

//   for (var i = 0; i < data.length; i++) { // Start from row 2 to skip header
//     var row = data[i];
//     var rowData = {
//       "ProdCode": row[0],
//       "a": String(row[1]),
//       "b": String(row[2]),
//       "c": String(row[3]),
//       "d": String(row[4]),
//       "e": String(row[5]),
//       "f": String(row[6]),
//       "g": String(row[7]),
//       "h": String(row[8]),
//       "i": String(row[9]),
//       "j": String(row[10]),
//       "k": String(row[11]),
//       "l": String(row[12]),
//       "m": String(row[13]),
//       "index": i,
//     };

//     jsonData.push(rowData);
//   }

//   var response = ContentService.createTextOutput(JSON.stringify(jsonData));
//   response.setMimeType(ContentService.MimeType.JSON);
//   return response;
// }

function doGet(e) {
  // Retrieve the "location" parameter from the query string
  var location = e.parameter.location;

  // Check if the "location" parameter is provided and valid
  if (!location || !/^[a-x]$/.test(location)) {
    // Handle the case where the "location" parameter is missing or invalid
    var errorResponse = {
      error: "Location parameter is missing or invalid"
    };
    var errorJson = JSON.stringify(errorResponse);
    var errorResponseObj = ContentService.createTextOutput(errorJson);
    errorResponseObj.setMimeType(ContentService.MimeType.JSON);
    return errorResponseObj;
  }

  // Your existing code here...
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  var jsonData = [];

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var rowData = {
      "ProdCode": row[0]
    };

    // Include only the relevant data fields based on the location parameter
    var locationIndex = location.charCodeAt(0) - 'a'.charCodeAt(0);
    if (locationIndex >= 0 && locationIndex < row.length - 1) {
      rowData[location] = String(row[locationIndex + 1]);
      if (rowData[location] == '') {
        continue;
      }
    }

    rowData.index = i;

    jsonData.push(rowData);
  }

  var response = ContentService.createTextOutput(JSON.stringify(jsonData));
  response.setMimeType(ContentService.MimeType.JSON);
  return response;
}


var startColumn = 1; // Start from the first column (column A)

function doPost(e) {
  var requestData = JSON.parse(e.postData.contents);

  if (requestData.type == "updateRows") {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);

    var sheetDataMap = new Map();
    var sheetData = getAllData();
    const updatedData = [];

    for (var i = 0; i < sheetData.length; i++) {
      sheetDataMap.set(sheetData[i].ProdCode, sheetData[i]);
    }

    const scannedItems = requestData.updatedData;
    const unmatchedData = [];
    for (var i = 0; i < scannedItems.length; i++) {
      const item = scannedItems[i];
      const matchingRow = sheetDataMap.get(item.barcode);
      if (matchingRow) {
        matchingRow[item.location] = item.counter;
        updatedData.push(matchingRow);
      } else {
        if (item.barcode.endsWith('-F') || item.barcode.endsWith('-C')) {
          const barcodeWithoutSuffix = item.barcode.slice(0, -2); // Remove the '-F' suffix
          const matchingRowWithoutSuffix = sheetDataMap.get(barcodeWithoutSuffix);

          if (matchingRowWithoutSuffix) {
            matchingRowWithoutSuffix[item.location] = item.counter;
            updatedData.push(matchingRowWithoutSuffix);
          } else {
            unmatchedData.push(item);
          }
        } else {
          unmatchedData.push(item);
        }
      }
    }

    const newData = updatedData;
    for (var i = 0; i < newData.length; i++) {
      var data = cleaningData(newData[i]);

      updateSheet(
        sheet,
        data.index + 1,
        data.ProdCode,
        data.a, data.b, data.c, data.d, data.e, data.f, data.g, data.h, data.i, data.j, data.k, data.l, data.m, data.n, data.o, data.p, data.q, data.r, data.s, data.t, data.u, data.v, data.w, data.x
      );
    }

    var response = ContentService.createTextOutput(JSON.stringify(unmatchedData));
    response.setMimeType(ContentService.MimeType.JSON);
    return response;
  } else if (requestData.type == "lol") {
    return ContentService.createTextOutput('lol');
  } else {
    return ContentService.createTextOutput('nothing');
  }

}

function cleaningData(data) {
  if (data.a == 'undefined') {
    data.a = "";
  }
  if (data.b == 'undefined') {
    data.b = "";
  }
  if (data.c == 'undefined') {
    data.c = "";
  }
  if (data.d == 'undefined') {
    data.d = "";
  }
  if (data.e == 'undefined') {
    data.e = "";
  }
  if (data.f == 'undefined') {
    data.f = "";
  }
  if (data.g == 'undefined') {
    data.g = "";
  }
  if (data.h == 'undefined') {
    data.h = "";
  }
  if (data.i == 'undefined') {
    data.i = "";
  }
  if (data.j == 'undefined') {
    data.j = "";
  }
  if (data.k == 'undefined') {
    data.k = "";
  }
  if (data.l == 'undefined') {
    data.l = "";
  }
  if (data.m == 'undefined') {
    data.m = "";
  }
  if (data.n == 'undefined') {
    data.n = "";
  }
  if (data.o == 'undefined') {
    data.o = "";
  }
  if (data.p == 'undefined') {
    data.p = "";
  }
  if (data.q == 'undefined') {
    data.q = "";
  }
  if (data.r == 'undefined') {
    data.r = "";
  }
  if (data.s == 'undefined') {
    data.s = "";
  }
  if (data.t == 'undefined') {
    data.t = "";
  }
  if (data.u == 'undefined') {
    data.u = "";
  }
  if (data.v == 'undefined') {
    data.v = "";
  }
  if (data.w == 'undefined') {
    data.w = "";
  }
  if (data.x == 'undefined') {
    data.x = "";
  }

  return data;
}

function updateSheet(sheet, rowNumber, prodCode, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
  var rowData = [prodCode, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x];
  sheet.getRange(rowNumber, 1, 1, rowData.length).setValues([rowData]);
}

function getAllData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  var jsonData = [];

  for (var i = 0; i < data.length; i++) { // Start from row 2 to skip header
    var row = data[i];
    var rowData = {
      "ProdCode": row[0],
      "a": String(row[1]),
      "b": String(row[2]),
      "c": String(row[3]),
      "d": String(row[4]),
      "e": String(row[5]),
      "f": String(row[6]),
      "g": String(row[7]),
      "h": String(row[8]),
      "i": String(row[9]),
      "j": String(row[10]),
      "k": String(row[11]),
      "l": String(row[12]),
      "m": String(row[13]),
      "n": String(row[14]),
      "o": String(row[15]),
      "p": String(row[16]),
      "q": String(row[17]),
      "r": String(row[18]),
      "s": String(row[19]),
      "t": String(row[20]),
      "u": String(row[21]),
      "v": String(row[22]),
      "w": String(row[23]),
      "x": String(row[24]),
      "index": i,
    };

    jsonData.push(rowData);
  }

  return jsonData;
}
