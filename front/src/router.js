import Vue from "vue";
import Router from "vue-router";

import SignIn from "./views/SignIn.vue";
import SignOut from "./views/SignOut.vue";
import Sorry from "./views/Sorry.vue";
import Top from "./views/Top.vue";
import RentalBook from "./views/RentalBook.vue";
import MainteBook from "./views/MainteBook.vue";
import ListBook from "./views/ListBook.vue";
import ListUser from "./views/ListUser.vue";
import LendingBook from "./views/LendingBook.vue";
import AddUser from "./views/AddUser.vue";
import EditUser from "./views/EditUser.vue";
import Student from "./views/Student.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/pages/signin.html",
      name: "signin",
      props: true,
      component: SignIn,
    },
    {
      path: "/pages/signout.html",
      name: "signout",
      component: SignOut,
    },
    {
      path: "/pages/top.html",
      name: "top",
      component: Top,
    },
    {
      path: "/pages/book/rental.html",
      name: "rentalbook",
      component: RentalBook,
    },
    {
      path: "/pages/book/mainte.html",
      name: "maintebook",
      component: MainteBook,
    },
    {
      path: "/pages/book/list.html",
      name: "listbook",
      component: ListBook,
    },
    {
      path: "/pages/user/list.html",
      name: "listUser",
      props: true,
      component: ListUser,
    },
    {
      path: "/pages/book/lending.html",
      name: "lendingBook",
      component: LendingBook,
    },
    {
      path: "/pages/user/add.html",
      name: "addUser",
      component: AddUser,
    },
    {
      path: "/pages/user/edit.html",
      name: "editUser",
      component: EditUser,
    },
    {
      path: "/pages/student.html",
      name: "student",
      component: Student,
    },
    {
      path: "*",
      name: "sorry",
      component: Sorry,
    },
  ],
});
