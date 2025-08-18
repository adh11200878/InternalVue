import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
    meta: { requiresAuth: true }, //經過路由守衛
    children: [
      {
        path: "",
        component: () => import("@/views/index.vue"),
      },
      {
        path: "content",
        component: () => import("@/views/content.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/layouts/EmptyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/login.vue"),
      },
    ],
  },
  // catch-all 404 路由(未定義路由就導向404)
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
