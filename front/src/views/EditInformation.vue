<template>
    <div class="editinformation">
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
                        <li class="breadcrumb-item active">お知らせ管理</li>
                    </ol>

                    <!--メッセージ欄-->
                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>
                    
                    <!-- お知らせ一覧-->
                    <div class="card shadow mb-4">
                        <form @submit.stop.prevent="menu">
                            <div class="card-header d-flex justify-content-between">
                                <div class="font-weight-bold d-flex align-items-center">お知らせ一覧</div>
                                <button class="btn btn-primary" data-toggle="modal" data-target="#addInformationImageModal">
                                    新規登録
                                </button>
                            </div>
                            <div class="card-body">
                                <b-table striped responsive hover :items="items" :fields="fields">
                                    <!--ボタンセル定義-->
                                    <template #cell(controls)="data">
                                        <b-button variant="outline-primary" v-on:click="clickedRow = {no: data.item.no, date: data.item.date, title: data.item.title, content: data.item.content};"
                                            data-toggle="modal" data-target="#updateInformationImageModal">
                                             編集
                                        </b-button>
                                        <b-button variant="outline-danger" v-on:click="clickedRow = {no: data.item.no, date: data.item.date, title: data.item.title, content: data.item.content};"
                                            data-toggle="modal" data-target="#deleteInformationImageModal">
                                             削除
                                        </b-button>
                                    </template>
                                </b-table>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer/>
            </div>

            <!-- お知らせ新規登録モーダルの設定です -->
            <div class="modal fade" id="addInformationImageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static"  data-keyboard="false">
            <form @submit.stop.prevent="postInformation" method="post">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="text font-weight-bold text-primary text-secondary">以下の内容でお知らせを登録してよろしいですか</div>
                        </div>
                        <div class="modal-body">
                            <font size="2">
                                <!--エラーメッセージ-->
                                <p class="text-danger" v-show="modalerrMsg">{{ modalerrMsg }}</p>
                                <!--お知らせ新規登録項目-->
                                <div class="form-group row pr-3 pb-1">
                                    <div class="text col-3">お知らせ</div>
                                    <textarea class="form-control col-9" v-model="clickedRow.title"></textarea>
                                </div>
                                <p></p>
                                <div class="form-group row pr-3 pb-1">
                                    <div class="text col-3">詳細</div>
                                <textarea class="form-control col-9"  v-model="clickedRow.content"></textarea>
                                </div>
                                <p></p>
                            </font>
                        </div>
                        <div class="modal-footer">
                            <input class="btn btn-primary" type="submit" value="登録" v-on:click="addInformation()">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="clickedRow.title = ''; clickedRow.content = ''; modalerrMsg = '';">閉じる</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
            <!-- /modal -->

            <!-- お知らせ編集モーダルの設定です -->
            <div class="modal fade" id="updateInformationImageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static"  data-keyboard="false">
            <form @submit.stop.prevent="putInformation" method="put">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="text font-weight-bold text-primary text-secondary">以下の内容でお知らせを更新してよろしいですか</div>
                        </div>
                        <div class="modal-body">
                            <font size="2">
                                <!--エラーメッセージ-->
                                <p class="text-danger" v-show="modalerrMsg">{{ modalerrMsg }}</p>
                                <!--お知らせ更新項目-->
                                <div class="row pr-3 pb-1">
                                    <div class="text col-3">ID</div>
                                    <div>{{clickedRow.no}}</div>
                                </div>
                                <p></p>
                                <div class="row pr-3 pb-1">
                                    <div class="text col-3">掲載日</div>
                                    <div>{{clickedRow.date}}</div>
                                </div>
                                <p></p>
                                <div class="row pr-3 pb-1">
                                    <div class="text col-3">お知らせ</div>
                                    <textarea class="form-control col-9" v-model="clickedRow.title"></textarea>
                                </div>
                                <p></p>
                                <div class="row pr-3 pb-1">
                                    <div class="text col-3">詳細</div>
                                    <textarea class="form-control col-9" v-model="clickedRow.content"></textarea>
                                </div>
                                <p></p>
                            </font>
                        </div>
                        <div class="modal-footer">
                            <input class="btn btn-primary" type="submit" value="更新" v-on:click="updateInformation()">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="clickedRow.title = ''; clickedRow.content = ''; modalerrMsg = '';">閉じる</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
            <!-- /modal -->

            <!-- お知らせ削除モーダルの設定です -->
            <div class="modal fade" id="deleteInformationImageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static"  data-keyboard="false">
            <form @submit.stop.prevent="deleteInformation" method="delete">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="text font-weight-bold text-primary text-secondary">以下のお知らせを削除してよろしいですか</div>
                        </div>
                        <div class="modal-body">
                            <font size="2">
                                <!--エラーメッセージ-->
                                <p class="text-danger" v-show="modalerrMsg">{{ modalerrMsg }}</p>
                                <!--お知らせ削除項目-->
                                <div class="row pr-3 pb-1">
                                    <div class="text col-3">ID</div>
                                    <div class ="col-9">{{clickedRow.no}}</div>
                                </div>
                                <p></p>
                                <div class="row pr-3 pb-1">
                                    <div class="text col-3">掲載日</div>
                                    <div class ="col-9">{{clickedRow.date}}</div>
                                </div>
                                <p></p>
                                <div class="row pr-3 pb-1">
                                    <div class="text col-3">お知らせ</div>
                                    <div class= "text-break col-9">{{clickedRow.title}}</div>
                                </div>
                                <p></p>
                                <div class="row pr-3 pb-1">
                                    <div class="text col-3">詳細</div>
                                    <div class= "text-break col-9">{{clickedRow.content}}</div>
                                </div>
                                <p></p>
                            </font>
                        </div>
                        <div class="modal-footer">
                            <input class="btn btn-danger" type="submit" value="削除" v-on:click="deleteInformation()">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="clickedRow.title = ''; clickedRow.content = ''; modalerrMsg = '';">閉じる</button>
                        </div>
                    </div>
                </div>
            </form>    
            </div>
            <!-- /modal -->
        </div>

        <!-- スクロールトップボタン -->
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
//共通
import NaviMenu from '../components/NaviMenu.vue';
import '../utils/sb-admin';
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';
import Loading from '../components/Loading.vue';
export default {
    name : 'EditInformation' ,
    props:['flashMsg', 'flashErrMsg','flashmodalerrMsg'],
    components: {NaviMenu, Menu, Footer, Loading },
    data() {
        return {
            msg: '',
            errMsg: '',
            modalerrMsg: '',
            isLoading: false,
            clickedRow: {},
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
            if (UserUtil.isSignIn() && UserUtil.isAdmin()) {

                // 画面更新
                await this.updateView();

                // メッセージ設定
                this.msg = this.flashMsg;
                this.errMsg = this.flashErrMsg;
            } else {
                this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
            };
        } catch(e) {
            this.errMsg = e.message;
        }
    },
    methods: {
        // 画面更新
        updateView: async function() {
            this.msg = '';
            this.errMsg = '';

            // お知らせ取得
            this.getInformation();
        },
        // お知らせ取得
        getInformation: function() {
            this.isLoading = true;
            this.items = [];

            AjaxUtil.getInformation()
                .then((response) => {
                    this.items = JSON.parse(response.data.Items);
                })
                .catch((e) => {
                    this.msg = '';
                    this.errMsg = "お知らせ取得処理に失敗しました";
                    console.log(e);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        // お知らせ新規登録
        addInformation: async function() {
            this.isLoading = true;
            try {
                //　入力チェック
                if (!this.clickedRow.title) {
                    this.modalerrMsg = "お知らせを入力してください";
                    return;
                }
                if(this.clickedRow.title.length > 100) {
                    this.modalerrMsg = "お知らせは100桁以下で入力してください";
                    return;
                }
                if (!this.clickedRow.content) {
                    this.modalerrMsg = "詳細を入力してください";
                    return;
                }
                if(this.clickedRow.content.length > 100) {
                    this.modalerrMsg = "詳細は100桁以下で入力してください";
                    return;
                }
 
                // 引数格納
                const addInformationModel = {
                    title: this.clickedRow.title,
                    content: this.clickedRow.content
                }
 
                // お知らせ情報登録
                await AjaxUtil.postInformation(addInformationModel);

                // 一覧画面に遷移する
                this.updateView();
                this.msg = "お知らせ情報の登録に成功しました";
                $('#addInformationImageModal').modal('hide');
            } catch (e) {
                this.msg = '';
                this.errMsg = "お知らせ情報の登録に失敗しました";
                console.log(e)
                $('#addInformationImageModal').modal('hide');
            } finally {
                this.isLoading = false;
            }
        },
        // お知らせ更新
        updateInformation: async function() {
            this.isLoading = true;
            
            try {
                //　入力チェック
                if (!this.clickedRow.title) {
                    this.modalerrMsg = "お知らせを入力してください";
                    return;
                }
                if(this.clickedRow.title.length > 100) {
                    this.modalerrMsg = "お知らせは100桁以下で入力してください";
                    return;
                }
                if (!this.clickedRow.content) {
                    this.modalerrMsg = "詳細を入力してください";
                    return;
                }
                if(this.clickedRow.content.length > 100) {
                    this.modalerrMsg = "詳細は100桁以下で入力してください";
                    return;
                }
 
                // 引数格納
                const updateInformationModel = {
                    no: this.clickedRow.no,
                    date: this.clickedRow.date,
                    title: this.clickedRow.title,
                    content: this.clickedRow.content
                }
 
                // お知らせ情報更新
                await AjaxUtil.putInformation(updateInformationModel);

                // お知らせ管理画面に遷移する
                this.updateView();
                this.msg = "お知らせ情報の更新に成功しました";
                $('#updateInformationImageModal').modal('hide');
            } catch (e) {
                this.msg = '';
                this.errMsg = "お知らせ情報の更新に失敗しました";
                console.log(e)
                $('#updateInformationImageModal').modal('hide');
            } finally {
                this.isLoading = false;
            }
        },
        // お知らせ削除
        deleteInformation: async function() {
            this.isLoading = true;
            try {

                // 引数格納
                const deleteInformationModel = {
                    no: this.clickedRow.no,
                    date: this.clickedRow.date,
                }

                // お知らせ情報削除
                await AjaxUtil.deleteInformation(deleteInformationModel);

                // 一覧画面に遷移する
                this.updateView();
                this.msg = "お知らせ情報の削除に成功しました";
                $('#deleteInformationImageModal').modal('hide');
            } catch (e) {
                this.msg = '';
                this.errMsg = "お知らせ情報の削除に失敗しました";
                console.log(e)
                $('#deleteInformationImageModal').modal('hide');
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>