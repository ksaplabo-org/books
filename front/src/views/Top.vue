<template>
  <div class="menu">
    <NaviMenu/>

    <div id="wrapper">
      <Menu/>

      <div id="content-wrapper" class="menu bg-light">
          <div class="container-fluid">

            <!-- Breadcrumbs-->
            <ol class="breadcrumb">
              <li class="breadcrumb-item active">トップページ</li>
            </ol>

            <p class="text-primary" v-show="msg">{{ msg }}</p>
            <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

            <div class="row">

              <div class="col-lg-6 mb-4">

                <!-- Approach -->
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <router-link tag="a" :to="{ name: 'rentalbook'}">貸出状況登録
                    </router-link> 
                  </div>
                  <div class="card-body">
                    <p>書籍の貸出・返却を登録します。</p>
                    <p class="mb-0"></p>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 mb-4">
                <!-- Approach -->
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <router-link tag="a" :to="{ name: 'maintebook'}">ブックマスタ
                    </router-link> 
                  </div>
                  <div class="card-body">
                    <p>書籍を登録します。</p>
                    <p class="mb-0"></p>
                  </div>
                </div>
              </div>

            <div class="col-lg-6 mb-4">

                <!-- Approach -->
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <router-link tag="a" :to="{ name: 'listUser'}">ユーザー一覧
                    </router-link>
                  </div>
                  <div class="card-body">
                    <p>ユーザー情報を管理します。</p>
                    <p class="mb-0"></p>
                  </div>
                </div>

              </div>

            <div class="col-lg-6 mb-4">

                <!-- Approach -->
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <router-link tag="a" :to="{ name: 'leadingBook'}">貸出状況一覧
                    </router-link> 
                  </div>
                  <div class="card-body">
                    <p>ユーザーの貸出状況を管理します。</p>
                    <p class="mb-0"></p>
                  </div>
                </div>
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
      errMsg: ''
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
};
</script>
