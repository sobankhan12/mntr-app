const webpack = require('webpack');
// @TODO add proxy option 2021-08-12

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [
        new webpack.DefinePlugin({
            // allow access to process.env from within the vue app
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
}
};
