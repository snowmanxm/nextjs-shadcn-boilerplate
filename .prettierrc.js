const assetsSuffix = 'svg|png|css|scss';

module.exports = {
  singleQuote: true,
  tabWidth: 2,
  semi: true,
  printWidth: 100,
  importOrder: [
    `^(?!(@\/)|(\\.)|(\\..)[a-z@]).(?!.*\\.(${assetsSuffix})$)`,
    `^@\/(?!.*\\.(${assetsSuffix})$)`,
    `^\\\..(?!.*\\.(${assetsSuffix})$)|^\\\.$`,
    `^(?!(@\/)|(\\.)|(\\..)[a-z@]).*\\.(${assetsSuffix})$`,
    `^@\/.*\\\.(${assetsSuffix})$`,
    `\\\.(${assetsSuffix})$`,
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
