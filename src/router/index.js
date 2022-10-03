import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateProfileView from "@/views/profile/CreateProfileView";
import LoginView from "@/views/auth/LoginView";
import EditProfileView from "@/views/profile/EditProfileView";
import MenuProfileView from "@/views/profile/MenuProfileView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true },
  },

    //profile
  {
    path: '/profile/create',
    name: 'createProfile',
    component: CreateProfileView,
    meta: { requiresGuest: true },

  },
  {
    path: '/profile',
    name: 'menuProfile',
    component: MenuProfileView,
    meta: { requiresAuth: true },

  },
  {
    path: '/profile/edit',
    name: 'profile',
    component: EditProfileView,
    meta: { requiresAuth: true },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(! localStorage.getItem('authenticated')) {
      next({
        path: '/login'
      });
    }
    next();
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
      if (localStorage.getItem('authenticated')){
        next({
          path: '/'
        });
      }
  }else {
    next();
  }
});


export default router
