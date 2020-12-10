import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";
import Detail from "../views/Detail";
import AddCartSuccess from '../views/AddCartSuccess'
import ShopCart from '../views/ShopCart'
import Trade from '../views/Trade'
import Pay from '../views/Pay'

const push = VueRouter.prototype.push


const replace = VueRouter.prototype.replace
VueRouter.prototype.push = function(location,onComplete,onAbort){
  if (onComplete && onAbort){
    push.call(location, onComplete, onAbort)
  }
  push.call(this, location, onComplete,()=>{})
}


VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    replace.call(location, onComplete, onAbort)
  }
  replace.call(this, location, onComplete, () => {})
}


// 安装插件
Vue.use(VueRouter);




export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
      meta:{isShow:true}
    },
    {
      path: "/register",
      component: Register,
      meta: {isShow: true}
    },
    {
      path: "/search/:searchText?",
      component: Search,
      name:'search',
    },
    {
      path: '/detail/:skuId?',
      name: 'detail',
      component:Detail
    },
    {
      path: '/addcartsuccess',
      name: 'addcartsuccess',
      component: AddCartSuccess
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: ShopCart
    },
    {
      path: '/trade',
      name: 'trade',
      component: Trade
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
  ],
  scrollBehavior() {
    return {x:0,y:0}
  }
  
});
