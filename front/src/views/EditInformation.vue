<template>
    <div class="editinfo">
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

                    <!-- タブ -->
                    <div class="tabs">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#AddInfo">お知らせ登録</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#EditInfo">お知らせ更新</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#DeleteInfo">お知らせ削除</a>
                        </li>
                    </ul>
                    
                    <div class="tab-content">
                        <div id="AddInfo" class="tab-pane show active">
                            <!-- 登録内容タブ -->
                            <div class="card shadow mb-4">
                                <div class="card-header font-weight-bold">登録内容</div>
                                <div class="card-body">
                                    <form @submit.stop.prevent="updateInformation">
                                        <div class="form-group">
                                            <div class="row mb-3">
                                                <label class="col-sm-2 col-form-label">お知らせ:</label>
                                                <div class="col-sm-10">
                                                <input type="text" id="addtitle" class=form-control maxlength="100" v-model="clickedAddRow.title">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <label class="col-sm-2 col-form-label">詳細:</label>
                                                <div class="col-sm-10">
                                                <input type="text" id="addtitle" class=form-control maxlength="100" v-model="clickedAddRow.text">
                                                </div>
                                            </div>
                                        </div>
                                        <button class="btn btn-success mt-2 col-1" data-toggle="modal" data-target="#imagemodaladd">登録</button>
                                        <div class="col"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div id="EditInfo" class="tab-pane">
                            <!-- 更新内容タブ -->
                            <div class="card shadow mb-4">
                                <div class="card-header font-weight-bold">更新内容</div>
                                <div class="card-body">
                                    <form @submit.stop.prevent="updateInformation">
                                        <div class="form-group">
                                            <div class="row mb-3">
                                                <label class="col-sm-2 col-form-label">ID:</label>
                                                <div class="col-sm-10">
                                                <label class="col-sm-2 col-form-label">{{clickedEditRow.no}}</label>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <label class="col-sm-2 col-form-label">掲載日:</label>
                                                <div class="col-sm-10">
                                                <label class="col-sm-2 col-form-label">{{clickedEditRow.date}}</label>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <label class="col-sm-2 col-form-label">お知らせ:</label>
                                                <div class="col-sm-10">
                                                <input type="text" id="updatetitle" class=form-control maxlength="100" v-model="clickedEditRow.title">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <label class="col-sm-2 col-form-label">詳細:</label>
                                                <div class="col-sm-10">
                                                <input type="text" id="updatetitle" class=form-control maxlength="100" v-model="clickedEditRow.text">
                                                </div>
                                            </div>
                                        </div>
                                        <button class="btn btn-primary mt-2 col-1" data-toggle="modal" data-target="#imagemodaledit">更新</button>
                                        <div class="col"/>
                                    </form>
                                </div>
                            </div>
                            <!-- お知らせ欄 -->
                            <div class="card shadow mb-4">
                                <form @submit.stop.prevent="editinfo">
                                    <div class="card-body">
                                    <b-table striped responsive hover :items="items" :fields="fields">
                                        <!-- ボタンセル定義 -->
                                        <template #cell(controls)="data">
                                            <b-button variant="outline-primary" v-on:click="clickedEditRow = {date: data.item.date, no: data.item.no, title: data.item.title, text: data.item.content};">
                                                編集
                                            </b-button>
                                        </template>
                                    </b-table>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div id="DeleteInfo" class="tab-pane">
                            <!-- お知らせ欄 -->
                            <div class="card shadow mb-4">
                                <form @submit.stop.prevent="editinfo">
                                    <div class="card-body">
                                    <b-table striped responsive hover :items="items" :fields="fields">
                                        <!-- ボタンセル定義 -->
                                        <template #cell(controls)="data">
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
                    </div>
                </div>
            </div>

            <Footer/>
        </div>

        <!-- モーダルの設定です -->
        <div class="modal fade" id="imagemodaladd" tabindex="0" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">以下の内容でお知らせを登録してよろしいですか？</div>
                    </div>
                    <div class="modal-body">
                        <form @submit.stop.prevent="editinfo">
                            <div class="form-group">
                                <label for="title" class="col-form-label">お知らせ:</label>
                                <div class="multiline-text" v-show="clickedEditRow">{{clickedAddRow.title}}</div>
                            </div>
                            <div class="form-group">
                                <label for="text" class="col-form-label">詳細:</label>
                                <div class="multiline-text" v-show="clickedEditRow">{{clickedAddRow.text}}</div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-dismiss="modal" v-on:click="clickedAddRow.title = ''; clickedAddRow.content = '';">登録</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="imagemodaledit" tabindex="0" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">以下の内容でお知らせを更新してよろしいですか？</div>
                    </div>
                    <div class="modal-body">
                        <form @submit.stop.prevent="editinfo">
                            <div class="form-group">
                                <label for="no" class="col-form-label">ID:</label>
                                <div class="multiline-text" v-show="clickedEditRow">{{clickedEditRow.no}}</div>
                            </div>
                            <div class="form-group">
                                <label for="date" class="col-form-label">掲載日:</label>
                                <div class="multiline-text" v-show="clickedEditRow">{{clickedEditRow.date}}</div>
                            </div>
                            <div class="form-group">
                                <label for="title" class="col-form-label">お知らせ:</label>
                                <div class="multiline-text" v-show="clickedEditRow">{{clickedEditRow.title}}</div>
                            </div>
                            <div class="form-group">
                                <label for="text" class="col-form-label">詳細:</label>
                                <div class="multiline-text" v-show="clickedEditRow">{{clickedEditRow.text}}</div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="clickedEditRow.date = ''; clickedEditRow.title = ''; clickedEditRow.content = '';">更新</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="imagemodaldelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel">以下のお知らせを削除してよろしいですか？</div>
                    </div>
                    <div class="modal-body">
                        <form @submit.stop.prevent="editinfo">
                            <div class="form-group">
                                <label for="no" class="col-form-label">ID:</label>
                                <div class="multiline-text" v-show="clickedEditRow">{{clickedDeleteRow.no}}</div>
                            </div>
                            <div class="form-group">
                                <label for="date" class="col-form-label">掲載日:</label>
                                <div class="multiline-text" v-show="clickedDeleteRow">{{clickedDeleteRow.date}}</div>
                            </div>
                            <div class="form-group">
                                <label for="title" class="col-form-label">お知らせ:</label>
                                <div class="multiline-text" v-show="clickedDeleteRow">{{clickedDeleteRow.title}}</div>
                            </div>
                            <div class="form-group">
                                <label for="text" class="col-form-label">詳細:</label>
                                <div class="multiline-text" v-show="clickedDeleteRow">{{clickedDeleteRow.text}}</div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="clickedDeleteRow.title = ''; clickedDeleteRow.content = '';">削除</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="clickedDeleteRow.title = ''; clickedDeleteRow.content = '';">閉じる</button>
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
    name : 'EditInfo',
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
