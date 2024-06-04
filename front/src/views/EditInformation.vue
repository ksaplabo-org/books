<template>
    <div class="menu">
        <NaviMenu />

        <div id="wrapper">
            <Menu />

            <div id="content-wrapper" class="menu bg-light">
                <div class="container-fluid">

                    <!-- パンくずリスト-->
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'top' }">トップページ</router-link>
                        </li>
                        <li class="breadcrumb-item active">お知らせ管理</li>
                    </ol>

                    <br>
                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="modalErrMsg">{{ modalErrMsg }}</p>

                    <!-- お知らせ欄 -->
                    <div class="card shadow mb-4">
                        <form @submit.stop.prevent="menu">
                            <div class="card-header py-3 d-flex">
                                <div class="m-0 font-weight-bold align-self-center">お知らせ一覧</div>
                                <b-button-group class="ml-auto">
                                    <b-button variant="btn btn-primary" data-toggle="modal" data-target="#newInfoModal" v-on:click="errMsg = ''; msg = '';">
                                        新規登録
                                    </b-button>
                                </b-button-group>
                            </div>
                            <div class="card-body">
                                <b-table striped responsive hover :items="items" :fields="fields">
                                    <!-- ボタンセル定義 -->
                                    <template #cell(controls)="data">
                                        <!-- 編集ボタン -->
                                        <b-button-group>
                                            <b-button variant="outline-primary"
                                                v-on:click="clickedRow = { no: data.item.no, date: data.item.date, title: data.item.title, content: data.item.content};"
                                                data-toggle="modal" data-target="#updateInfoModal">
                                                編集
                                            </b-button>
                                        </b-button-group>
                                        <!-- 削除ボタン -->
                                        <b-button-group>
                                            <b-button variant="outline-danger"
                                                v-on:click="clickedRow = { no: data.item.no, date: data.item.date, title: data.item.title, content: data.item.content};"
                                                data-toggle="modal" data-target="#deleteInfoModal">
                                                削除
                                            </b-button>
                                        </b-button-group>
                                    </template>
                                </b-table>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>

            <!-- 新規作成モーダルの設定 -->
            <form @submit.stop.prevent="addInformation" method="post">
                <div class="modal fade" data-backdrop="static" data-keyboard="false" id="newInfoModal" tabindex="-1"
                    role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="modal-title m-0 font-weight-bold text-primary text-secondary"
                                    id="myModalLabel">
                                    <p class="m-0">以下の内容でお知らせを登録してよろしいですか？</p>
                                </div>
                            </div>
                            <div class="modal-body">
                                <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>
                                <div class="container d-flex p-0">
                                    <label for="title" class="col-3 p-0" name="title">お知らせ</label>
                                    <textarea v-model="title" id="title" class="col-9" rows="3"></textarea>
                                </div>
                                <div class="mt-3 container d-flex p-0">
                                    <label for="content" class="col-3 p-0" name="content">詳細</label>
                                    <textarea v-model="content" id="content" class="col-9" rows="3"></textarea>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <input class="btn btn-primary" type="submit" value="登録">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                    v-on:click="title = ''; content = ''; errMsg = ''; msg = '';">閉じる</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <!-- /modal -->

            <!-- お知らせ更新モーダルの設定 -->
            <form @submit.stop.prevent="updateInformation" method="put">
                <div class="modal fade" data-backdrop="static" data-keyboard="false" id="updateInfoModal" tabindex="-1"
                    role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="modal-title m-0 font-weight-bold text-primary text-secondary"
                                    id="myModalLabel">
                                    <p class="m-0">以下の内容でお知らせを更新してよろしいですか？</p>
                                </div>
                            </div>
                            <div class="modal-body">
                                <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>
                                <div class="title container d-flex p-0 mb-2">
                                    <label for="title" class="col-3 p-0" name="title">ID</label>
                                    <p class="col-9 p-0" id="updateNo">{{ clickedRow.no }}</p>
                                </div>
                                <div class="title container d-flex p-0 mb-2">
                                    <label for="title" class="col-3 p-0" name="title">掲載日</label>
                                    <p class="col-9 p-0" id="updateDate">{{ clickedRow.date }}</p>
                                </div>
                                <div class="title container d-flex p-0">
                                    <label for="title" class="col-3 p-0" name="title">お知らせ</label>
                                    <textarea v-model="clickedRow.title" id="title updateTitle" class="col-9" rows="3">{{ clickedRow.title }}</textarea>
                                </div>
                                <div class="content mt-3 container d-flex p-0">
                                    <label for="clickedRow.content" class="col-3 p-0" name="content">詳細</label>
                                    <textarea v-model="clickedRow.content" id="content updateContent" class="col-9" rows="3">{{ clickedRow.content }}</textarea>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <input class="btn btn-primary" type="submit" value="更新">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                    v-on:click="clickedRow.title = ''; clickedRow.content = ''; errMsg = ''; msg = '';">閉じる</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <!-- /modal -->

            <!-- 削除画面モーダルの設定 -->
            <div class="modal fade" data-backdrop="static" data-keyboard="false" id="deleteInfoModal" tabindex="-1"
                role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">
                                <p class="m-0">以下のお知らせを削除してよろしいですか？</p>
                            </div>
                        </div>
                        <div class="modal-body">
                            <div class="id container d-flex p-0">
                                <p class="col-3 p-0" name="id">ID</p>
                                <p id="id" class="col-9">{{ clickedRow.no }}</p>
                            </div>
                            <div class="date container d-flex p-0 mt-2">
                                <p class="col-3 p-0" name="date">掲載日</p>
                                <p id="date" class="col-9">{{ clickedRow.date }}</p>
                            </div>
                            <div class="title container d-flex p-0 mt-2">
                                <p class="col-3 p-0" name="title">お知らせ</p>
                                <p id="title" class="col-9">{{ clickedRow.title }}</p>
                            </div>
                            <div class="content container d-flex p-0 mt-2">
                                <p class="col-3 p-0" name="content">詳細</p>
                                <p id="content" class="col-9">{{ clickedRow.content }}</p>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="deleteInformation()">削除</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                v-on:click="clickedRow.title = ''; clickedRow.content = '';">閉じる</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /modal -->

        </div>

        <!-- スクロールトップボタン -->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

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
    name: 'EditInformation',
    props: ['flashMsg', 'flashErrMsg'],
    components: { NaviMenu, Menu, Footer, Loading },
    data() {
        return {
            msg: this.flashMsg,
            errMsg: '',
            modalErrMsg: '',
            isLoading: 'false',
            clickedRow: {},
            // 各項目初期値
            no: '',
            date: '',
            title: '',
            content: '',
            fields: [
                { key: 'no', label: 'ID' },
                { key: 'date', label: '掲載日' },
                { key: 'title', label: 'お知らせ' },
                { key: 'controls', label: '' }
            ],
            items: []
        };
    },
    async mounted() {
        try {
            if (UserUtil.isSignIn()) {
                this.msg = this.flashMsg;
                this.errMsg = this.flashErrMsg;
                // 画面更新
                this.updateView();
            } else {
                this.$router.push({ name: 'signin', params: { flashMsg: 'サインインしてください' } });
            };
        } catch (e) {
            this.$router.push({ name: 'signin', params: { flashMsg: 'サインインしてください' } });
        }
    },
    methods: {
        // 画面更新
        updateView: async function () {
            // お知らせ取得
            this.getInformation();
        },
        // お知らせ取得処理
        getInformation: function () {
            this.isLoading = true;
            this.items = [];

            AjaxUtil.getInformation()
                .then((response) => {
                    this.items = JSON.parse(response.data.Items);
                })
                .catch((e) => {
                    this.errMsg = '検索処理に失敗しました';
                    console.log(e);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        // 新規お知らせ登録
        addInformation: async function () {
            this.isLoading = true;

            if (!this.title) {
                this.errMsg = "お知らせを入力してください";
                return;
            }

            if (this.title.length > 100) {
                this.errMsg = "お知らせは100桁以下で入力してください";
                return;
            }

            if (!this.content) {
                this.errMsg = "詳細を入力してください";
                return;
            }

            if (this.content.length > 100) {
                this.errMsg = "詳細は100桁以下で入力してください";
                return;
            }

            const model = {
                title: this.title,
                content: this.content
            }

            // 登録
            await AjaxUtil.postInformation(model)
                .then(() => {
                    this.updateView();
                    this.msg = 'お知らせ情報の登録に成功しました';
                    this.title = '';
                    this.content = '';
                })
                .catch((e) => {
                    this.modalErrMsg = 'お知らせ情報の登録に失敗しました';
                    console.log(e);
                })
                .finally(() => {
                    $('#newInfoModal').modal('hide');
                    this.isLoading = false;
                })
        },
        // お知らせ更新
        updateInformation: async function () {
            this.isLoading = true;

            if (!this.clickedRow.title) {
                this.errMsg = "お知らせを入力してください";
                return;
            }

            if (this.clickedRow.title.length > 100) {
                this.errMsg = "お知らせは100桁以下で入力してください";
                return;
            }

            if (!this.clickedRow.content) {
                this.errMsg = "詳細を入力してください";
                return;
            }

            if (this.clickedRow.content.length > 100) {
                this.errMsg = "詳細は100桁以下で入力してください";
                return;
            }

            const model = {
                no: this.clickedRow.no,
                date: this.clickedRow.date,
                title: this.clickedRow.title,
                content: this.clickedRow.content
            }

            // 更新
            await AjaxUtil.putInformation(model)
                .then(() => {
                    this.updateView();
                    this.msg = 'お知らせ情報の更新に成功しました';
                })
                .catch((e) => {
                    this.modalErrMsg = 'お知らせの情報の更新に失敗しました';
                    console.log(e);
                })
                .finally(() => {
                    $('#updateInfoModal').modal('hide');
                    this.isLoading = false;
                })
        },
        // お知らせ削除
        deleteInformation: async function () {
            this.isLoading = true;

            const model = {
                no: this.clickedRow.no,
                date: this.clickedRow.date
            }

            // 削除
            AjaxUtil.deleteInformation(model)
                .then(() => {
                    this.updateView();
                    this.msg = 'お知らせ情報の削除に成功しました';
                })
                .catch((e) => {
                    this.msg = '';
                    this.modalErrMsg = 'お知らせ情報の削除に失敗しました';
                    console.log(e);
                })
                .finally(() => {
                    $('#deleteInfoModal').modal('hide');
                    this.isLoading = false;
                });
        },
    }
};
</script>