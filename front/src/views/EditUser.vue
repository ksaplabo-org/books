<template>
    <div class="edituser">
        <NaviMenu/>

        <div id="wrapper">
            <Menu/>

            <div id="content-wrapper" class="bg-light">
                <div class="container-fluid">

                    <!-- パンくずリスト -->
                    <ol class="breadcrumb" id="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'top'}">トップページ</router-link>
                        </li>
                        <li class="breadcrumb-item" id="breadcrumb-u-list">
                            <router-link tag="a" :to="{ name: 'listUser'}">ユーザー一覧</router-link>
                        </li>
                        <li class="breadcrumb-item active">ユーザー管理</li>
                    </ol>

                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <br>

                    <form @submit.stop.prevent="userUpdate" method="post">
                        <div class="row">
                            <div class="col"/>
                            <div class="col-6">
                                <!--
                                   ★問題1 Start★
                                    ユーザーIDを編集できないようにする。
                                    ※inputタグの文末に何か追加する。
                                -->
                                <!-- ユーザーID -->
                                <div class="form-group">
                                    <label>ユーザーID:</label>
                                    <input type="text" id="userId" class="form-control" minlength="8" maxlength="16" placeholder="8桁以上16桁以下で入力してください。"
                                        v-model="userId" autocomplete="off" pattern="^[0-9A-Za-z]{8,16}$">
                                </div>
                                <!--★問題1 End★-->
                                <!-- ユーザー名 -->
                                <div class="form-group">
                                    <label>ユーザー名:</label>
                                    <input type="text" id="userName" class="form-control" maxlength="100" placeholder="100桁以下で入力してください。"
                                        v-model="userName" autocomplete="off" required>
                                </div>
                                <!-- パスワード -->
                                <div class="form-group">
                                    <label>パスワード:</label>
                                    <input type="password" id="inputPassword" class="form-control" minlength="8" maxlength="16" placeholder="8桁以上16桁以下で入力してください。"
                                        v-model="password" pattern="^[0-9A-Za-z]{8,16}$" required>
                                </div>

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

                                <!-- 更新・削除ボタン -->
                                <div class="row">
                                    <div class="col">
                                        <input class="btn btn-primary btn-block" type="submit" value="情報更新">
                                    </div>
                                    <div class="col">
                                        <b-button class="btn-danger btn-block" data-toggle="modal" data-target="#deleteConfirmModal">ユーザー削除</b-button>
                                    </div>
                                </div>
                            </div>
                            <div class="col"/>
                        </div>
                    </form>
                </div>
                <Footer/>
            </div>

            <!-- 削除確認モーダル -->
            <div class="modal fade" id="deleteConfirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="myModalLabel">確認</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>削除してよろしいですか？</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="userDelete()">削除</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- スクロールトップボタン -->
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
    name : 'EditUser' ,
    props: ['flashMsg', 'flashErrMsg'],
    components: { NaviMenu, Menu, Footer, Loading },
    data() {
        return {
            msg: '',
            errMsg: '',
            isLoading: false,
            // 各項目初期値
            userId: '',
            userName: '',
            password: '',
            gender: '',
            auth: '',
            // 各ラジオボタン設定値
            man: UserConst.Gender.man,
            woman: UserConst.Gender.woman,
            unknown: UserConst.Gender.unknown,
            general: UserConst.Auth.general,
            admin: UserConst.Auth.admin
        };
    },
    async mounted() {
        try {
            // ログイン確認
            if (UserUtil.isSignIn()) {
                // 画面更新
                await this.updateView();

                // メッセージ設定
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
        // 画面更新
        updateView: function() {
            this.msg = '';
            this.errMsg = '';

            // クエリストリングを取得
            const query = this.$route.query;

            // 編集対象のユーザーIDを設定する
            this.userId = query.userId ? query.userId : UserUtil.currentUserInfo().userid;

            // パンくずリストを編集
            if (!query.userId) {
                // クエリストリングがない = メニューから直接遷移
                const ol =  document.getElementById('breadcrumb');
                const li = document.getElementById('breadcrumb-u-list');
                ol.removeChild(li);
            }

            // ユーザー情報を各項目にセット
            AjaxUtil.getUserFindById(this.userId)
                .then((response) => {
                    const userInfo = JSON.parse(response.data.Items)
                    this.userName = userInfo.user_name;
                    this.password = userInfo.password;
                    this.gender = userInfo.gender;
                    this.auth = userInfo.auth;
                })
                .catch((e) => {
                    this.msg = '';
                    this.errMsg = 'ユーザー取得に失敗しました';
                    console.log(e);
                })
                .finally(() => {
                    this.isLoading = false;
                })
        },
        // ユーザー更新
        userUpdate: function() {

            // 入力チェック
            if (!this.userName) {
                this.errMsg = "ユーザー名を入力してください";
                return;
            }
            if (this.userName.length > 100) {
                this.errMsg = "ユーザー名は100桁以下で入力してください";
                return;
            }
            if (!this.password) {
                this.errMsg = "パスワードを入力してください";
                return;
            }
            if (this.password.length < 8 || this.password.length > 16) {
                this.errMsg = "パスワードは8桁以上16桁以下で入力してください";
                return;
            }
            if (!this.password.match("^[0-9A-Za-z]{8,16}$")) {
                this.errMsg = "パスワードは半角英数で入力してください";
                return;
            }
            if (!this.gender) {
                this.errMsg = "性別を選択してください";
                return;
            }
            if (!this.auth) {
                this.errMsg = "権限を選択してください";
                return;
            }

            // 引数格納
            const model = {
                userId: this.userId,
                userName: this.userName,
                password: this.password,
                gender: this.gender,
                auth: this.auth
            };

            this.isLoading = true;

            // 更新
            AjaxUtil.putUser(model)
                .then(() => {
                    this.msg = '登録に成功しました'
                })
                .catch((e) => {
                    this.msg = '';
                    this.errMsg = 'ユーザー更新に失敗しました';
                    console.log(e);
                })
                .finally(() => {
                    this.isLoading = false;
                })
        },
        // ユーザー削除
        userDelete: function() {
            this.isLoading = true;

            // 削除
            AjaxUtil.deleteUser(this.userId)
                .then(() => {
                    // ログインユーザーが削除された場合
                    if (this.userId == UserUtil.currentUserInfo().userid) {
                        // サインアウト
                        UserUtil.signOut();
                        this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください'}});
                    } else {
                        // 一覧画面に遷移する
                        this.$router.push({ name: 'listUser'});
                    }
                }).catch((e) => {
                    this.msg = '';
                    this.errMsg = 'ユーザー削除に失敗しました';
                    console.log(e);
                }).finally(() => {
                    this.isLoading = false;
                });
        }
    }
}
</script>
