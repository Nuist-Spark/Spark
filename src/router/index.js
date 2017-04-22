import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Blog from '@/components/blog/Blog'
import News from '@/components/news/News'
import More from '@/components/more/More'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/blog',
    component: Blog
  }, {
    path: '/news',
    component: News
  }, {
    path: '/more',
    component: More
  }]
})
