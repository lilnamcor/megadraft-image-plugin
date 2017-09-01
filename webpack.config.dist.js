/*
 * Copyright (c) 2017, Itai Reuveni <itaireuveni@gmail.com>
 *
 * License: MIT
 */

module.exports = {
  entry: [
    "babel-polyfill",
    "."
  ],
  output: {
    path: "./dist",
    publicPath: "/dist/",
    filename: "megadraft-image-plugin.js",
    library: "megadraft-image-plugin",
    libraryTarget: "umd"
  },
  externals: {
    "megadraft": "Megadraft",
    "react": "React",
    "react-dom": "ReactDOM"
  },
  devtool: "source-map",
  devServer: {
    inline: true,
    contentBase: "./"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  }
};
