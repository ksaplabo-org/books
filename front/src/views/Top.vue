<template>
  <div class="menu">
    <NaviMenu/>

    <div id="wrapper">
      <Menu/>

      <div id="content-wrapper" class="menu bg-light">
          <div class="container-fluid">

            <p class="text-primary" v-show="msg">{{ msg }}</p>
            <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

            <!-- ロゴ -->
            <img src="/public/image/bookstation_logo_.png" class="img-fluid d-block mx-auto">
          
            <!-- 図書館情報欄 -->
            <div class="container">
              <div class="row">
                <!-- 休館日カレンダー -->
                <div class="col-3 border border-dark">
                  <label>
                    休館日カレンダー
                  </label>
                </div>
                <div class="col-1"></div>
                <!-- 図書館情報 -->
                <div class="col-8 border border-primary">
                  <div class="mb-2" style="font-size:18pt">Book Station</div>
                  <div style="font-size:14pt">〒060-0001</div>
                  <div class="mb-2" style="font-size:14pt">北海道札幌市中央区北１条西７丁目４−４ パシフィックマークス札幌北１条</div>
                  <span class="border-bottom"></span>
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <th class="col-2">開館時間</th>
                        <td>月曜日～金曜日</td>
                        <td class="col-7">9時00分～17時45分</td>
                      </tr>
                      <tr>
                        <th class="col-2">休館日</th>
                        <td colspan="2">土曜日・日曜日・祝日、年末年始</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <br>

            <!-- お知らせ欄 -->
            <div class="card shadow mb-4">
              <div class="card-header py-3 font-weight-bold">お知らせ</div>
              <div class="card-body">
                <form @submit.stop.prevent="updateView">
                  <b-table  striped responsive hover :items="items" :fields="fields">
                  </b-table>
                </form>
              </div>
            </div>

            <br>

            <!-- リンク欄 -->
            <div id="linkCarousel" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="/public/image/no-image.png">
                </div>
                <div class="carousel-item">
                  <img src="/public/image/bookstation_logo.png">
                </div>
                <div class="carousel-item">
                  <img src="/public/image/no-image.png">
                </div>
                <a class="carousel-control-prev" href="#linkCarousel" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#linkCarousel" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>

          </div>
          <Footer/>

      </div>
    </div>

  </div>
</template>


<script>
import * as UserUtil from '@/utils/UserUtil';
// 共通
import NaviMenu from '../components/NaviMenu.vue';
import Menu from '../components/Menu.vue';
import Footer from '../components/Footer.vue';
import '../utils/sb-admin';

export default {
  name: 'Top',
  props: ['flashMsg'],
  components: { NaviMenu, Menu, Footer },
  data() {
    return {
      msg: this.flashMsg,
      errMsg: '',
      fields: [
        {key: 'userId', label: '日時'},
        {key: 'userName', label: '内容'}
      ],
      items: []
    };
  },
  async mounted() {
    try {

      if (UserUtil.isSignIn()) {
        console.log('ok');
        
      } else {
        this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});

      };
    } catch(e) {
      this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
    }
  },
  methods: {
    updateView: async function() {
      try {
          const response = await AjaxUtil.getAllUser();
          this.items = response.data;
      } catch (error) {
          this.msg = '';
          this.errMsg = 'ユーザー取得処理に失敗しました';
          console.log(error);
          this.isLoading = false;
          throw error;
      } finally {
          this.isLoading = false;
      }
    }
  }
};
</script>
