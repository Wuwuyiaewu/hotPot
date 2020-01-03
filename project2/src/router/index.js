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
// 結帳頁面
import CustomerCheckout from '../views/CustomerCheckout'
// 訂單列表
import OrderList from "../views/OrderList";
Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    name: "login",
    component: Login
  },
  // Dashboard 有兩個進入點 需驗證的admin 與 不用驗證的
  {
    path: "/admin",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "product",
        name: "product",
        component: Product,
        meta: { requiredUser: true }
      },
      {
        path: "orderList",
        name: "orderList",
        component: OrderList,
        meta: { requiredUser: true }
      },
      {
        path: "coupon",
        name: "coupon",
        component: Coupon,
        meta: { requiredUser: true }
      }
    ]
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "customer_order",
        name: "customerOrder",
        component: CustomerOrder
      },
      {
        path: "customer_checkout/:orderId",
        name: "customer_checkout",
        component: CustomerCheckout
      }
    ]
  },
  {
    path: "/signin",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  routes
})

export default router
