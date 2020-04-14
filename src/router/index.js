import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import UserDetail from '../views/UserDetail/UserDetail.vue';
import RepositoryDetail from '../views/RepositoryDetail/RepositoryDetail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  { path: '/user/:login', name: 'user', component: UserDetail },
  { path: '/repo/:login/:repoName', name: 'repo', component: RepositoryDetail },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
