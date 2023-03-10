export default [
  {
    path: "/",
    redirect: { name: "institutions" },
    component: () => import("@/layouts/default"),
    children: [
      {
        path: "institutions",
        name: "institutions",
        component: () => import("@/views/app/Institution"),
      },
      {
        path: "services",
        name: "services",
        component: () => import("@/views/app/Service"),
      },

      {
        path: "read",
        name: "read",
        component: () => import("@/views/app/Read"),
      },

      {
        path: "plans",
        name: "plans",
        component: () => import("@/views/app/Plan"),
      },

      {
        path: "user-profile",
        name: "User Profile",
        component: () => import("@/views/app/UserProfile"),
      },

      {
        path: "user-management",
        name: "user-management",
        component: () => import("@/views/app/UserManagement"),
      },

      {
        path: "monitorization",
        name: "monitoring",
        component: () => import("@/views/app/Monitorization"),
      },

      {
        path: "consumption",
        name: "consumption",
        component: () => import("@/views/app/Consumption"),
      },

      {
        path: "notifications",
        name: "notifications",
        component: () => import("@/views/app/Notifications"),
      },

      {
        path: "documents",
        name: "documents",
        component: () => import("@/views/app/Documents"),
      },
    ],
  },

  {
    path: "",
    component: () => import("@/views/auth/AuthWrapper"),
    redirect: { name: "login" },
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/auth/login/Login"),
      },
      {
        path: "/password",
        component: () => import("@/views/auth/password/PasswordWrapper"),
        children: [
          {
            path: "",
            name: "forgot_password",
            component: () =>
              import("@/views/auth/password/password-forgot/PasswordForgot"),
          },
          {
            path: "reset/:token",
            name: "reset_password",
            component: () =>
              import("@/views/auth/password/password-reset/PasswordReset"),
          },
        ],
      },
    ],
  },

  { path: "/:catchAll(.*)", component: () => import("@/views/errors/404") },
];
