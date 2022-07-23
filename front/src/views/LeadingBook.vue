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
                        <li class="breadcrumb-item active">貸出状況一覧</li>
                    </ol>
    
                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <br>

                    <!-- Book List -->
                    <form @submit.stop.prevent="updateView">
                        <b-table responsive hover :items="items" :fields="fields">
                            <template #cell(controls)="data">
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
    name : 'LeadingBook' ,
    props: ['flashMsg', 'flashErrMsg'],    
    components: { NaviMenu, SideBar, Footer, Loading } ,
    data() {
        return {
            msg: '',
            errMsg: '',
            userName: '',
            isLoading: false,
            fields: [
                {key: 'title', label: '書籍名'},
                {key: 'rentalDate', label: '貸出日'},
                {key: 'returnDate', label: '返却予定日'},
            ],
            items: []
        };
    },
    async mounted() {
        const self = this;
        try {
            if (UserUtil.isSignIn()) {
                this.msg = '';

                self.userName = UserUtil.currentUserInfo().userName;

                // 画面更新
                this.updateView();
               
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
                self.userName = UserUtil.currentUserInfo().userName;
                const response = await AjaxUtil.getLeadingAllBook(userName);

                this.items = JSON.parse(response.data.Items);
                return;
            } catch (error) {
                this.msg = '';
                this.errMsg = '貸出情報取得処理に失敗しました';
                console.log(error);
                this.isLoading = false;
                throw error;
            }
        }
    }
}
</script> 
