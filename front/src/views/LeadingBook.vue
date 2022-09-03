<template>
    <div class="maintebook">
        <NaviMenu/>

        <div id="wrapper">
            <Menu/>

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

                    <!-- Search Area -->
                    <div class="row bookSearchArea">
                        <table class="table table-sm table-height-sm table-condensed" style="font-size:10pt">
                            <tbody>
                                <tr>
                                    <td class="col-lg-6 m-2"><div class="px-2">検索条件:</div><input class="m-2" v-model="searchWord" placeholder="ユーザIDを入力" required><button v-on:click="searchBooks()" >検索</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

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
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';
import Loading from '../components/Loading.vue';
export default {
    name : 'LeadingBook' ,
    props: ['flashMsg', 'flashErrMsg'],    
    components: { NaviMenu, Menu, Footer, Loading } ,
    data() {
        return {
            msg: '',
            errMsg: '',
            userName: '',
            isLoading: false,
            fields: [
                {key: 'bookId', label: '書籍名'},
                {key: 'rentalDate', label: '貸出日'},
                {key: 'returnPlanDate', label: '返却予定日'},
            ],
            items: []
        };
    },
    methods: {
        // 書籍検索
        searchBooks : function () {

            this.isLoading = true;

            this.msg = '';
            this.errMsg = '';
            this.items = [];

            if (!this.searchWord || this.searchWord === '') {
                    this.msg = '';
                    this.errMsg = '検索条件を入力してください';
                    this.isLoading = false;
                    return;
            }

            // APIで検索
            AjaxUtil.searchLeadingBooks(this.searchWord)
            .then((response)=> {
                this.items = JSON.parse(response.data.Items);
                this.isLoading = false;
            }).catch((error) => {
                this.msg = '';
                this.errMsg = '検索に失敗しました';
                console.log(error);
                this.isLoading = false;
            });

        // updateView: async function() {

        //     try {
        //         self.userName = UserUtil.currentUserInfo().userName;
        //         const response = await AjaxUtil.getLeadingAllBook(userName);

        //         this.items = JSON.parse(response.data.Items);
        //         return;
        //     } catch (error) {
        //         this.msg = '';
        //         this.errMsg = '貸出情報取得処理に失敗しました';
        //         console.log(error);
        //         this.isLoading = false;
        //         throw error;
        //     }
        // }
            }
        }
    }


</script> 