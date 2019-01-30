import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '_home',
      redirect: '/home',
      component: () => import('./views/Main.vue'),
      children: [{
	      path: '/login',
	      name: 'login',
	      component: () => import('./views/Login.vue')
	    },{
      	path: '/home',
      	name: 'home',
      	component: () => import('./views/Home.vue')
      },{
	      path: '/list/:id',
	      name: 'list',
	      component: () => import('./views/List.vue')
	    },{
	      path: '/search/:val',
	      name: 'search',
	      component: () => import('./views/List.vue')
	    },{
	      path: '/article/:id',
	      name: 'article',
	      component: () => import('./views/Article.vue')
	    },{
	      path: '/register',
	      name: 'register',
	      component: () => import('./views/Register.vue')
	    }]
    }
  ]
})
