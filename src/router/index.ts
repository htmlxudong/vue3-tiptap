import { createWebHashHistory, createRouter } from 'vue-router'


import HomeView from '@/views/home/home.vue'
import Demo from '@/views/demo/index.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/demo', component: Demo },     // 测试页面
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;