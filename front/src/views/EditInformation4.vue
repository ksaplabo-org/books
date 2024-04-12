<template>
    <div class="editinfo4">
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
                        <li class="breadcrumb-item active">お知らせ編集</li>
                    </ol>
                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>



                    <!-- お知らせ欄 -->
                    <div class="card shadow mb-4">
                        <form @submit.stop.prevent="editinfo">
                            <div class="card-header font-weight-bold">
                                <div class="row">
                                    <label class="col-sm-10 col-form-label">card-header</label>
                                    <!-- 新規登録 -->
                                    <div class="col-sm-2">
                                        <b-button class="float-right" variant="primary" data-toggle="modal" data-target="#imagemodaladd">
                                            button
                                        </b-button>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>

        <!-- モーダルの設定です -->
        <div class="modal fade" id="imagemodaladd" data-backdrop="static" tabindex="0" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">modal-title</div>
                    </div>
                    <div class="modal-body">
                        <form @submit.stop.prevent="editinfo4">
                            <div class="form-group">
                                <div class="row mb-3">
                                    <label for="addtitle" class="col-sm-3 col-form-label">label01:</label>
                                    <div class="col-sm-9">
                                        <textarea class="form-control" id="addtitle" v-model="clickedAddRow.text"></textarea>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="addtext" class="col-sm-3 col-form-label">label02:</label>
                                    <div class="col-sm-9">
                                        <textarea class="form-control" id="addtext" v-model="clickedAddRow.text"></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">登録</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
                    </div>
                </div>
            </div>
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
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';
import Loading from '../components/Loading.vue';
export default {
    name : 'editinfo4',
    props: ['flashMsg', 'flashErrMsg'],    
    components: { NaviMenu, Menu, Footer, Loading },
    data() {
        return {
            msg: '',
            errMsg: '',
            clickedAddRow: {},
            isLoading: false,

            fields: [
                {key: 'date', label: '掲載日'},
                {key: 'title', label: 'お知らせ'}
            ],
            items: []
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
            this.msg = "";
            this.errMsg = "";

            // お知らせ情報を取得する
            this.getAllInfomation();
        },
        // お知らせ情報を取得する
        getAllInfomation: function() {
        }
    }
}
</script>
