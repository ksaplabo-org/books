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
          filename: 'pages/rentalbook.html',
          title: '貸出状況登録',
        },
        maintebook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/maintebook.html',
          title: '書籍管理',
        },
        listbook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/listBook.html',
          title: '書籍一覧',
        },
        listUser: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/listUser.html',
          title: 'ユーザー一覧',
        },
        leadingBook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/leadingBook.html',
          title: '貸出状況一覧',
        },
        addUser: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/addUser.html',
          title: 'ユーザー追加',
        },
        editUser: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/editUser.html',
          title: 'ユーザー管理',
        },
        editinfo: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/editInfo.html',
          title: 'お知らせ編集1',
        },
        editinfo2: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/editInfo2.html',
          title: 'お知らせ編集2',
        },
        editinfo2: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/editInfo3.html',
          title: 'お知らせ編集3',
        },
        editinfo2: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'pages/editInfo4.html',
          title: 'お知らせ編集4',
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
