<template>
    <div class="listuser">
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
                        <li class="breadcrumb-item active">ユーザー一覧</li>
                    </ol>
    
                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <!-- ユーザーID検索 -->
                    <div class="continer" style="font-size:10pt">
                        <div class="form-group m-2">
                            <!-- 追加課題用 ST -->
                            <!--
                            <div class="px-2">検索方法</div>
                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="border border-secondary rounded bg-white">
                                        <div class="custom-control custom-radio custom-control-inline m-2">
                                            <input type="radio" id="serchModeIdName" name="serchModeRadio" class="custom-control-input" value="modeUser" v-model="serchMode" checked>
                                            <label class="custom-control-label" for="serchModeIdName">ID/名前</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline m-2">
                                            <input type="radio" id="serchModeAuth" name="serchModeRadio" class="custom-control-input" value="modeAuth" v-model="serchMode">
                                            <label class="custom-control-label" for="serchModeAuth">権限</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            -->
                            <!-- 追加課題用 ED -->

                            <div class="px-2 mt-2">ユーザーID/ユーザー名を検索</div>
                            <div class="row">
                                <div class="col-lg-3">
                                    <input type="text" id="searchWord" class="form-control border-secondary" v-model="searchWord" placeholder="入力してください" required>
                                </div>
                                <button class="btn-primary btn-sm" v-on:click="getUsers()" >検索</button>
                            </div>
                        </div>
                    </div>

                    <br>

                    <!-- ユーザー一覧 -->
                    <form @submit.stop.prevent="updateView">
                        <b-table  striped responsive hover :items="items" :fields="fields">
                            <!-- ボタンセル定義 -->
                            <template #cell(controls)="data">
                                <b-button-group>
                                    <b-button variant="outline-primary" v-on:click="onClickEditButton(data.item)">
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

        <!-- スクロールトップボタン-->
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
// 共通
import NaviMenu from '../components/NaviMenu.vue';
import '../utils/sb-admin';
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';
import Loading from '../components/Loading.vue';
export default {
    name : 'ListUser' ,
    props: ['flashMsg', 'flashErrMsg'],    
    components: { NaviMenu, Menu, Footer, Loading },
    data() {
        return {
            msg: '',
            errMsg: '',
            isLoading: false,
            fields: [
                {key: 'user_id', label: 'ユーザーID'},
                {key: 'user_name', label: 'ユーザー名'},
                {key: 'controls', label: ''}
            ],
            items: [],
            // 追加課題用 ST
            //serchMode: 'modeUser',
            // 追加課題用 ED
            searchWord: ''
        };
    },
    async mounted() {
        try {
            // サインイン確認
            if (UserUtil.isSignIn()) {
                // 画面更新
                this.updateView();

                // メッセージ設定
                this.msg = this.flashMsg;
                this.errMsg = this.flashErrMsg;
            } else {
               this.$router.push({ name: 'signin', params: { flashMsg: 'サインインしてください' }});
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

            // ユーザー情報検索処理
            this.getUsers();
        },
        // ユーザー検索処理
        getUsers: function() {
            this.isLoading = true;
            
            // 検索文字が入力されている場合
            if (this.searchWord) {
                // 部分一致検索
                AjaxUtil.getUserFindByIncludeIdOrName(this.searchWord)
                    .then((response) => {
                        this.items = JSON.parse(response.data.Items);
                    }).catch((e) => {
                        this.msg = '';
                        this.errMsg = 'ユーザー検索に失敗しました';
                        console.log(e);
                    }).finally(() => {
                        this.isLoading = false;
                    });
            // 検索文字が未入力の場合
            } else {
                // 全件検索
                AjaxUtil.getAllUser()
                    .then((response) => {
                        this.items = JSON.parse(response.data.Items);
                    })
                    .catch((e) => {
                        this.msg = '';
                        this.errMsg = 'ユーザー検索に失敗しました';
                        console.log(e);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    })
            }
        },
        // 編集ボタン押下時
        onClickEditButton: function(data) {
            // 編集画面へ遷移する
            this.$router.push({ name: 'editUser', query: { userId: data.user_id }});
        }
    }
}
</script>
