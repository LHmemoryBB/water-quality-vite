import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/:pathMatch(.*)", redirect: "/404" },
  //默认登录到首页
  {
    path: "/",
    name: "",
    redirect: "/index",
    hidden: true,
    meta: { requireAuth: false },
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@/views/login.vue"),
    hidden: true,
    meta: { requireAuth: false },
  },
  {
    path: "/index",
    name: "首页",
    component: () => import("@/views/index.vue"),
    iconCls: "el-icon-tickets",
    children: [
      {
        path: "/view/waterTable",
        name: "列表页",
        component: () => import("@/views/waterTable.vue"),
        meta: { requireAuth: false },
      },
      {
        path: "/view/station",
        name: "水质分析",
        component: () => import("@/views/stationChart.vue"),
        meta: { requireAuth: false },
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export { router, routes };
