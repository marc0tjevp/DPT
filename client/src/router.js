import Vue from 'vue';
import Router from 'vue-router';
import Pizzas from './components/Pizzas'
import Ingredients from './components/Ingredients'

Vue.use(Router);

export default new Router({
    routes: [
      {
        path: '/',
        name: 'pizzas',
        component: Pizzas,
      },
      {
        path: '/pizzas/add',
        name: 'pizzas-add',
        component: () => import('./views/Pizzas.add.vue'),
      },
      {
        path: '/ingredients',
        name: 'ingredients',
        component: Ingredients,
      },
      {
        path: '/ingredients/add',
        name: 'ingredients-add',
        component: () => import('./views/Ingredients.add.vue'),
      },
      {
        path: '/flashcards',
        name: 'flashcards',
        component: () => import('./components/Flashcards.vue'),
      },
      {
        path: '/flashcards/results',
        name: 'flashcards-results',
        component: () => import('./views/Flashcards.results.vue')
      },
    //   { path: '/404', name: 'notfound', component: () => import('./components/NotFound.vue') },
    //   { path: '*', redirect: '/404' },
    ],
  });