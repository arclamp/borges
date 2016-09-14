var loaders = [
  {
    test: /node_modules\/borges\/.*\.js$/,
    loader: 'babel-loader',
    query: {
      presets: ['es2015']
    }
  },
  {
    test: /node_modules\/borges\/.*\.jade$/,
    loader: 'jade-loader'
  }
];

module.exports = function (config) {
  config.module = config.module || {};
  config.module.loaders = config.module.loaders || [];

	loaders.forEach(function (loader) {
    config.module.loaders.push(loader);
  });

  return config;
};
