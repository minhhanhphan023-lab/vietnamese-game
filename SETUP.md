# Google Sheets 数据库配置指南

## 步骤1：创建Google Sheets

1. 访问 https://sheets.google.com
2. 创建新的电子表格，命名为"越南语游戏成绩"
3. 创建两个工作表：
   - 工作表1：命名为"关卡一"
   - 工作表2：命名为"关卡二"
4. 在每个工作表的第一行添加表头：
   - A1: 姓名
   - B1: 得分
   - C1: 完成时间

## 步骤2：创建Google Apps Script

1. 在电子表格中，点击"扩展程序" → "Apps Script"
2. 删除默认代码，粘贴以下代码：

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents);

  const sheetName = data.level === 1 ? '关卡一' : '关卡二';
  const targetSheet = sheet.getSheetByName(sheetName);

  // 检查学生是否已提交过成绩
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

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();

  const level1Sheet = sheet.getSheetByName('关卡一');
  const level2Sheet = sheet.getSheetByName('关卡二');

  const level1Data = level1Sheet.getDataRange().getValues().slice(1);
  const level2Data = level2Sheet.getDataRange().getValues().slice(1);

  const result = {
    level1: level1Data.map(row => ({ name: row[0], score: row[1], time: row[2] })),
    level2: level2Data.map(row => ({ name: row[0], score: row[1], time: row[2] }))
  };

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. 点击"部署" → "新建部署"
4. 类型选择"网络应用"
5. 执行身份：选择"我"
6. 访问权限：选择"任何人"
7. 点击"部署"
8. 复制生成的网址（类似：https://script.google.com/macros/s/xxxxx/exec）

## 步骤3：更新游戏代码

将复制的网址替换到游戏代码中的 `YOUR_SCRIPT_URL`

完成后推送到GitHub即可！
