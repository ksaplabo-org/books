<template>
    <div class="maintebook">
        <NaviMenu/>

        <div id="wrapper">
            <SideBar/>

            <div id="content-wrapper" class="bg-light">
                <div class="container-fluid">

                    <!-- Breadcrumbs-->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'menu'}">Menu</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'listUser'}">User List</router-link>
                        </li>
                        <li class="breadcrumb-item active">Add User</li>
                    </ol>
    
                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <br>

                    <form @submit.stop.prevent="create" method="post"> 
                        <div class = "row">
                            <div class="col-sm-2">
                                    <div class="float-right">ID:</div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <input type="text" id="userId" class="form-control" required="required" v-model="userId" minlength="8" maxlength="16"
                                      placeholder="8桁以上16桁以下で入力してください。" autocomplete="off">
                                </div> 
                            </div>
                        </div>
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
                        <div class = "row">
                            <div class="col-sm-2">
                                    <div class="float-right">パスワード:</div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <input type="password" id="inputPassword" class="form-control" minlength="8" maxlength="16"
                                      placeholder="8桁以上16桁以下で入力してください。" required="required" v-model="password" >
                                </div> 
                            </div>
                        </div>
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
                        <div class = "row">
                            <div class="col-sm-2">
                                    <div class="float-right">権限:</div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <select name="auth" id="auth" required>
                                        <option value="0">選択してくだい。</option>
                                        <option value="1">一般</option>
                                        <option value="2">社員 </option>
                                    </select>
                                </div> 
                            </div>
                        </div>
                        <div class = "row">
                            <div class="col-sm-2" />
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <input class="btn btn-primary btn-block" type="submit" value="Regist">
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
import SideBar from '../components/SideBar.vue';
import Footer from '../components/Footer.vue';
import Loading from '../components/Loading.vue';
export default {
    name : 'ListUser' ,
    props: ['flashMsg', 'flashErrMsg'],    
    components: { NaviMenu, SideBar, Footer, Loading } ,
    data() {
        return {
            msg: '',
            errMsg: '',
            isLoading: false,
            userId: "",
            userName: "",
            password: ""
        };
    },
    async mounted() {
        const self = this;
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
        create: async function() {
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
                    userAuth: authSelect.value
                }
                
                // 登録実行
                const response =  await AjaxUtil.postCreateUser(model);
                // 一覧画面に戻る
                this.$router.push({ name: 'listUser',});
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
