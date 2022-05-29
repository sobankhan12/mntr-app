// see this documentation https://vuejs-templates.github.io/webpack/proxy.html

module.exports = {
  dev: {
    proxyTable: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
    /*
      We might or might not need this
    '**': {
      target: 'http://jsonplaceholder.typicode.com',
      filter: function (pathname, req) {
        return pathname.match('^/api') && req.method === 'GET'
      }
    }
    */
  },
}
