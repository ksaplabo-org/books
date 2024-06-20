<template>
    <div class="listuser">
        <NaviMenu/>

        <div id="wrapper">
            <Menu/>

            <div id="content-wrapper" class="bg-light">
                <div class="container-fluid">

                    <!-- パンくずリスト -->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'top'}">トップページ</router-link>
                        </li>
                        <li class="breadcrumb-item active">お知らせ管理</li>
                    </ol>
                    <!-- ここまでパンくずリスト -->
    
                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <!-- お知らせ一覧 -->
                    <div class="card shadow mb-4">
                        <form @submit.stop.prevent="addInformation" method="post">
                            <div class="card-header">
                                <div class="d-flex align-items-center">    
                                    <div class="mr-auto font-weight-bold">お知らせ一覧</div>
                                    <div class="text-right">
                                        <b-button variant="primary" v-on:click="clickedRow = {id: data.item.no, title: data.item.title, text: data.item.content};"
                                        data-toggle="modal" data-target="#addInfoModal">
                                            新規登録
                                        </b-button>
                                    </div>    
                                </div>
                            </div>
                        </form>

                        <form @submit.stop.prevent="menu">
                            <div class="card-body">
                                
                                <b-table striped responsive hover :items="items" :fields="fields">
                                    <!-- ボタンセル定義 -->
                                    <template #cell(controls)="data">
                                        <b-button-group>
                                            <b-button variant="outline-primary" v-on:click="clickedRow = {id: data.item.no, date: data.item.date, title: data.item.title, text: data.item.content};"
                                            data-toggle="modal" data-target="#editInfoModal">
                                                編集
                                            </b-button>
                                        </b-button-group>
                                        <b-button-group>    
                                            <b-button variant="outline-danger" v-on:click="clickedRow = {id: data.item.no, date: data.item.date, title: data.item.title, text: data.item.content};"
                                            data-toggle="modal" data-target="#deleteInfoModal">
                                                削除
                                            </b-button>
                                        </b-button-group>
                                        <!-- ボタンセル定義ここまで -->
                                    </template>
                                </b-table>
                            </div>
                        </form>
                    </div>
                    <!-- お知らせ一覧ここまで -->
                </div>
            </div>
            <Footer/>
        </div>

        <!-- 新規登録モーダルの設定 -->
        <div class="modal fade" id="addInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel" v-show="clickedRow">以下の内容でお知らせを登録してよろしいですか？</div>
                    </div>
                    <div class="modal-body">
                        <p class="text-danger" v-show="errMsgModal">{{ errMsgModal }}</p>
                        <form @submit.stop.prevent="addInformation" method="post">
                            <div class="registration-form">
                                <div class="d-flex">
                                    <h6 class="mr-auto">お知らせ</h6>
                                    <textarea class="rounded border border-1" rows="2" cols="42" id="textInfo" v-model="textInfo" autocomplete="off"></textarea>
                                </div>
                                <br>
                                <div class="d-flex">
                                    <h6 class="mr-auto">詳細</h6>
                                    <textarea class="rounded border border-1" rows="2" cols="42" id="textContent" v-model="textContent" autocomplete="off"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <b-button variant="primary" type="submit" v-on:click="addInformation()">登録</b-button>
                        <b-button variant="secondary" id="addCloseButton" data-dismiss="modal" v-on:click="textContent = '';textInfo = '';errMsgModal = '';">閉じる</b-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /新規登録モーダルここまで -->

        <!-- 編集モーダルの設定 -->
        <div class="modal fade" id="editInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel" v-show="clickedRow">以下の内容でお知らせを更新してよろしいですか？</div>
                    </div>
                    <div class="modal-body">
                        <p class="text-danger" v-show="errMsgModal">{{ errMsgModal }}</p>
                        <form @submit.stop.prevent="updateInformation" method="post">
                            <div class="d-flex flex-row">
                                <div class="mr-auto">ID</div>
                                <div style="width: 340px" v-show="clickedRow">{{ clickedRow.id }}</div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="mr-auto">掲載日</div>
                                <div style="width: 340px" v-show="clickedRow">{{ clickedRow.date }}</div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="mr-auto">お知らせ</div>
                                <textarea class="rounded border border-1" rows="2" cols="42" id="informationTitle" v-model="clickedRow.title" autocomplete="off"></textarea>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="mr-auto">詳細</div>
                                <textarea class="rounded border border-1" rows="2" cols="42" id="informationContent" v-model="clickedRow.text" autocomplete="off"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <b-button variant="primary" v-on:click="updateInformation()">更新</b-button>
                        <b-button variant="secondary" id="updateCloseButton" data-dismiss="modal" v-on:click="errMsgModal = '';">閉じる</b-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /編集モーダルここまで -->

        <!-- 削除モーダルの設定 -->
        <div class="modal fade" id="deleteInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel" v-show="clickedRow">以下のお知らせを削除してよろしいですか？</div>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex flex-row">
                            <div class="mr-auto">ID</div>
                            <div style="width: 340px" v-show="clickedRow">{{ clickedRow.id }}</div>
                        </div>
                        <br>
                        <div class="d-flex">
                            <div class="mr-auto">掲載日</div>
                            <div style="width: 340px" v-show="clickedRow">{{ clickedRow.date }}</div>
                        </div>
                        <br>
                        <div class="d-flex">
                            <div class="mr-auto">お知らせ</div>
                            <div style="width: 340px" v-show="clickedRow">{{ clickedRow.title }}</div>
                        </div>
                        <br>
                        <div class="d-flex">
                            <div class="mr-auto">詳細</div>
                            <div style="width: 340px" v-show="clickedRow">{{ clickedRow.text }}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <b-button variant="danger" v-on:click="deleteInformation()">削除</b-button>
                        <b-button variant="secondary" id="deleteCloseButton" data-dismiss="modal" v-on:click="errMsgModal = '';">閉じる</b-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /削除モーダルここまで -->

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
// 共通
import NaviMenu from '../components/NaviMenu.vue';
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';
import Loading from '../components/Loading.vue';
import { deleteInformation } from '../utils/AjaxUtil';

