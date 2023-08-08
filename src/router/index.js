import {createRouter, createWebHashHistory} from 'vue-router';
import Home from '../views/Home.vue';
import PostDiary from '../views/PostDiary.vue';
import UpdateDiary from '../views/UpdateDiary.vue';
import Share from '../views/templates/share.vue';
import Setting from '../views/templates/setting.vue';

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
      path: '/post',
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
      },
    },
    {
      path: '/share',
      name: 'Share',
      component: Share,
      meta: {
        title: 'Share'
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        title: 'Setting'
      }
    },
  ]
})

const DEFAULT_TITLE = 'TITLE';

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE
})

export default router
