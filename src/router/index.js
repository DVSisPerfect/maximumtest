import Vue from 'vue'
import VueRouter from 'vue-router'
import ServiceForm from '../views/ServiceForm.vue'
import Submitted from '../views/Submitted.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ServiceForm',
    component: ServiceForm
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
