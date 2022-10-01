<template>
    <!-- Menu -->
    <ul class="sidebar navbar-nav" ref="test">
        <li class="nav-item active">
            <router-link tag="a" class="nav-link" :to="{ name: 'top'}">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>トップページ</span>
            </router-link>
        </li>
        <li v-for="(menu, i) in menuList" :key="`bad-sample_${i}`" class="nav-item active">
            <router-link tag="a" class="nav-link" :to="{ name: menu.name }">
                <i v-bind:class="menu.icon"></i>
                <span>{{ menu.title }}</span>
            </router-link>
        </li>
    </ul>
</template>

<script>
import * as UserUtil from '@/utils/UserUtil';

export default {
    data() {
        /**
         * メニュー定義
         *    titile: タイトル
         *    name: ルーティングする名称
         *    icon: Font Awesomeのアイコンを指定
         *    onlyAdmin: true:管理者のみ/false:管理者、一般で使用可能
         */
        this.userAuth = UserUtil.currentUserInfo().userAuth;
        return {
            menuList: [
                { title: '貸出状況登録', name: 'rentalbook', icon: 'fas fa-fw fa-book', onlyAdmin: false },
                { title: 'ブック一覧', name: 'maintebook', icon: 'fas fa-fw fa-book-medical', onlyAdmin: true },
                { title: 'ユーザー一覧', name: 'listUser', icon: 'fas fa-fw fa-user', onlyAdmin: true },
                { title: '貸出状況一覧', name: 'lendingBook', icon: 'fas fa-fw fa-book', onlyAdmin: false }
            ].filter(e => this.userAuth == "1" ? !e.onlyAdmin : true)
        }
    },
    async mounted() {
        const self = this;
        try {
            if (UserUtil.isSignIn()) {
                this.msg = '';
            } else {
                this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
            };
        } catch(e) {
            self.errMsg = e.message;
        }
    }
};
</script>
