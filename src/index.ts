import { doPost } from "./lineApi";

export const SYSTEM_CONTENT = `
あなたはITコンサルタントです。クライアントの質問に答えてください。
ユーザーはIT技術用語について質問するので初心者でもわかるような丁寧に説明してください。
`;

export const USER_CONTENT = `
私の知りたいことは、次の単語です。
[[CONTEXT]]
メリット・デメリットや類似の技術も含めて教えてください。
`;

(global as any).doPost = doPost;
