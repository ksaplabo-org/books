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
                                <!--
                                   ★問題1 Start★
                                    ユーザーID入力欄左側の文言を設計書通りに設定する。
                                -->
                                <!-- ユーザーID -->
                                <div class="form-group">
                                    <label></label>
                                    <input type="text" id="userId" class="form-control" placeholder="1桁以上16桁以下で入力してください"
                                        v-model="userId" autocomplete="off" pattern="^[0-9A-Za-z]{1,16}$" required>
                                </div>
                                <!-- ユーザーID検索 -->
                                <!--★問題1 End★-->
                                <!--
                                    ★問題2 Start★
                                    ユーザー名入力欄を追加する。

                                    ユーザーID表示箇所を参考にして作成する。
                                    (minlength,Patternは不要)
                                -->
                                <!-- ユーザー名 -->




                                <!--★問題2 End★-->
                                <!-- パスワード -->
                                <div class="form-group">
                                    <label>パスワード:</label>
                                    <input type="password" id="inputPassword" class="form-control" placeholder="8桁以上16桁以下で入力してください"
                                        v-model="password" pattern="^[0-9A-Za-z]{8,16}$" required>
                                </div>
                                <!-- 性別 -->
                                <div class="form-group">
                                    <label>性別:</label>
                                    <!--
                                    ★問題3 Start★
                                        各ラジオボタンに対応する文言を設定する。
                                    -->
                                    <br>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="womanRadio" name="genderRadio" class="custom-control-input" v-model="gender" v-bind:value="woman" checked>
                                        <label class="custom-control-label" for="womanRadio"></label>
                                    </div>

                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="manRadio" name="genderRadio" class="custom-control-input" v-model="gender" v-bind:value="man">
                                        <label class="custom-control-label" for="manRadio"></label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="unknownRadio" name="genderRadio" class="custom-control-input" v-model="gender" v-bind:value="unknown">
                                        <label class="custom-control-label" for="unknownRadio"></label>
                                    </div>
                                    <!--★問題3 End★-->
                                </div>
                                <!-- 権限 -->
                                <div class="form-group">
                                    <label>権限:</label>
                                    <br>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="generalRadio" name="authRadio" class="custom-control-input" v-model="auth" v-bind:value="general" checked>
                                        <label class="custom-control-label" for="generalRadio">一般</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input type="radio" id="adminRadio" name="authRadio" class="custom-control-input" v-model="auth" v-bind:value="admin">
                                        <label class="custom-control-label" for="adminRadio">社員</label>
                                    </div>
                                </div>
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

        <!-- ローディングマスク -->
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
            // 各項目初期値
            userId: '',
            userName: '',
            password: '',
            gender: UserConst.Gender.woman,
            auth: UserConst.Auth.general,
            // 各ラジオボタン設定値
            man: UserConst.Gender.man,
            woman: UserConst.Gender.woman,
            unknown: UserConst.Gender.unknown,
            general: UserConst.Auth.general,
            admin: UserConst.Auth.admin
        };
    },
    async mounted() {
        // サインイン確認
        try {
            if (UserUtil.isSignIn()) {
                this.msg = this.flashMsg;
                this.errMsg = this.flashErrMsg;
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
                // 入力チェック
                /**
                 * ★問題4 Start★
                 * ユーザーID必須入力チェックを行う。
                 * エラーがある場合は以下のエラーメッセージを表示する。
                 * エラーメッセージ：「ユーザーIDを入力してください」
                 */




                /*★問題4 End★*/
                /**
                 * ★問題5 Start★
                 * ユーザーID桁数チェックを行う。
                 * 桁数：1～16文字
                 * エラーがある場合は以下のエラーメッセージを表示する。
                 * エラーメッセージ：「ユーザーIDは1桁以上16桁以下で入力してください」
                 */




                /*★問題5 End★*/
                if (!this.userId.match("^[0-9A-Za-z]{1,16}$")) {
                    this.errMsg = "ユーザーIDは半角英数で入力してください";
                    return;
                }
                /**
                 * ★問題6 Start★
                 * ユーザー名必須入力チェックを行う。
                 * エラーがある場合は以下のエラーメッセージを表示する。
                 * エラーメッセージ：「ユーザー名を入力してください」
                 */




                /*★問題6 End★*/
                /**
                 * ★問題7 Start★
                 * ユーザー名桁数チェックを行う。
                 * 桁数：1～100文字
                 * エラーがある場合は以下のエラーメッセージを表示する。
                 * エラーメッセージ：「ユーザー名は100桁以下で入力してください」
                 */




                /*★問題7 End★*/
                /**
                 * ★問題8 Start★
                 * パスワード必須入力チェックを行う。
                 * エラーがある場合は以下のエラーメッセージを表示する。
                 * エラーメッセージ：「パスワードを入力してください」
                 */




                /*★問題8 End★*/
                /**
                 * ★問題9 Start★
                 * パスワード桁数チェックを行う。
                 * 桁数：8～16文字
                 * エラーがある場合は以下のエラーメッセージを表示する。
                 * エラーメッセージ：「パスワードは8桁以上16桁以下で入力してください」
                 */




                /*★問題9 End★*/
                if (!this.password.match("^[0-9A-Za-z]{8,16}$")) {
                    this.errMsg = "パスワードは半角英数で入力してください";
                    return;
                }
                /**
                 * ★問題10 Start★
                 * データ登録時の重複チェックを正常に行えるようにする。
                 * ※どこかが違います。
                 */
                // 重複チェック
                const response = await AjaxUtil.getUserFindById(this.userName);
                const userInfo = JSON.parse(response.data.Items);
                if (userInfo) {
                    this.errMsg = '入力されたユーザーは既に登録されています';
                    return;
                }
                /*★問題10 End★*/

                // 引数格納
                const model = {
                    userId: this.userId,
                    userName: this.userName,
                    password: this.password,
                    gender: this.gender,
                    auth: this.auth
                }

                // 登録
                await AjaxUtil.postUser(model);

                // 一覧画面に遷移する
                this.$router.push({ name: 'listUser', params: {flashMsg: '登録に成功しました'}});
            } catch (e) {
                this.msg = '';
                this.errMsg = 'ユーザー登録に失敗しました';
                console.log(e)
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>
