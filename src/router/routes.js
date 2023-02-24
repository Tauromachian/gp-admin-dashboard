export default [
  { path: "/", name: "services", component: () => import("@/views/$1") },

  { path: "/plan-form", name: "plans", component: () => import("@/views/$1") },

  {
    path: "/user-profile",
    name: "user-profile",
    component: () => import("@/views/$1"),
  },

  {
    path: "/user-management",
    name: "user-management",
    component: () => import("@/views/$1"),
  },

  {
    path: "/monitorization",
    name: "monitoring",
    component: () => import("@/views/$1"),
  },

  {
    path: "/table-list",
    name: "Table List",
    component: () => import("@/views/$1"),
  },

  { path: "/typography", component: () => import("@/views/$1") },

  { path: "/icons", component: () => import("@/views/$1") },

  { path: "/maps", component: () => import("@/views/$1") },

  { path: "/notifications", component: () => import("@/views/$1") },

  {
    path: "/upgrade",
    name: "Upgrade to PRO",
    component: () => import("@/views/$1"),
  },

  {
    path: "",
    component: page("auth/AuthWrapper"),
    redirect: { name: "login" },
    children: [
      {
        path: "/login",
        name: "login",
        component: page("auth/login/Login"),
      },
      {
        path: "/password",
        component: page("auth/password/PasswordWrapper"),
        children: [
          {
            path: "",
            name: "forgot_password",
            component: page("auth/password/password-forgot/PasswordForgot"),
          },
          {
            path: "reset/:token",
            name: "reset_password",
            component: page("auth/password/password-reset/PasswordReset"),
          },
        ],
      },
    ],
  },

  { path: "*", component: page("errors/404.vue") },
];
