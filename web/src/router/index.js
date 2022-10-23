import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/error/NotFound'
import PkIndex from '../views/pk/PkIndex'
import RanklistIndex from '../views/ranklist/RanklistIndex'
import RecordIndex from '../views/record/RecordIndex'
import UserBotIndex from '../views/user/bot/UserBotIndex'
import UserAccountRegister from "@/views/user/account/UserAccountRegister";
import UserAccountLogin from "@/views/user/account/UserAccountLogin";
import store from '../store/index'

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk",
    meta: {
      requestAuth: true
    }
  },
  {
    path: "/pk",
    name: "pk_index",
    component: PkIndex,
    meta: {
      requestAuth: true
    }
  },
  {
    path: "/record",
    name: "record_index",
    component: RecordIndex,
    meta: {
      requestAuth: true
    }
  },
  {
    path: "/ranklist",
    name: "ranklist_index",
    component: RanklistIndex,
    meta: {
      requestAuth: false
    }
  },
  {
    path: "/user/bot",
    name: "user_bot_index",
    component: UserBotIndex,
    meta: {
      requestAuth: true
    }
  },
  {
    path: "/user/account/login",
    name: "user_account_login",
    component: UserAccountLogin,
    meta: {
      requestAuth: false
    }
  },
  {
    path: "/user/account/register",
    name: "user_account_register",
    component: UserAccountRegister,
    meta: {
      requestAuth: false
    }
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    meta: {
      requestAuth: false
    }
  },
  {
    path: "/:catch(.*)",
    redirect: "/404",
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requestAuth && !store.state.user.islogin) {
    next({ name: "user_account_login" })
  } else {
    next()
  }
})

export default router
