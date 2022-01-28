import Vue from 'vue'
import VueRouter from 'vue-router'

// Views
import Main from '../views/Main.vue'
import Messages from '../views/Messages.vue'
import Ads from '../views/Ads.vue'
import Auth from '../views/Auth.vue'
import Profile from '../views/Profile.vue'

// Components
// Ads
import AdsByCategory from '@/components/ads/AdsByCategory.vue'
import MyAds from '@/components/ads/MyAds.vue'
import CreateAd from '@/components/ads/CreateAd.vue'
import AdById from '@/components/ads/AdById.vue'
import EditAd from '@/components/ads/EditAd.vue'

// Messages
import MyMessages from '@/components/messages/MyMessages.vue'
import ViewMessage from '@/components/messages/ViewMessage.vue'

// Profile
import MyProfile from '@/components/profile/MyProfile.vue'

// Auth
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'

// Not Found
import NotFound from '@/components/global/NotFound.vue'

// Middleware
import IsLoggedInMiddleware from '../middleware/IsLoggedInMiddleware'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/ads/',
    name: 'Ads',
    component: Ads,
    children: [
      {
        path: 'category/:category',
        name: "AdsByCategory",
        component: AdsByCategory
      },
      {
        path: 'my-ads',
        name: "MyAds",
        beforeEnter: IsLoggedInMiddleware,
        component: MyAds
      },
      {
        path: 'create',
        name: "CreateAd",
        beforeEnter: IsLoggedInMiddleware,
        component: CreateAd,
      },
      {
        path: ':adId',
        name: "AdById",
        component: AdById,
      },
      {
        path: ':adId/edit',
        name: "EditAd",
        beforeEnter: IsLoggedInMiddleware,
        component: EditAd,
      },
    ]
  },
  {
    path: '/messages/',
    name: 'Messages',
    beforeEnter: IsLoggedInMiddleware,
    component: Messages,
    children: [
      {
        path: 'my-messages',
        name: "MyMessages",
        component: MyMessages,
      },
      {
        path: 'view-message',
        name: "ViewMessage",
        component: ViewMessage,
      },
    ]
  },
  {
    path: '/profile/',
    name: 'Profile',
    beforeEnter: IsLoggedInMiddleware,
    component: Profile,
    children: [
      {
        path: 'my-profile',
        name: "MyProfile",
        component: MyProfile,
      },
    ]
  },
  {
    path: '/auth/',
    name: 'Auth',
    component: Auth,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      },
    ]
  },
  {
    path: '/*',
    name: 'NotFound',
    component: NotFound
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
