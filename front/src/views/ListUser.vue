<template>
    <div class="listuser">
        <NaviMenu/>

        <div id="wrapper">
            <Menu/>

            <div id="content-wrapper" class="bg-light">
                <div class="container-fluid">

                    <!-- Breadcrumbs-->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'top'}">トップページ</router-link>
                        </li>
                        <li class="breadcrumb-item active">ユーザー一覧</li>
                    </ol>
    
                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <!-- ユーザーID検索 -->
                    <div class="continer" style="font-size:10pt">
                        <div class="form-group m-2">
                            <div class="px-2">ユーザーIDを検索</div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <input type="text" id="searchWord" class="form-control" v-model="searchWord" placeholder="入力してください" required>
                                </div>
                                <button class="btn-primary btn-sm" v-on:click="searchUser()" >検索</button>
                            </div>
                        </div>
                    </div>

                    <br>

                    <!-- User List -->
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
            <Footer/>
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
                {key: 'user_id', label: 'ユーザーID'},
                {key: 'user_name', label: '名前'},
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

        // ユーザーIDあいまい検索
        searchUser : function () {
            this.isLoading = true;

            this.msg = '';
            this.errMsg = '';
            this.items = [];

            if (!this.searchWord) {
                this.msg = '';
                this.errMsg = '';
                this.isLoading = false;
                // 画面更新
                this.updateView();
                return;
            }

            AjaxUtil.getUser(this.searchWord)
                .then((response) => {
                    this.items = JSON.parse(response.data.Items);

                }).catch((error) => {
                    this.msg = '';
                    this.errMsg = 'ユーザー検索に失敗しました 管理者にお問い合わせください';
                    console.log(error);

                }).then(() => {
                    this.isLoading = false;
                });
        } ,
        
        // edit user
        userEdit: async function(data) { 
            this.isLoading = true;

            this.$router.push({ name: 'editUser', params: {editUserId: data.user_id}});
        }
    }
}
</script>
