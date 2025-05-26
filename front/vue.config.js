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
          title: 'サインイン',
        },
        signout: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/signout.html',
          title: 'サインアウト',
        },
        top: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/top.html',
          title: 'トップページ',
        },
        rentalbook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/book/rental.html',
          title: '貸出状況登録',
        },
        maintebook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/book/mainte.html',
          title: '書籍管理',
        },
        listbook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/book/list.html',
          title: '書籍一覧',
        },
        listUser: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/user/list.html',
          title: 'ユーザー一覧',
        },
        leadingBook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/book/leading.html',
          title: '貸出状況一覧',
        },
        addUser: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/user/add.html',
          title: 'ユーザー追加',
        },
        editUser: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/user/edit.html',
          title: 'ユーザー管理',
        },
        student: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/student.html',
          title: '学生課題',
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
