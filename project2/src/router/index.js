import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
// 控制頁面
import Dashboard from '../views/Dashboard'
// 產品頁面(需要登入的children)
import Product from '../views/Product.vue'
// 優惠券(需要登入的children)
import Coupon from '../views/Coupon.vue'
// 購物頁面
import CustomerOrder from '../views/CustomerOrder'
Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    name: "login",
    component: Login
  },
  {
    path: "/admin",
    name: "Dashboard",
    component: Dashboard,
    children:[
      {
        path: "product",
        name: "product",
        component: Product,
        meta: { requiredUser: true },
      },
      {
        path: "coupon",
        name: "coupon",
        component: Coupon,
        meta: { requiredUser: true },
      },
    ]
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    children:[
      {
        path: "customer_order",
        name: "CustomerOrder",
        component: CustomerOrder,
      }
    ]
  },
  {
    path: "/signin",
    name: "login",
    component: Login
  },
];

const router = new VueRouter({
  routes
})

export default router
