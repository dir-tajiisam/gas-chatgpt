# 環境設定

- app/version table

  | app  |     version     |
  | :--: | :-------------: |
  | node | 18.16.0(18.x.x) |

## 参考（nodenvで管理している場合）

```sh
# node
nodenv install 18.16.0
nodenv local 18.16.0
nodenv rehash
. ~/.zshrc
node -v
```

# デプロイ

## 初回のみ

- node_modulesのインストール

```sh
npm ci
```

- claspの初期設定

```sh
# login
npm run clasp:login
# ファイルができていることを確認
ls -l ~/.clasprc.json

# create
npm run clasp:create
> ? Create which script? webapp
```

## デプロイ

```sh
npm run clasp:push
> ? Manifest file has been updated. Do you want to push and overwrite? Yes
```

## その他

```sh
# list
npm run clasp:list
```

# gasの設定

## spreadsheetの設定

- https://docs.google.com/spreadsheets/u/0/ を開く
- 任意だが、「Conversations」という名前でスプレッドシートを作成する
- スプレッドシートのIDを取得する
  - https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/edit#gid=0
  - xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx がID

## プロジェクトのプロパティ

- https://script.google.com/home を開く
- 対象プロジェクトを開き、プロジェクトの設定より以下の項目を更新する

| プロパティ           | 値                            |
| -------------------- | ----------------------------- |
| CHANNEL_ACCESS_TOKEN | LineBotのChannel Access Token |
| OPENAI_API_KEY       | OpenAI API key                |
| SPREAD_SHEET_ID      | スプレッドシートのID          |

## GASにてデプロイ

- Webアプリとしてデプロイ
- 実行者は全員
- アクセス権限の付与が聞かれるので付与をする
- デプロイ後に表示されるURLをコピーしておく

## LINE Developersの設定

- https://developers.line.biz/console/ を開く
- 対象のチャンネルを開き、Messaging APIの設定より以下の項目を更新する
- Webhook送信を有効化する
- Webhook URLにGASでデプロイしたURLを設定する

# 参考

## 自己証明書エラーが出た場合

```sh
export NODE_TLS_REJECT_UNAUTHORIZED=0
```
