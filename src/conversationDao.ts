namespace ConversationDao {
  const remember = 5;

  export const getList = (targetUId: string) => {
    //  スプレッドシートの読み込み
    const spreadsheet = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty(
        "SPREAD_SHEET_ID"
      ) as string
    );
    //  シートの選択
    const sheet = spreadsheet.getSheetByName("シート1");
    if (sheet === null) {
      return [];
    }
    //  セルの選択
    let conversations: { [key in string]: string }[] = [];
    if (sheet.getLastRow() === 0) {
      return [];
    }
    const rows = sheet
      .getRange(1, 1, sheet.getLastRow(), remember * 2 + 1)
      .getValues();
    rows.forEach((row) => {
      const userId = row[0];
      if (userId === targetUId) {
        conversations = row
          .slice(1)
          .filter(Boolean)
          .map((value, i) => {
            return {
              role: i % 2 == 0 ? "user" : "assistant",
              content: value
            };
          });
      }
    });
    return conversations;
  };

  export const clear = (targetUId: string) => {
    //  スプレッドシートの読み込み
    const spreadsheet = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty(
        "SPREAD_SHEET_ID"
      ) as string
    );
    //  シートの選択
    const sheet = spreadsheet.getSheetByName("シート1");
    if (sheet === null || sheet.getLastRow() === 0) {
      return;
    }
    //  セルの選択
    const rows = sheet
      .getRange(1, 1, sheet.getLastRow(), remember * 2 + 1)
      .getValues();
    rows.some((row, i) => {
      const id = row[0];
      if (id === targetUId) {
        sheet.getRange(i + 1, 2, 1, remember * 2 + 1).clearContent();
        return true;
      }
      return false;
    });
  };

  export const add = (targetUId: string, user: string, assistant: string) => {
    //  スプレッドシートの読み込み
    const spreadsheet = SpreadsheetApp.openById(
      PropertiesService.getScriptProperties().getProperty(
        "SPREAD_SHEET_ID"
      ) as string
    );
    //  シートの選択
    const sheet = spreadsheet.getSheetByName("シート1");
    if (sheet === null) {
      return [];
    }
    //  セルの選択
    let conversations = [];
    let targetRowNo = sheet.getLastRow() + 1;
    if (sheet.getLastRow() > 0) {
      const rows = sheet
        .getRange(1, 1, sheet.getLastRow(), remember * 2 + 1)
        .getValues();
      rows.some((row, i) => {
        const id = row[0];
        if (id === targetUId) {
          targetRowNo = i + 1;
          conversations = row.slice(1).filter(Boolean);
          conversations =
            conversations.length >= 10 ? conversations.slice(2) : conversations;
          return true;
        }
        return false;
      });
    }
    // userId
    sheet.getRange(targetRowNo, 1).setValue(targetUId);
    // conversations
    conversations.push(user, assistant);
    conversations.map((value, i) => {
      sheet.getRange(targetRowNo, i + 2).setValue(value);
    });
  };
}
