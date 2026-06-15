// =====================================================================
//  "Is it Busy?" — Backend (Google Apps Script)
//  Team Venus · ITIH101 Innovation Hub 1
// =====================================================================
//
//  This script turns a Google Sheet into a tiny free API.
//  - When someone taps a button on the webpage, it ADDS a row here.
//  - When the webpage loads, it READS the latest row for that facility.
//

// Handles button taps coming FROM the webpage (saving a report)
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Save: timestamp | facility | status
    sheet.appendRow([new Date(), data.facility, data.status]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handles the webpage asking FOR the latest status (reading a report)
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var facility = e.parameter.facility;
  var rows = sheet.getDataRange().getValues();

  // Walk backwards from the newest row to find the latest matching facility
  for (var i = rows.length - 1; i >= 1; i--) {
    if (rows[i][1] === facility) {
      var result = {
        facility: facility,
        status: rows[i][2],
        time: new Date(rows[i][0]).toISOString()
      };
      return ContentService
        .createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  // No report found for this facility yet
  return ContentService
    .createTextOutput(JSON.stringify({ facility: facility, status: null }))
    .setMimeType(ContentService.MimeType.JSON);
}