import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Product from '../views/Product.vue'
import Dashboard from '../views/Dashboard'
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
