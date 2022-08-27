<template>
    
    <!-- Menu -->
    <ul class="sidebar navbar-nav" ref="test">
        <li class="nav-item active">
            <router-link tag="a" class="nav-link" :to="{ name: 'top'}">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>トップページ</span>
            </router-link>
        </li>

        <li class="nav-item active">
            <router-link tag="a" class="nav-link" :to="{ name: 'rentalbook'}">
                <i class="fas fa-fw fa-book-open"></i>
                <span>貸出状況登録</span>
            </router-link>
        </li>
        <li class="nav-item active">
            <router-link tag="a" class="nav-link" :to="{ name: 'maintebook'}">
                <i class="fas fa-fw fa-book-medical"></i>
                <span>ブック一覧</span>
            </router-link>
        </li>
        <li class="nav-item active">
            <router-link tag="a" class="nav-link" :to="{ name: 'listUser'}">
                <i class="fas fa-fw fa-user"></i>
                <span>ユーザー一覧</span>
            </router-link>
        </li>
        <li class="nav-item active">
            <router-link tag="a" class="nav-link" :to="{ name: 'leadingBook'}">
                <i class="fas fa-fw fa-book"></i>
                <span>貸出状況一覧</span>
            </router-link>
        </li>
    </ul>

</template>

<script>
import * as UserUtil from '@/utils/UserUtil';

export default {
  async mounted() {
        const self = this;
        
        var tests = self.$refs['test'];
        tests.forEach(function(test) {
            console.log(test)
        });
        tests.array.forEach(function(test) {
            console.log(test);
        });
        
        try {
            if (UserUtil.isSignIn()) {
                this.msg = '';
                self.userAuth = UserUtil.currentUserInfo().userAuth;
            } else {
               this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
            };
        } catch(e) {
            self.errMsg = e.message;
        }
    }
};
</script>
