const path = require("path");
const GasPlugin = require("gas-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devtool: false,

  output: {
    path: path.join(__dirname, "build"),
    filename: "index.js"
  },

  resolve: {
    modules: [path.resolve("./src"), "node_modules"],
    extensions: [".ts", ".js"],
    fallback: {
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      util: false,
      buffer: false,
      os: false,
      assert: false,
      constants: false,
      http: false,
      https: false,
      zlib: false,
      net: false,
      tls: false,
      events: false,
      querystring: false,
      url: false,
      punycode: false,
      string_decoder: false,
      vm: false,
      child_process: false,
      cluster: false,
      dgram: false,
      dns: false,
      module: false,
      readline: false,
      repl: false,
      timers: false,
      tty: false
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader"
      }
    ]
  },

  plugins: [
    new GasPlugin({
      autoGlobalExportsFiles: ["**/*.ts"]
    })
  ]
};
