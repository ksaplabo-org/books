<template>
    <div class="adduser">
        <NaviMenu/>

        <div id="wrapper">
            <Menu/>

            <div id="content-wrapper" class="bg-light">
                <div class="container-fluid">

                    <!-- パンくずリスト-->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'top'}">トップページ</router-link>
                        </li>
                        <li class="breadcrumb-item active">ユーザー追加</li>
                    </ol>

                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <br>

                    <form @submit.stop.prevent="userCreate" method="post">
                        <div class="row">
                            <div class="col"/>
                            <div class="col-6">
                                <!-- ユーザーID -->
                                <div class="form-group">
                                    <label>ユーザーID:</label>
                                    <input type="text" id="userId" class="form-control" minlength="8" maxlength="16" placeholder="8桁以上16桁以下で入力してください"
                                        v-model="userId" autocomplete="off" pattern="^[0-9A-Za-z]{8,16}$" required>
                                </div>
                                <!--
                                    ユーザー名
                                        入力形式：テキストボックス
                                        最大文字数：100
                                        プレースホルダー：100桁以下で入力してください
                                        入力：必須
                                -->

                                <!--
                                    パスワード
                                        入力形式：テキストボックス
                                        最大文字数：16
                                        最小文字数：8
                                        プレースホルダー：8桁以上16桁以下で入力してください
                                        半角英数字チェック：
                                            正規表現でチェックする。
                                            使用する正規表現：^[0-9A-Za-z]{8,16}$
                                        入力：必須
                                        その他：入力値はマスクする
                                -->
                                <!-- 性別 -->
                                <div class="form-group">
                                    <label>性別:</label>
                                    <br>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="womanRadio" name="genderRadio" class="custom-control-input" v-model="gender" v-bind:value="woman" checked>
                                        <label class="custom-control-label" for="womanRadio">女性</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="manRadio" name="genderRadio" class="custom-control-input" v-model="gender" v-bind:value="man">
                                        <label class="custom-control-label" for="manRadio">男性</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="unknownRadio" name="genderRadio" class="custom-control-input" v-model="gender" v-bind:value="unknown">
                                        <label class="custom-control-label" for="unknownRadio">非公開</label>
                                    </div>
                                </div>
                                <!--
                                    権限
                                        入力形式：ラジオボタン
                                        設定項目：
                                            一般：0
                                            職員：1
                                        初期値：一般
                                -->

                                <!-- 新規登録ボタン -->
                                <div class="row justify-content-md-center">
                                    <div class="col-lg-4">
                                        <input class="btn btn-primary btn-block" type="submit" value="新規登録">
                                    </div>
                                </div>
                            </div>
                            <div class="col"/>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
        <!-- トップにスクロール -->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

        <loading v-if="isLoading === true"/>
    </div>
</template>

<script>
import * as UserUtil from '@/utils/UserUtil';
import * as AjaxUtil from '@/utils/AjaxUtil';
import UserConst from '@/utils/const/UserConst';
// 共通
import NaviMenu from '../components/NaviMenu.vue';
import '../utils/sb-admin';
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';
import Loading from '../components/Loading.vue';
export default {
    name : 'AddUser' ,
    props: ['flashMsg', 'flashErrMsg'],    
    components: { NaviMenu, Menu, Footer, Loading } ,
    data() {
        return {
            msg: '',
            errMsg: '',
            isLoading: false,
            userId: "",
            gender: UserConst.Gender.woman,
            man: UserConst.Gender.man,
            woman: UserConst.Gender.woman,
            unknown: UserConst.Gender.unknown,
            general: UserConst.Auth.general
        };
    },
    async mounted() {
        // サインイン確認
        try {
            if (UserUtil.isSignIn()) {
                this.msg = '';               
            } else {
                this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
            };
        } catch(e) {
            this.errMsg = e.message;
        }
    },
    methods: {
        // ユーザー作成
        userCreate: async function() {
            this.isLoading = true
            try {
                // ▼入力チェック
                // ユーザーID
                if (!this.userId) {
                    this.errMsg = "ユーザーIDを入力してください";
                    return;
                }
                if (this.userId.length < 8 || this.userId.length > 16) {
                    this.errMsg = "ユーザーIDは8桁以上16桁以下で入力してください";
                    return;
                }
                if (!this.userId.match("^[0-9A-Za-z]{8,16}$")) {
                    this.errMsg = "ユーザーIDは半角英数で入力してください";
                    return;
                }
                /**
                 * パスワード
                 *     
                 */

                if (!this.gender) {
                    this.errMsg = "性別を選択してください";
                    return;
                }
                /**
                 * ユーザーID重複チェック
                 *     DBにすでに登録されているユーザーIDの場合はエラーとする。
                 *      エラーメッセージ：登録データが重複しています
                 */

                /**
                 * 登録処理
                 *     作成したユーザー情報更新処理をコールする
                 *     処理フロー：
                 *          front
                 *              AjaxUtil.js
                 *                  非同期通信(axios)でbackendと通信する
                 *            ↓↓↓
                 *          backend
                 *              index.js(APIの受け口)
                 *                  AjaxUtil.jsで指定したURLの受け口を作り、DBへの登録結果をレスポンスに格納する
                 *                  
                 */

                // 一覧画面に戻る
                this.$router.push({ name: 'listUser', params: {flashMsg: '登録に成功しました'}});
                return;
            } catch (error) {
                this.msg = "";
                this.errMsg = "ユーザー登録処理に失敗しました";
                console.log(error)
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>
