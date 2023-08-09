import {createRouter, createWebHashHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../components/Login.vue';
import Setting from '../components/Setting.vue';
import PostDiary from '../views/PostDiary.vue';
import UpdateDiary from '../views/UpdateDiary.vue';
import Share from '../views/templates/share.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'ほんのいちにち'
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'ほんのいちにち'
      }
    },
     {
      path: '/post',
      name: 'PostDiary',
      component: PostDiary,
      meta: {
        title: 'ほんのいちにち'
      }
    },
    {
      path: '/update',
      name: 'UpdateDiary',
      component: UpdateDiary,
      meta: {
        title: 'ほんのいちにち'
      },
    },
    {
      path: '/share',
      name: 'Share',
      component: Share,
      meta: {
        title: 'ほんのいちにち'
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        title: 'ほんのいちにち'
      }
    }
  ]
})

const DEFAULT_TITLE = 'TITLE';

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE
})

export default router
