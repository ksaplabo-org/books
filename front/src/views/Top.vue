<template>
  <div class="menu">
    <NaviMenu/>

    <div id="wrapper">
      <Menu/>

      <div id="content-wrapper" class="menu bg-light">
          <div class="container-fluid">

            <p class="text-primary" v-show="msg">{{ msg }}</p>
            <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

            <!-- 図書館情報欄 -->
            <div class="d-flex align-items-stretch">
              <!-- 図書館イメージ -->
              <div>
                <img src="/public/image/library.png" class="img-fluid">
              </div>
              <!-- 図書館情報 -->
              <div class="flex-grow-1 border border-info">
                <div class="container-fluid">
                  <!-- 見出し -->
                  <div style="border-bottom: 2px solid black">
                    <div class="h4">見出しテスト</div>
                  </div>
                  <div style="p-2">〒000-0000</div>
                  <div style="p-2">住所</div>
                  <div style="p-2">開館時間、休館情報</div>
                  <div style="p-2">あとなに書こう・・・</div>
                </div>
              </div>
            </div>

            <br>

            <!-- お知らせ欄 -->
            <div class="card shadow mb-4">
              <div class="card-header py-3 font-weight-bold text-white bg-primary">お知らせ</div>
              <div class="card-body">
                <b-table striped responsive hover :items="items" :fields="fields" />
              </div>
            </div>

            <br>
          </div>
          <Footer/>
      </div>
    </div>
  </div>
</template>


<script>
import * as UserUtil from '@/utils/UserUtil';
import * as AjaxUtil from '@/utils/AjaxUtil';
// 共通
import NaviMenu from '../components/NaviMenu.vue';
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Top',
  props: ['flashMsg'],
  components: { NaviMenu, Menu, Footer },
  data() {
    return {
      msg: this.flashMsg,
      errMsg: '',
      fields: [
        {key: 'date', label: '日時'},
        {key: 'content', label: '内容'}
      ],
      items: []
    };
  },
  async mounted() {
    try {
      if (UserUtil.isSignIn()) {
        console.log('ok');
        // 画面更新
        this.updateView();
      } else {
        this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
      };
    } catch(e) {
      this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
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
    // お知らせ取得処理
    getInformation: function() {
      this.isLoading = true;
      this.items = [];

      AjaxUtil.getInformation()
        .then((response) => {
          this.items = JSON.parse(response.data.Items);
        })
        .catch((e) => {
          this.msg = '';
          this.errMsg = '検索処理に失敗しました';
          console.log(e);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
