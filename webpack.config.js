const CopyPlugin = require("copy-webpack-plugin");

const srcPath = 'src'
const outputPath = 'dist'

module.exports = {
    entry: `./${srcPath}/zooming.ts`,
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "src/*.html", to: "dist/[name].html" },
          { from: "src/*.css", to: "dist/[name].css" },
        ],
      }),
    ],
    module: {
      // Use `ts-loader` on any file that ends in '.ts'
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    // Bundle '.ts' files as well as '.js' files.
    resolve: {
      extensions: ['.ts'],
    },
    output: {
      libraryTarget: 'umd',
      filename: `./${outputPath}/zooming.js`,
      path: `${process.cwd()}/`,
    },
    optimization: {
        minimize: false
    }
  };