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
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
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
  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the authentication cookie exists
    const authCookie = VueCookies.get('token'); // Replace 'authToken' with your cookie name

    if (authCookie) {
      // If cookie is present, allow navigation
      next();
    } else {
      // If cookie is not present, redirect to login page
      next({ name: 'sign-in' });
    }
  } else {
    // If the route doesn't require authentication, allow navigation
    next();
  }
});

export default router
