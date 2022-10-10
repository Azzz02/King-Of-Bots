import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/error/NotFound'
import PkIndex from '../views/pk/PkIndex'
import RanklistIndex from '../views/ranklist/RanklistIndex'
import RecordIndex from '../views/record/RecordIndex'
import UserBotIndex from '../views/user/bot/UserBotIndex'


const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk"
  },
  {
    path: "/pk",
    name: "pk_index",
    component: PkIndex
  },
  {
    path: "/record",
    name: "record_index",
    component: RecordIndex
  },
  {
    path: "/ranklist",
    name: "ranklist_index",
    component: RanklistIndex
  },
  {
    path: "/user/bot",
    name: "user_bot_index",
    component: UserBotIndex
  },
  {
    path: "/404",
    name: "404",
    component: NotFound
  },
  {
    path: "/:catch(.*)",
    redirect: "/404"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
