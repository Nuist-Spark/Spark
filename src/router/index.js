import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/Main'
import Home from '@/components/home/Home'
import Group from '@/components/group/Group'
import groupList from '@/components/group-list/groupList'
import groupFight from '@/components/group-fight/groupFight'
import Me from '@/components/me/Me'
import Login from '@/components/login/Login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Main,
    children: [{
      path: '/home',
      component: Home
    }, {
      path: '/group',
      component: Group,
      children: [{
        path: '/group/groupList',
        component: groupList
      }, {
        path: '/group/groupFight',
        component: groupFight
      }]
    }, {
      path: '/me',
      component: Me
    }]
  }, {
    path: '/login',
    component: Login
  }]
})
