<template>
  <div class="student">
    <NaviMenu />

    <div id="wrapper">
      <Menu />

      <div id="content-wrapper" class="bg-light">
        <div class="container-fluid">
          <!-- ★以降の処理は課題で記載すること★ -->
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link tag="a" :to="{ name: 'top' }">トップページ</router-link>
            </li>
            <li class="breadcrumb-item active">学生用</li>
          </ol>

          <p class="text-primary" v-show="msg">{{ msg }}</p>
          <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

          <b-table striped responsive hover :items="items" :fields="fields"></b-table>
        </div>
      </div>

      <Footer />
    </div>

    <!-- スクロールトップボタン-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <!-- ローディングマスク -->
    <loading v-if="isLoading === true" />
  </div>
</template>

<script>
import * as UserUtil from "@/utils/UserUtil";
import * as AjaxUtil from "@/utils/AjaxUtil";
// 共通
import NaviMenu from "../components/NaviMenu.vue";
import Menu from "../components/Menu.vue";
import Footer from "../components/Footer.vue";
import Loading from "../components/Loading.vue";
export default {
  name: "Student",
  props: ["flashMsg", "flashErrMsg"],
  components: { NaviMenu, Menu, Footer, Loading },
  data() {
    return {
      msg: "",
      errMsg: "",
      isLoading: false,
      fields: [
        { key: "id", label: "ID" },
        { key: "name", label: "名前" },
      ],
      items: [],
      searchWord: "",
    };
  },
  async mounted() {
    try {
      //サインイン確認
      if (UserUtil.isSignIn()) {
        //ユーザー情報を検索
        await this.default();

        //メッセージ設定
        this.msg = this.flashMsg;
        this.errMsg = this.flashErrMsg;
      } else {
        this.$router.push({ name: "signIn", params: { flashMsg: "サインインしてください" } });
      }
    } catch (e) {
      this.errMsg = e.message;
    }
  },
  methods: {
    /**
     * 学生情報検索処理
     */
    default: async function () {
      this.isLoading = true;

      this.msg = "";
      this.errMsg = "";

      try {
        const response = await AjaxUtil.getAllStudent();
        this.items = JSON.parse(response.date.Items);
      } catch (e) {
        this.msg = "";
        this.errMsg = "学生検索に失敗しました。";
        console.log(e);
      }

      this.isLoading = false;
    },
  },
};
</script>
