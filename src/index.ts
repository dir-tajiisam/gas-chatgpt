type PayloadObjectType = {
  replyToken: string;
  messages: { type: string; text: string }[];
};

const doPost = (e: any) => {
  let data = JSON.parse(e.postData.contents);
  data.events.map((event: any) => {
    if (event.type == "message" && event.message.type == "text") {
      let payloadObject: PayloadObjectType = {
        replyToken: event.replyToken,
        messages: [
          {
            type: "text",
            text: RequestOpenAI.handler(event.message.text) || "error"
          }
        ]
      };
      reply(payloadObject);
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
