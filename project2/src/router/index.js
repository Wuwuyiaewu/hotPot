import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Product from '../views/Product.vue'
import Dashboard from '../views/Dashboard'
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
