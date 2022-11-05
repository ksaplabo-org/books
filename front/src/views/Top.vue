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
            <div class="row">
              <!-- 画像 -->
              <div class="col-5">
                <img src="/public/image/library.png" class="img-fluid">
              </div>
              <!-- 図書館情報 -->
              <div class="col-7 border border-primary">
                <div class="mb-2" style="font-size:14pt">〒060-0001</div>
                <div class="mb-2" style="font-size:14pt">北海道札幌市中央区北１条西７丁目４−４</div>
                <div class="mb-2" style="font-size:14pt">パシフィックマークス札幌北１条</div>
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

            <br>

            <!-- お知らせ欄 -->
            <div class="card shadow mb-4">
              <div class="card-header py-3 font-weight-bold">お知らせ</div>
              <div class="card-body">
                <b-table striped responsive hover :items="items" :fields="fields" />
              </div>
            </div>

            <br>

            <!-- リンク欄 -->
            <div id="linkCarousel" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <a href="https://www.ntt-ipnet.co.jp/k/index.html" target="_blank">
                    <img src="/public/image/NTTk_logo.png" class="img-fluid">
                  </a>
                </div>
                <div class="carousel-item">
                  <a href="https://www.ntt-ipnet.co.jp/k/index.html" target="_blank">
                    <img src="/public/image/NTTk_logo.png" class="img-fluid">
                  </a>
                </div>
                <div class="carousel-item">
                  <a href="https://www.ntt-ipnet.co.jp/k/index.html" target="_blank">
                    <img src="/public/image/NTTk_logo.png" class="img-fluid">
                  </a>
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
import * as AjaxUtil from '@/utils/AjaxUtil';
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
      // お知らせ取得
      this.searchInformation();
    },
    // お知らせ検索処理
    searchInformation: function() {
      this.isLoading = true;
      this.msg = '';
      this.errMsg = '';
      this.items = [];

      // APIで検索
      AjaxUtil.searchInformation()
        .then((response) => {
          this.items = JSON.parse(response.data.Items);
        })
        .catch((error) => {
          this.msg = '';
          this.errMsg = '検索処理に失敗しました';
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getEvents ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }

      this.events = events
    },
    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  }
};
</script>
