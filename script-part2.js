// Google Apps Script 代码 - 第二部分
// 接着上面的代码继续添加

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();

  const level1Sheet = sheet.getSheetByName('关卡一');
  const level2Sheet = sheet.getSheetByName('关卡二');

  const level1Data = level1Sheet.getDataRange().getValues().slice(1);
  const level2Data = level2Sheet.getDataRange().getValues().slice(1);

  const result = {
    level1: level1Data.map(row => ({
      name: row[0],
      score: row[1],
      time: row[2]
    })),
    level2: level2Data.map(row => ({
      name: row[0],
      score: row[1],
      time: row[2]
    }))
  };

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
