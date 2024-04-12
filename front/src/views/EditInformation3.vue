<template>
    <div class="editinfo3">
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
                                    <label class="col-sm-10 col-form-label">お知らせ一覧</label>
                                    <!-- 新規登録 -->
                                    <div class="col-sm-2">
                                        <b-button class="float-right" variant="primary" data-toggle="modal" data-target="#imagemodaladd">
                                            新規登録
                                        </b-button>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                            <b-table striped responsive hover :items="items" :fields="fields">
                                <!-- ボタンセル定義 -->
                                <template #cell(controls)="data">
                                    <b-button variant="outline-primary" v-on:click="clickedEditRow = {date: data.item.date, no: data.item.no, title: data.item.title, text: data.item.content};" data-toggle="modal" data-target="#imagemodaledit">
                                        編集
                                    </b-button>
                                    <b-button variant="outline-danger" v-on:click="clickedDeleteRow = {date: data.item.date, no: data.item.no, title: data.item.title, text: data.item.content};"
                                    data-toggle="modal" data-target="#imagemodaldelete">
                                        削除
                                    </b-button>
                                </template>
                            </b-table>
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
                        <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">以下の内容でお知らせを登録してよろしいですか？</div>
                    </div>
                    <div class="modal-body">
                        <form @submit.stop.prevent="editinfo3">
                            <div class="form-group">
                                <div class="row mb-3">
                                    <label for="addtitle" class="col-sm-3 col-form-label">お知らせ:</label>
                                    <div class="col-sm-9">
                                        <textarea class="form-control" id="addtitle" v-model="clickedAddRow.text"></textarea>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="addtext" class="col-sm-3 col-form-label">詳細:</label>
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
        <div class="modal fade" id="imagemodaledit" data-backdrop="static" tabindex="0" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">以下の内容でお知らせを更新してよろしいですか？</div>
                    </div>
                    <div class="modal-body">
                        <form @submit.stop.prevent="editinfo3">
                            <div class="form-group">
                                <div class="row mb-3">
                                    <label class="col-sm-3 col-form-label">ID:</label>
                                    <div class="col-sm-9">
                                    <label class="col-form-label">{{clickedEditRow.no}}</label>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-sm-3 col-form-label">掲載日:</label>
                                    <div class="col-sm-9">
                                    <label class="col-form-label">{{clickedEditRow.date}}</label>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-sm-3 col-form-label">お知らせ:</label>
                                    <div class="col-sm-9">
                                    <textarea class="form-control" id="edittitle" v-model="clickedEditRow.title"></textarea>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="col-sm-3 col-form-label">詳細:</label>
                                    <div class="col-sm-9">
                                    <textarea class="form-control" id="edittext" v-model="clickedEditRow.text"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="col"/>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">更新</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="imagemodaldelete" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">以下のお知らせを削除してよろしいですか？</div>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <div class="row mb-3">
                                <label for="no" class="col-sm-3 col-form-label">ID:</label>
                                <div class="col-sm-9">
                                    <div class="col-form-label" v-show="clickedEditRow">{{clickedDeleteRow.no}}</div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="date" class="col-sm-3 col-form-label">掲載日:</label>
                                <div class="col-sm-9">
                                    <div class="col-form-label" v-show="clickedDeleteRow">{{clickedDeleteRow.date}}</div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="title" class="col-sm-3 col-form-label">お知らせ:</label>
                                <div class="col-sm-9">
                                    <div class="col-form-label" v-show="clickedDeleteRow">{{clickedDeleteRow.title}}</div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="text" class="col-sm-3 col-form-label">詳細:</label>
                                <div class="col-sm-9">
                                    <div class="col-form-label" v-show="clickedDeleteRow">{{clickedDeleteRow.text}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger">削除</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /modal -->

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
    name : 'EditInfo3',
    props: ['flashMsg', 'flashErrMsg'],    
    components: { NaviMenu, Menu, Footer, Loading },
    data() {
        return {
            msg: '',
            errMsg: '',
            clickedAddRow: {},
            clickedEditRow: {},
            clickedDeleteRow: {},
            isLoading: false,

            fields: [
                {key: 'no', label: 'ID'},
                {key: 'date', label: '掲載日'},
                {key: 'title', label: 'お知らせ'},
                {key: 'controls', label: ''}
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
            this.isLoading = true;
            this.items = [];

            AjaxUtil.getInformation()
                .then((response) => {
                    this.items = JSON.parse(response.data.Items)
                })
                .catch((e) => {
                    this.msg = "";
                    this.errMsg = "お知らせ情報の取得に失敗しました";
                    console.log(e);
                })
                .finally(() => {
                    this.isLoading = false;
                })
        }
    }
}
</script>
