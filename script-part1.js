// Google Apps Script 代码
// 复制这段代码到 Apps Script 编辑器中

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents);

  const sheetName = data.level === 1 ? '关卡一' : '关卡二';
  const targetSheet = sheet.getSheetByName(sheetName);

  // 检查是否已提交
  const existingData = targetSheet.getDataRange().getValues();
  for (let i = 1; i < existingData.length; i++) {
    if (existingData[i][0] === data.name) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: '已提交过成绩'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  // 添加新成绩
  targetSheet.appendRow([
    data.name,
    data.score,
    new Date().toLocaleString('zh-CN')
  ]);

  return ContentService.createTextOutput(JSON.stringify({
    success: true
  })).setMimeType(ContentService.MimeType.JSON);
}
