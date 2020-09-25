const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#093966',
              '@font-size-base': '18px;'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};