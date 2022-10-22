<template>
    <div class="edituser">
        <NaviMenu/>

        <div id="wrapper">
            <Menu/>

            <div id="content-wrapper" class="bg-light">
                <div class="container-fluid">

                    <!-- Breadcrumbs-->
                    <ol class="breadcrumb" id="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'menu'}">トップページ</router-link>
                        </li>
                        <li class="breadcrumb-item" id="breadcrumb-u-list">
                            <router-link tag="a" :to="{ name: 'listUser'}">ユーザーリスト</router-link>
                        </li>
                        <li class="breadcrumb-item active">ユーザーメンテナンス</li>
                    </ol>

                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <br>

                    <form @submit.stop.prevent="userUpdate" method="post">

                        <!-- ユーザーID入力欄-->
                        <div class = "row">
                            <div class="col-sm-2">
                                <div class="float-right">ID:</div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <input type="text" id="userId" class="form-control" required="required" v-model="userId" minlength="8" maxlength="16"
                                        placeholder="8桁以上16桁以下で入力してください。" autocomplete="off" pattern="^[0-9A-Za-z]{8,16}$" readonly>
                                </div> 
                            </div>
                        </div>
                        <!-- 名前入力欄-->
                        <div class = "row">
                            <div class="col-sm-2">
                                <div class="float-right">名前:</div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <input type="text" id="userName" class="form-control" maxlength="100"
                                        placeholder="100桁以下で入力してください。" required="required" v-model="userName" autocomplete="off">
                                </div> 
                            </div>
                        </div>
                        <!-- パスワード入力欄-->
                        <div class = "row">
                            <div class="col-sm-2">
                                <div class="float-right">パスワード:</div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <input type="password" id="inputPassword" class="form-control" minlength="8" maxlength="16"
                                        placeholder="8桁以上16桁以下で入力してください。" required="required" v-model="password" pattern="^[0-9A-Za-z]{8,16}$">
                                </div> 
                            </div>
                        </div>
                        <!-- 性別入力欄-->
                        <div class = "row">
                            <div class="col-sm-2">
                                <div class="float-right">性別:</div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <select name="gender" id="gender"  required>
                                        <option value="0">選択してくだい。</option>
                                        <option value="1">女性</option>
                                        <option value="2">男性 </option>
                                        <option value="3">非公開</option>
                                    </select>
                                </div> 
                            </div>
                        </div>
                        <!-- 権限入力欄-->
                        <div class = "row">
                            <div class="col-sm-2">
                                <div class="float-right">権限:</div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <select name="auth" id="auth" required disabled>
                                        <option value="0">選択してくだい。</option>
                                        <option value="1">一般</option>
                                        <option value="2">社員 </option>
                                    </select>
                                </div> 
                            </div>
                        </div>
                        <!-- 登録ボタン-->
                        <div class = "row">
                            <div class="col-sm-2" />
                            <div class="col-sm-1">
                                <div class="form-group">
                                    <input class="btn btn-primary btn-block" type="submit" value="情報更新">
                                </div> 
                            </div>
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <b-button variant="outline-danger"  v-on:click="userDelete()">
                                        ユーザー削除
                                    </b-button>
                                </div> 
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>

        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

        <loading v-if="isLoading === true"/>

    </div>
</template>

<script>
import Vue from 'vue';
import * as UserUtil from '@/utils/UserUtil';
import * as AjaxUtil from '@/utils/AjaxUtil';
// 共通
import NaviMenu from '../components/NaviMenu.vue';
import '../utils/sb-admin';
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';
import Loading from '../components/Loading.vue';
export default {
    name : 'EditUser' ,
    props: ['flashMsg', 'flashErrMsg','editUserId'],    
    components: { NaviMenu, Menu, Footer, Loading } ,
    data() {
        return {
            msg: '',
            errMsg: '',
            isLoading: false,
            userId: this.editUserId,
            userName: '',
            password:'',
            gender:'',
            auth:'',
            firstFlg:'1'
        };
    },
    unload(){
        // 一覧画面に戻る
        this.$router.push({ name: 'listUser',});
        this.updateView();
    },
    async mounted() {
        const self = this;

        if(this.userId == null){
            this.userId = UserUtil.currentUserInfo().userid;
        }
        if(!UserUtil.isAdmin()){
            const ol =  document.getElementById('breadcrumb');
            const li = document.getElementById('breadcrumb-u-list');
            ol.removeChild(li);
        }

        if(this.firstFlg == '1'){
            try {
                const response = await AjaxUtil.getEditUser(this.userId);
                this.userName = response.data.user_name;
                this.password = response.data.password;
                this.gender = response.data.gender;
                this.auth = response.data.user_auth;
            } catch (error) {
                this.msg = '';
                this.errMsg = 'ユーザー取得処理に失敗しました';
                console.log(error);
                this.isLoading = false;
                throw error;
            }finally {
                this.isLoading = false;
            }

             let selectGender = document.getElementById('gender').options;
             for(let i = 0; i < selectGender.length; i++ ){
                 if(selectGender[i].value === this.gender){
                     selectGender[i].selected = true;
                     break;
                 }
             }
             let selectAuth = document.getElementById('auth').options;
            for(let i = 0; i < selectAuth.length; i++ ){
                if(selectAuth[i].value === this.auth){
                     selectAuth[i].selected = true;
                     break;
                }
            }
            this.firstFlg = '0';
        }

        try {
            if (UserUtil.isSignIn()) {
                this.msg = '';               
            } else {
               this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
            };
        } catch(e) {
            self.errMsg = e.message;
        }
    },
    methods: {
        userUpdate: async function() {
            this.isLoading = true
            try {
                // オプション選択値取得
                let genderSelect = document.getElementById('gender')
                let authSelect = document.getElementById('auth')

                // 入力チェック
                if(this.userId.length < 8 || this.userId.length > 16){
                    this.errMsg = "IDは8桁以上16桁以下で入力してください。";
                    return;
                }
                if(this.userName.length < 1 || this.userName.length > 100){
                    this.errMsg = "名前は100桁以下で入力してください。";
                    return;
                }
                if(this.password.length < 8 || this.password.length > 16){
                    this.errMsg = "パスワードは8桁以上16桁以下で入力してください。";
                    return;
                }
                if(genderSelect.value == "0"){
                    this.errMsg = "性別を選択してください。";
                    return;
                }
                if(authSelect.value == "0"){
                    this.errMsg = "権限を選択してください。";
                    return;
                }

                // 引数格納
                const model = {
                    userId: this.userId,
                    userName: this.userName,
                    password: this.password,
                    gender:genderSelect.value,
                    userAuth:authSelect.value
                }

                await AjaxUtil.putUser(model);

                // 一覧画面に戻る
                this.$router.push({ name: 'editUser',});
                return;
            } catch (error) {
                this.msg = "";
                this.errMsg = "ユーザー更新処理に失敗しました";
                console.log(error)
            } finally {
                this.isLoading = false;
            }
        },
        // delete user  
        userDelete: async function() { 
            this.isLoading = true;
            try {
                var result = window.confirm('削除処理を実行しますか？');
                if( result ) {
                    // 削除実行
                    await AjaxUtil.deleteUser(this.userId);
                    // 一覧画面に戻る
                    if(this.userId == UserUtil.currentUserInfo().userid){
                        await UserUtil.signOut();
                        this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
                    }else{
                        this.$router.push({ name: 'listUser',});
                    }
                 }
            } catch (error) {
                this.msg = "";
                this.errMsg = "ユーザー削除処理に失敗しました";
                console.log(error)
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script> 
