const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  target: "browserslist",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].bundle.js",
    assetModuleFilename: "images/[hash][ext][query]",
  },
  optimization: {
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "vendor",
          chunks: "all",
        },
        common: {
          test: /[\\/]src[\\/]components[\\/]/,
          chunks: "all",
          minSize: 0,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/404.html",
      filename: "404.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  devtool: "source-map",
});
