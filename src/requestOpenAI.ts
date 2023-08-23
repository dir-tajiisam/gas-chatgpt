import { SYSTEM_CONTENT, USER_CONTENT } from "index";

type ChatRequestData = {
  model: string;
  messages: { role: string; content: string }[];
  max_tokens: number;
};

type ChatResponseData = {
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
};

const endpoint = "https://api.openai.com/v1/chat/completions";

const chat = (prompt: string, maxTokens: number) => {
  const requestData: ChatRequestData = {
    model: "gpt-3.5-turbo",
    // model: 'gpt-4',
    messages: [
      {
        role: "system",
        content: SYSTEM_CONTENT
      },
      { role: "user", content: prompt }
    ],
    max_tokens: maxTokens
  };

  const res = UrlFetchApp.fetch(endpoint, {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization:
        "Bearer " +
        PropertiesService.getScriptProperties().getProperty("OPENAI_API_KEY")
    },
    payload: JSON.stringify(requestData)
  });

  // const res = await Promise.resolve({ data: { choices: [{ message: { content: prompt } }] } });
  console.log(res.getContentText());
  const { message } = (JSON.parse(res.getContentText()) as ChatResponseData)
    .choices[0];

  return message.content;
};

const prompt = (context: string) => {
  const template = USER_CONTENT;

  return template.replace("[[CONTEXT]]", context);
};

const validate = (content: string) => {
  // validate evaluations
  if (content.length === 0) {
    return { valid: false, message: "context must not be empty" };
  }

  return { valid: true, message: "" };
};

const handler = (context: string): string | null => {
  // Parse Request Body as EvaluationsType
  const { valid, message } = validate(context);
  if (!valid) {
    console.error(message);

    return null;
  }

  // call openai api
  const maxTokens = 2000;

  try {
    const text = chat(prompt(context), maxTokens);

    return text;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export default handler;