export default {
    name: 'EditInformation',
    props: ['flashMsg','flashErrMsg'],
    components: { NaviMenu, Menu, Footer, Loading},
    data() {
        return {
        isLoading: false,
        msg: this.flashMsg,
        errMsg: '',
        errMsgModal: '',
        clickedRow: {},
        fields: [
            {key: 'no', label: 'ID'},
            {key: 'date', label: '掲載日'},
            {key: 'title', label: 'お知らせ'},
            {key: 'controls', label: ''}
        ],
        items: [],
        // 各設定の初期化
        no : 0,
        date : '',
        textInfo: '',
        textContent: ''
        };
    },
    async mounted() {
        try {
        if (UserUtil.isSignIn() && UserUtil.isAdmin()) {
            console.log('ok');
            // 画面更新
            this.updateView();
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
        this.getAllInformation();
        },
        // お知らせ取得処理
        getAllInformation: function() {
        this.isLoading = true;
        this.items = [];

        AjaxUtil.getInformation()
            .then((response) => {
            this.items = JSON.parse(response.data.Items);
            this.isLoading = false;
            })
            .catch((e) => {
            this.msg = '';
            this.errMsg = 'お知らせ取得処理に失敗しました';
            console.log(e);
            })
            .finally(() => {
            this.isLoading = false;
            });
        },
        // お知らせ新規登録
        addInformation: async function(){
            
            // メッセージの初期化
            this.errMsg = '';
            this.msg = '';
            
            // 入力チェック処理
            if(!this.textInfo){
                this.errMsgModal = 'お知らせを入力してください';
                return;
            }
            
            if(this.textInfo.length > 100){
                this.errMsgModal = 'お知らせは100桁以下で入力してください';
                return;
            }
            
            if(!this.textContent){
                this.errMsgModal = '詳細を入力してください'
                return;
            }
            
            if(this.textContent.length > 100){
                this.errMsgModal = '詳細は100桁以下で入力してください';
                return;
            } 
            
            const model = {
                title : this.textInfo,
                content : this.textContent
            }
            
            // ローディング設定
            this.isLoading = true;
            
            // 登録処理
            AjaxUtil.postInformation(model)
            .then(() => {
                this.updateView();
                this.msg = 'お知らせ情報の登録に成功しました';
                this.errMsg = '';
                $('#addInfoModal').modal('hide');
                this.textInfo = '';
                this.textContent = '';
                this.errMsgModal = '';
            })
            .catch((e) => {
                this.msg = '';
                this.errMsg = 'お知らせ情報の登録に失敗しました';
                $('#addInfoModal').modal('hide');
                this.textInfo = '';
                this.textContent = '';
                this.errMsgModal = '';
                console.log(e);
            })
            .finally(() => {
                this.isLoading = false;
            }
        )
        },
        // お知らせ更新
        updateInformation: async function(){
            
            // メッセージの初期化
            this.msg = '';
            this.errMsg = '';
            
            // 入力チェック
            if(!this.clickedRow.title){
                this.errMsgModal = 'お知らせを入力してください';
                return;
            }

            if(this.clickedRow.title.length > 100){
                this.errMsgModal = 'お知らせは100桁以下で入力してください';
                return;
            }
            
            if(!this.clickedRow.text){
                this.errMsgModal = '詳細を入力してください';
                return;
            }
            
            if(this.clickedRow.text.length > 100){
                this.errMsgModal = '詳細は100桁以下で入力してください';
                return;
            }

            const model = {
                no: this.clickedRow.id,
                date: this.clickedRow.date,
                title : this.clickedRow.title,
                content : this.clickedRow.text
            }

            // ローディング設定
            this.isLoading = true;

            // 更新処理
            AjaxUtil.putInformation(model)
            .then(() => {
                    this.updateView();
                    this.msg = 'お知らせ情報の更新に成功しました';
                    this.errMsg = '';
                    $('#editInfoModal').modal('hide');
                    this.clickedRow.title = '';
                    this.clickedRow.text = '';
                    this.errMsgModal = '';
                })
                .catch((e) => {
                    this.msg = '';
                    this.errMsg = 'お知らせ情報の更新に失敗しました';
                    $('#editInfoModal').modal('hide');
                    this.clickedRow.title = '';
                    this.clickedRow.text = '';
                    this.errMsgModal = '';
                    console.log(e);
                })
                .finally(() => {
                    this.isLoading = false;
                }
            )
        },
        // お知らせ削除
        deleteInformation: async function(){

            // メッセージの初期化
            this.msg = '';
            this.errMsg = '';

            // ローディング設定
            this.isLoading = true;

            const model = {
                no: this.clickedRow.id,
                date: this.clickedRow.date
            }

            // 削除処理
            AjaxUtil.deleteInformation(model)
            .then(() => {
                    this.updateView();
                    this.msg = 'お知らせ情報の削除に成功しました';
                    this.errMsg = '';
                    $('#deleteInfoModal').modal('hide');
                })
                .catch((e) => {
                    this.updateView();
                    this.msg = '';
                    this.errMsg = 'お知らせ情報の削除に失敗しました';
                    $('#deleteInfoModal').modal('hide');
                    console.log(e);
                })
                .finally(() => {
                    this.isLoading = false;
                }
            )
        }
    }
};
</script>