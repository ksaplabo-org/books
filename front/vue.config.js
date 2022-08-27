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
          title: '�T�C���C��',
        },
        signout: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/signout.html',
          title: '�T�C���A�E�g',
        },
        top: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/top.html',
          title: '�g�b�v�y�[�W',
        },
        rentalbook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/rentalbook.html',
          title: '�ݏo�󋵓o�^',
        },
        maintebook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/maintebook.html',
          title: '�u�b�N�ꗗ',
        },
        listUser: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/listUser.html',
          title: '���[�U�[�ꗗ',
        },
        leadingBook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/leadingBook.html',
          title: '�ݏo�󋵈ꗗ',
        },
        addUser: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/addUser.html',
          title: 'AddUser',
        },        addUser: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/editUser.html',
          title: 'EditUser',
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
