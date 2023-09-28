namespace RequestOpenAI {
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
  export type Message = {
    role: string;
    content: string;
  };

  const endpoint = "https://api.openai.com/v1/chat/completions";

  const chat = (
    prompt: string,
    conversations: Message[],
    maxTokens: number
  ) => {
    const requestData: ChatRequestData = {
      model: "gpt-3.5-turbo-16k",
      // model: "gpt-3.5-turbo",
      // model: 'gpt-4',
      messages: [
        {
          role: "system",
          content: SYSTEM_CONTENT.CONTENT
        },
        ...conversations,
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
    const template = USER_CONTENT.CONTENT;

    return template.replace("[[CONTEXT]]", context);
  };

  const validate = (content: string) => {
    // validate evaluations
    if (content.length === 0) {
      return { valid: false, message: "context must not be empty" };
    }

    return { valid: true, message: "" };
  };

  export const handler = (
    context: string,
    conversations: Message[] = []
  ): [string, string] => {
    // Parse Request Body as EvaluationsType
    const { valid, message } = validate(context);
    if (!valid) {
      console.error(message);

      return ["error", "error"];
    }

    // call openai api
    const maxTokens = 1000;

    try {
      const request = prompt(context);
      const response = chat(request, conversations, maxTokens);

      return [request, response];
    } catch (error) {
      console.error(error as Error);

      return ["error", "error"];
    }
  };
}
