import Vue from 'vue'
import Router from 'vue-router'
import List from '@/list'
import swiperDemo from '@/swiper-demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: List
    },
    {
      path: '/swiper',
      name: 'swiperDemo',
      component: swiperDemo
    }
  ]
})
