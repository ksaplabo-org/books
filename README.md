# books

メモ  

構成  
  SPA + REST API構成  

・SPAとは？  
　参考）  
　https://zenn.dev/rinda_1994/articles/e6d8e3150b312d  

・RESTAPIとは？  
　参考）  
　https://tech.012grp.co.jp/entry/rest_api_basics  

開発環境
  VSCode と Chromeのdevtoolsです  
・VSCodeとは  
　microsoft社製の無料コードエディター

構成概要  
 ・フロント／バックエンド共にJavaScriptを使用  
 ・node.jsというJavaScriptライブラリを使用  
 ・node.jsにはnpmというjsライブラリ管理ツールが同梱され、フロントエンド開発でもよく使う

frontアプリについて  
 ・Vue.js(SPAフレームワーク)   
　   JavaScriptのフレームワーク  
　   双方向データバインディング  
　   ルーティング  
　   イベントハンドリング  
　   htmlを部品化

 ・BootStrap(Bootstrap-Vue)  
　   デザイン(CSS)フレームワーク　※Jsと連動できる  
　   レスポンシブWebデザインができる  
　   Vue向けのBootstrap-Vueを使用
    
 ・Font Awesome(Free)  
     アイコンとして使用  

 ・Ajax通信（JsからのHTTP通信）について  
　   Axiosを使用（Jsのフレームワークによく標準装備されている）

backendアプリについて  
　・express.js(node.jsのWebフレームワーク)  
　・dbはmysqlで構築  
　・express.jsからのdbへはORマッパー（sequelize）を介して操作

※htmlやjavascriptの基本知識は前提  
※あと、javascript扱う上でPromiseの考え方はよく使うので把握前提  
  Promise参考)  
    https://qiita.com/cheez921/items/41b744e4e002b966391a  
    ※Promiseチェーンとなるので、見通しやすくしたものがasync await 
