import Vue from 'vue'
import Router from 'vue-router'
import Cube from 'cube-ui'

Vue.use(Cube)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import(/* webpackChunkName: 'same' */'page/index'),
      children: [
        {
          path: '/g',
          name: 'g',
          component: () => import(/* webpackChunkName: 'same' */'page/g')
        }
      ]
    }

  ]
})
