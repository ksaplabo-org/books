import Vue from 'vue';
import Router from 'vue-router';

import SignIn from './views/SignIn.vue';
import SignOut from './views/SignOut.vue';
import Sorry from './views/Sorry.vue';
import Menu from './views/Menu.vue';
import RentalBook from './views/RentalBook.vue';
import MainteBook from './views/MainteBook.vue';
import ListUser from './views/ListUser.vue';
import ListBook from './views/ListBook.vue';
import AddUser from './views/AddUser.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/pages/signin.html',
      name: 'signin',
      props: true,
      component: SignIn,
    },
    {
      path: '/pages/signout.html',
      name: 'signout',
      component: SignOut,
    },
    {
      path: '/pages/menu.html',
      name: 'menu',
      component: Menu,
    },
    {
      path: '/pages/rentalbook.html',
      name: 'rentalbook',
      component: RentalBook,
    },
    {
      path: '/pages/maintebook.html',
      name: 'maintebook',
      component: MainteBook,
    },
    {
      path: '/pages/listUser.html',
      name: 'listUser',
      component: ListUser,
    },
    {
      path: '/pages/listBook.html',
      name: 'listBook',
      component: ListBook,
    },
    {
      path: '/pages/addUser.html',
      name: 'addUser',
      component: AddUser,
    },
    {
      path: '*',
      name: 'sorry',
      component: Sorry,
    }
  ],
});
