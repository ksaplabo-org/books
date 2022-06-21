module.exports = {
  publicPath: '/public',
  outputDir: 'dist',
  assetsDir: 'assets',
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: true,
  css: {
    modules: false,
    extract: true,
    sourceMap: true,
  },
  lintOnSave: true,
    pages: {
        signin: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/signin.html',
          title: 'Sign in',
        },
        signout: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/signout.html',
          title: 'Sign out',
        },
        menu: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/menu.html',
          title: 'Menu',
        },
        rentalbook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/rentalbook.html',
          title: 'Rental Book',
        },
        maintebook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/maintebook.html',
          title: 'Maintenance Book',
        },
        listUser: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/listUser.html',
          title: 'UserList',
        },
        addUser: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/addUser.html',
          title: 'AddList',
        },
        sorry: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/sorry.html',
          title: 'Sorry',
        },
      },
    devServer: {
      https: true,
      port: 8080,
      proxy: {
          '/api': {
              target: "http://localhost:3000",
              changeOrigin: true,
          }
      }
  }
};
