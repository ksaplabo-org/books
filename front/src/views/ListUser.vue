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
                                    <!--
                                        ユーザーID検索 入力欄
                                            プレースホルダー: 入力してください
                                    -->
                                </div>
                                <button class="btn-primary btn-sm" v-on:click="updateView()" >検索</button>
                            </div>
                        </div>
                    </div>

                    <br>

                    <!-- ユーザー一覧 -->
                    <form @submit.stop.prevent="updateView">
                        <b-table  striped responsive hover :items="items" :fields="fields">
                            <template #cell(controls)="data">
                                <b-button-group>
                                    <!--
                                        編集ボタン
                                            押下時、userEdit関数を呼び出す
                                    -->
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
            msg: this.flashMsg,
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
        // 画面更新
        updateView: async function() {
            // 初期化
            this.msg = '';
            this.errMsg = '';
            this.items = [];

            // ユーザー一覧取得処理
            this.getUserList();
        },
        // ユーザー一覧取得処理
        getUserList: async function() {
            this.isLoading = true;

            /**
             * 検索値が未入力の場合の条件式を記入する
             * ※trueを書き換えること
             */
            if (true) {
                try {
                    const response = await AjaxUtil.getAllUser();
                    this.items = response.data;
                } catch (error) {
                    this.msg = '';
                    this.errMsg = 'ユーザー取得処理に失敗しました';
                    console.log(error);
                    throw error;
                } finally {
                    this.isLoading = false;
                }
                return;
            } else {
                // ユーザーIDあいまい検索
                /**
                 * ユーザーIDあいまい検索
                 *     コールするAPI
                 *          AjaxUtil
                 *              getUser
                 *      成功時
                 *          一覧の変数に、APIのレスポンスを格納する
                 *      失敗時
                 *          メッセージ表示を初期化
                 *          エラーメッセージを表示
                 *              ユーザー検索に失敗しました 管理者にお問い合わせください
                 *      最後にロードマスクを解除する
                 */
            }
        },
        // ユーザー編集
        userEdit: async function(data) { 
            this.isLoading = true;

            this.$router.push({ name: 'editUser', params: {editUserId: data.user_id}});
        }
    }
}
</script>
