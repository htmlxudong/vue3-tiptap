import { createWebHashHistory, createRouter } from 'vue-router'

import DemoVuew from '@/views/demo.vue';
import HomeView from '@/views/home/home.vue'
import VModelTest from '@/views/v-model-test.vue'

const routes = [
  { path: '/', component: DemoVuew },
  { path: '/home', component: HomeView },
  { path: '/v-model-test', component: VModelTest },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;