import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Product from '../views/Product.vue'
import Card from '../views/page/Card.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/signin",
    name: "login",
    component: Login
  },
  {
    path: "/product",
    name: "product",
    component: Product,
    meta: { requiredUser: true },
    children:[
      {
        path:"card",
        component: Card,
        name:"card",
        meta: { requiredUser: true },
      },
    ]
  }
];

const router = new VueRouter({
  routes
})

export default router
