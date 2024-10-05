import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies'
import HomeView from '../views/HomeView.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }, // Set meta field to indicate route needs authentication
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: { requiresNoAuth: true }, // Set meta field to indicate route needs authentication
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
      meta: { requiresNoAuth: true }, // Set meta field to indicate route needs authentication
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authCookie = VueCookies.get('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    return authCookie ? next() : next({ name: 'sign-in' });
  }

  if (to.matched.some(record => record.meta.requiresNoAuth)) {
    return !authCookie ? next() : (document.location.href = '/');
  }

  next();
});

export default router
