module.exports = {
  //plugins: ["babel-plugin-transform-import-meta"],

  presets: [
    ['@babel/preset-env', { targets: { esmodules: true } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
