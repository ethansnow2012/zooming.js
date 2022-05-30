module.exports = {
    entry: './zooming.ts',
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
      filename: 'zooming.js',
      path: `${process.cwd()}/`,
    },
    optimization: {
        minimize: false
    }
  };