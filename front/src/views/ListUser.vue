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
                        <li class="breadcrumb-item active">User List</li>
                    </ol>
    
                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <div>
                        <router-link tag="a" :to="{ name: 'addUser'}">
                            <b-button variant="outline-secondary">
                                    <b-icon class="fas fa-user-edit"> add user</b-icon>
                            </b-button> 
                        </router-link> 

                    </div>
                    <br>

                    <!-- User List -->
                    <form @submit.stop.prevent="updateView">
                        <b-table responsive hover :items="items" :fields="fields">
                            <!-- button cell define -->
                            <template #cell(controls)="data">
                                <b-button-group>
                                    <b-button variant="outline-primary">
                                        <router-link :to="'', params: { }">
                                            <b-icon class="fas fa-fw fa-edit"></b-icon>
                                        </router-link>
                                    </b-button>
                                    <b-button variant="outline-danger" v-on:click="userDelete(data.fields)">
                                        <b-icon class="fas fa-fw fa-trash"></b-icon>
                                    </b-button>
                                </b-button-group>
                            </template>
                        </b-table>
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
            fields: [
                {key: 'userId', label: 'ID'},
                {key: 'userName', label: '名前'},
                {key: 'controls', label: ''},
            ],
            items: [
                {key: 'userId'},
                {key: 'userName'}
            ]
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
                return;
            } catch (error) {
                this.msg = '';
                this.errMsg = 'ユーザー取得処理に失敗しました';
                console.log(error);
                this.isLoading = false;
                throw error;
            }
        },
        // delete user  
        userDelete: async function(recordData) {  
            this.isLoading = true;
            console.log("あああ");
            console.log(recordData);
            this.msg = '';
            this.errMsg = '';
            this.isLoading = false;
        }
    }
}
</script> 
