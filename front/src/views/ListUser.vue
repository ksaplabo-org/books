<template>
    <div class="maintebook">
        <NaviMenu/>

        <div id="wrapper">
            <Menu/>

            <div id="content-wrapper" class="bg-light">
                <div class="container-fluid">

                    <!-- Breadcrumbs-->
                    <ol id="breadcrumb" class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'top'}">トップページ</router-link>
                        </li>
                        <li id="breadcrumbUserList" class="breadcrumb-item active">ユーザー一覧</li>
                    </ol>
    
                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <div>
                        <router-link tag="a" :to="{ name: 'addUser'}">
                            <button type="button" class="btn btn-outline-primary">新規登録</button>
                        </router-link> 
                    </div>

                    <br>

                    <!-- User List -->
                    <div class="col-lg-6 mb-4">
                        <!-- Approach -->
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                お知らせ
                            </div>
                            <div class="card-body">
                                <form @submit.stop.prevent="updateView">
                                    <b-table  striped responsive hover :items="items" :fields="fields">
                                        <!-- button cell define -->
                                        <template #cell(controls)="data">
                                            <b-button-group>
                                                <b-button variant="outline-primary"  v-on:click="userEdit(data.item)">
                                                    編集
                                                </b-button>
                                            </b-button-group>
                                        </template>
                                    </b-table>
                                </form>
                            </div>
                        </div>
                    </div>
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
    name : 'ListUser' ,
    props: ['flashMsg', 'flashErrMsg'],    
    components: { NaviMenu, Menu, Footer, Loading } ,
    data() {
        return {
            msg: '',
            errMsg: '',
            isLoading: false,
            fields: [
                {key: 'userId', label: 'ユーザーID'},
                {key: 'userName', label: '名前'},
                {key: 'controls', label: ''}
            ],
            items: [],
        };
    },
    async mounted() {
        const self = this;
        try {
            if (UserUtil.isSignIn()) {
                this.msg = '';
                // 画面更新
                await this.updateView();
               
            } else {
               this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
            };
            
        } catch(e) {
            self.errMsg = e.message;
        }
    },
    methods: {
        updateView: async function() {
            const ol = document.getElementById("breadcrumb");
            const li = document.getElementById("breadcrumbUserList");
            ol.removeChild(li);
            try {
                const response = await AjaxUtil.getAllUser();
                this.items = response.data;
            } catch (error) {
                this.msg = '';
                this.errMsg = 'ユーザー取得処理に失敗しました';
                console.log(error);
                this.isLoading = false;
                throw error;
            }finally {
                this.isLoading = false;
            }
        },
        // edit user  
        userEdit: async function(data) { 
            this.isLoading = true;
            this.$router.push({ name: 'editUser', params: {sendData:data,firstFlg:"1"}});
        }
    }
}
</script> 
