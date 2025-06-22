import { createWebHashHistory, createRouter } from 'vue-router'

import DemoVuew from '@/views/demo.vue';
import HomeView from '@/views/home/home.vue'
import VModelTest from '@/views/v-model-test.vue'
import PdfTest from '@/views/pdf-test.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/home', component: DemoVuew },
  { path: '/v-model-test', component: VModelTest },
  { path: '/pdf-test', component: PdfTest },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;