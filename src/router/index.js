import {createRouter, createWebHashHistory} from 'vue-router';
import Home from '../views/Home.vue';
import PostDiary from '../views/PostDiary.vue';
import UpdateDiary from '../views/UpdateDiary.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    
     {
      path: '/article',
      name: 'PostDiary',
      component: PostDiary,
      meta: {
        title: 'PostDiary'
      }
    },
    
    {
      path: '/update',
      name: 'UpdateDiary',
      component: UpdateDiary,
      meta: {
        title: 'UpdateDiary'
      }
    }
  ]
})

const DEFAULT_TITLE = 'TITLE';

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE
})

export default router
