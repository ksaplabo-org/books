<template>
    <div class="editInformation">
        <NaviMenu />

        <div id="wrapper">
            <Menu />

            <div id="content-wrapper" class="bg-light">

                <div class="container-fluid">

                    <!-- パンくずリスト-->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'top' }">トップページ</router-link>
                        </li>
                        <li class="breadcrumb-item active">お知らせ管理</li>
                    </ol>

                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <!-- お知らせ一覧 -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <b-row align-v="center" align-h="between" no-gutters>
                                <div class="m-0 font-weight-bold">お知らせ一覧</div>
                                <b-button variant="primary" data-toggle="modal" data-target="#addModal">
                                    新規登録
                                </b-button>
                            </b-row>
                        </div>
                        <div class="card-body">
                            <b-table striped responsive hover :items="items" :fields="fields">
                                <!-- ボタンセル定義 -->
                                <template #cell(controls)="data">
                                    <b-button-group>
                                        <b-button variant="outline-primary"
                                            @click="clickedRow = { id: data.item.no, date: data.item.date, title: data.item.title, text: data.item.content };"
                                            data-toggle="modal" data-target="#updateModal">
                                            編集
                                        </b-button>
                                    </b-button-group>
                                    <b-button-group>
                                        <b-button variant="outline-danger"
                                            @click="clickedRow = { id: data.item.no, date: data.item.date, title: data.item.title, text: data.item.content };"
                                            data-toggle="modal" data-target="#deleteModal">
                                            削除
                                        </b-button>
                                    </b-button-group>
                                </template>
                            </b-table>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            <!-- お知らせ新規登録モーダル -->
            <div class="modal fade" id="addModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
                role="dialog" aria-labelledby="myAddModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="modal-title m-0 font-weight-bold text-primary text-secondary"
                                id="myAddModalLabel">
                                以下の内容でお知らせを登録してよろしいですか？</div>
                        </div>
                        <div class="modal-body">
                            <p class="text-danger" v-show="modalErrMsg">{{ modalErrMsg }}</p>
                            <b-row align-v="start" no-gutters>
                                <b-col cols="3">
                                    <label for="addModalTextareaTitle" class="form-label">お知らせ</label>
                                </b-col>
                                <b-col cols="9">
                                    <textarea class="form-control" id="addModalTextareaTitle" v-model="title"
                                        rows="2"></textarea>
                                </b-col>
                            </b-row>

                            <br>

                            <b-row align-v="start" no-gutters>
                                <b-col cols="3">
                                    <label for="addModalTextareaContent" class="form-label">詳細</label>
                                </b-col>
                                <b-col cols="9">
                                    <textarea class="form-control" id="addModalTextareaContent" v-model="content"
                                        rows="2"></textarea>
                                </b-col>
                            </b-row>
                            <div class="mt-4"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="addInformation()">
                                登録
                            </button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                @click="title = ''; content = ''; modalErrMsg = '';">
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- お知らせ新規登録モーダル終わり -->

            <!-- お知らせ更新モーダル -->
            <div class="modal fade" id="updateModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
                role="dialog" aria-labelledby="myUpdateModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="modal-title m-0 font-weight-bold text-primary text-secondary"
                                id="myUpdateModalLabel">
                                以下の内容でお知らせを更新してよろしいですか？</div>
                        </div>
                        <div class="modal-body">
                            <p class="text-danger" v-show="modalErrMsg">{{ modalErrMsg }}</p>
                            <b-row align-v="start" no-gutters>
                                <b-col cols="3">ID</b-col>
                                <b-col cols="9">
                                    <div class="text" v-show="clickedRow">{{ clickedRow.id }}</div>
                                </b-col>
                            </b-row>
                            <br>
                            <b-row align-v="start" no-gutters>
                                <b-col cols="3">掲載日</b-col>
                                <b-col cols="9">
                                    <div class="text" v-show="clickedRow">{{ clickedRow.date }}</div>
                                </b-col>
                            </b-row>
                            <br>
                            <b-row align-v="start" no-gutters>
                                <b-col cols="3">
                                    <label for="updateModalTextareaTitle" class="form-label">お知らせ</label>
                                </b-col>
                                <b-col cols="9">
                                    <textarea class="form-control" id="updateModalTextareaTitle" rows="2"
                                        v-model="clickedRow.title"></textarea>
                                </b-col>
                            </b-row>

                            <br>

                            <b-row align-v="start" align-h="between" no-gutters>
                                <b-col cols="3">
                                    <label for="updateModalTextareaContent" class="form-label">詳細</label>
                                </b-col>
                                <b-col cols="9">
                                    <textarea class="form-control" id="updateModalTextareaContent" rows="2"
                                        v-model="clickedRow.text"></textarea>
                                </b-col>
                            </b-row>
                            <div class="mt-4"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="updateInformation()">
                                更新
                            </button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                @click="modalErrMsg = ''">
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- お知らせ更新モーダル終わり -->

            <!-- お知らせ削除モーダル -->
            <div class="modal fade" id="deleteModal" data-backdrop="static" data-keyboard="false" tabindex="-1"
                role="dialog" aria-labelledby="myDeleteModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="modal-title m-0 font-weight-bold text-primary text-secondary"
                                id="myDeleteModalLabel">
                                以下のお知らせを削除してよろしいですか？</div>
                        </div>
                        <div class="modal-body">
                            <b-row align-v="start" no-gutters>
                                <b-col cols="3">ID</b-col>
                                <b-col cols="9">
                                    <div class="text" v-show="clickedRow">{{ clickedRow.id }}</div>
                                </b-col>
                            </b-row>
                            <br>
                            <b-row align-v="start" no-gutters>
                                <b-col cols="3">掲載日</b-col>
                                <b-col cols="9">
                                    <div class="text" v-show="clickedRow">{{ clickedRow.date }}</div>
                                </b-col>
                            </b-row>
                            <br>
                            <b-row align-v="start" no-gutters>
                                <b-col cols="3">お知らせ</b-col>
                                <b-col cols="9">
                                    <div class="text" v-show="clickedRow">{{ clickedRow.title }}</div>
                                </b-col>
                            </b-row>

                            <br>

                            <b-row align-v="start" align-h="between" no-gutters>
                                <b-col cols="3">詳細</b-col>
                                <b-col cols="9">
                                    <div class="text" v-show="clickedRow">{{ clickedRow.text }}</div>
                                </b-col>
                            </b-row>
                            <div class="mt-4"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" @click="deleteInformation()">
                                削除
                            </button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- お知らせ削除モーダル終わり -->

        </div>
        <!-- スクロールトップボタン -->
        <a class="scroll-to-top rouded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

        <!-- ローディングマスク -->
        <loading v-if="isLoading === true" />
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
    name: 'EditInformation',
    props: ['flashMsg', 'flashErrMsg'],
    components: { NaviMenu, Menu, Footer, Loading },
    data() {
        return {
            msg: '',
            errMsg: '',
            modalErrMsg: '',
            isLoading: false,

            title: '',
            content: '',
            clickedRow: {},
            fields: [
                { key: 'no', label: 'ID' },
                { key: 'date', label: '掲載日' },
                { key: 'title', label: 'お知らせ' },
                { key: 'controls', label: '' },
            ],
            items: [],
        };
    },

    async mounted() {
        try {
            if (UserUtil.isSignIn()) {
                // 画面更新
                this.updateView();
            } else {
                this.$router.push({ name: 'signin', params: { flashMsg: 'サインインしてください' } });
            };
        } catch (e) {
            this.errMsg = e.message;
        };
    },

    methods: {
        // 画面更新
        updateView: async function () {
            this.msg = '';
            this.errMsg = '';

            // お知らせ取得
            this.getAllInformation();
        },
        // お知らせ一覧取得
        getAllInformation: function () {
            this.errMsg = '';
            this.items = [];
            this.isLoading = true;

            AjaxUtil.getInformation()
                .then((response) => {
                    this.items = JSON.parse(response.data.Items);
                })
                .catch((e) => {
                    this.errMsg = 'お知らせ取得処理に失敗しました';
                    console.log(e);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        // お知らせ新規登録
        addInformation: function () {
            this.msg = '';
            this.errMsg = '';
            this.modalErrMsg = '';
            this.isLoading = true;

            try {
                // 入力チェック
                if (!this.title) {
                    this.modalErrMsg = 'お知らせを入力してください';
                    return;
                };

                if (this.title.length > 100) {
                    this.modalErrMsg = 'お知らせは100桁以下で入力してください';
                    return;
                };

                if (!this.content) {
                    this.modalErrMsg = '詳細を入力してください';
                    return;
                };

                if (this.content.length > 100) {
                    this.modalErrMsg = '詳細は100桁以下で入力してください';
                    return;
                };

                // 登録したいお知らせ情報の「お知らせ」「詳細」を格納
                const model = {
                    title: this.title,
                    content: this.content
                };

                AjaxUtil.postInformation(model)
                    .then(() => {
                        $("#addModal").modal("hide");
                        this.updateView();
                        this.msg = 'お知らせ情報の登録に成功しました';
                    })
                    .catch((e) => {
                        $("#addModal").modal("hide");
                        this.errMsg = 'お知らせ情報の登録に失敗しました';
                        console.log(e);
                    })
                    .finally(() => {
                        this.title = '';
                        this.content = '';
                    });
            } finally {
                // 処理が try から抜ける前にローディングをオフにする
                this.isLoading = false;
            };
        },
        // お知らせ更新
        updateInformation: function () {
            this.msg = '';
            this.errMsg = '';
            this.modalErrMsg = '';
            this.isLoading = true;

            try {
                // 入力チェック
                if (!this.clickedRow.title) {
                    this.modalErrMsg = 'お知らせを入力してください';
                    return;
                };

                if (this.clickedRow.title.length > 100) {
                    this.modalErrMsg = 'お知らせは100桁以下で入力してください';
                    return;
                };

                if (!this.clickedRow.text) {
                    this.modalErrMsg = '詳細を入力してください';
                    return;
                };

                if (this.clickedRow.text.length > 100) {
                    this.modalErrMsg = '詳細は100桁以下で入力してください';
                    return;
                };

                // 更新したいお知らせ情報の「掲載日」「番号」「お知らせ」「詳細」を格納
                const model = {
                    no: this.clickedRow.id,
                    date: this.clickedRow.date,
                    title: this.clickedRow.title,
                    content: this.clickedRow.text
                };

                AjaxUtil.putInformation(model)
                    .then(() => {
                        $("#updateModal").modal("hide");
                        this.updateView();
                        this.msg = 'お知らせ情報の更新に成功しました';
                    })
                    .catch((e) => {
                        $("#updateModal").modal("hide");
                        this.errMsg = 'お知らせ情報の更新に失敗しました';
                        console.log(e);
                    });
            } finally {
                this.isLoading = false;
            };
        },
        // お知らせ削除
        deleteInformation: function () {
            this.msg = '';
            this.errMsg = '';
            this.isLoading = true;

            // 削除したいお知らせ情報の主キー（「掲載日」と「番号」）を格納
            const model = {
                date: this.clickedRow.date,
                no: this.clickedRow.id
            };

            AjaxUtil.deleteInformation(model)
                .then(() => {
                    $("#deleteModal").modal("hide");
                    this.updateView();
                    this.msg = 'お知らせ情報の削除に成功しました';
                })
                .catch((e) => {
                    $("#deleteModal").modal("hide");
                    this.errMsg = 'お知らせ情報の削除に失敗しました';
                    console.log(e);
                })
                .finally(() => {
                    // 処理が try から抜ける前にローディングをオフにする
                    this.isLoading = false;
                });
        }
    }
}
</script>