import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '../views/Form.vue'
import Submitted from '../views/Submitted.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Form',
    component: Form
  },
  {
    path: '/submitted',
    name: 'Submitted',
    component: Submitted
  }
]

const router = new VueRouter({
  routes
})

export default router
