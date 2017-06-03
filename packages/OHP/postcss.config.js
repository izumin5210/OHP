module.exports = {
  plugins: [
    require('postcss-smart-import')({
      plugins: [
        require('stylelint'),
      ],
    }),
    require('postcss-custom-properties'),
    require('postcss-apply'),
    require('postcss-calc'),
    require('autoprefixer'),
    require('postcss-csso'),
    require('postcss-reporter'),
  ],
}
