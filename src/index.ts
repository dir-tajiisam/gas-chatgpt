type PayloadObjectType = {
  replyToken: string;
  messages: { type: string; text: string }[];
};

const doPost = (e: any) => {
  console.log(e);
  let data = JSON.parse(e.postData.contents);
  data.events.map((event: any) => {
    if (event.type == "message" && event.message.type == "text") {
      let userId = event.source.userId;
      let response = ["", ""];
      const conversations = ConversationDao.getList(
        userId
      ) as RequestOpenAI.Message[];
      if (event.message.text === "リセット") {
        ConversationDao.clear(userId);
        response = ["error", "リセットしました。"];
      } else {
        response = RequestOpenAI.handler(event.message.text, conversations);
      }
      let payloadObject: PayloadObjectType = {
        replyToken: event.replyToken,
        messages: [
          {
            type: "text",
            text: response[1]
          }
        ]
      };
      reply(payloadObject);
      if (response[0] !== "error") {
        ConversationDao.add(userId, response[0], response[1]);
      }
    }
  });
};

const replyUrl = "https://api.line.me/v2/bot/message/reply";
const reply = (payloadObject: PayloadObjectType) => {
  UrlFetchApp.fetch(replyUrl, {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization:
        "Bearer " +
        PropertiesService.getScriptProperties().getProperty(
          "CHANNEL_ACCESS_TOKEN"
        )
    },
    payload: JSON.stringify(payloadObject)
  });
};

export { doPost };
