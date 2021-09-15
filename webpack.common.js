module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".json"],
  },
};
