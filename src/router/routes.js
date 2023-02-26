function layout(path) {
  return () => import(`@/layouts/${path}`);
}

function page(path) {
  return () => import(`@/views/${path}`);
}

export default [
  {
    path: "/",
    redirect: { name: "institutions" },
    component: layout("default"),
    children: [
      {
        path: "institutions",
        name: "institutions",
        component: page("app/Institution"),
      },
      {
        path: "/institution/:id",
        component: layout("institutionContent"),
        children: [
          {
            path: "services",
            name: "services",
            component: page("app/Service"),
          },

          {
            path: "service/:idService",
            name: "services",
            component: layout("serviceContent"),

            children: [
              {
                path: "one-read",
                name: "oneRead",
                component: page("app/OneRead"),
              },
            ],
          },
          {
            path: "read",
            name: "read",
            component: page("app/Read"),
          },

          {
            path: "/plan-form",
            name: "plans",
            component: page("app/Plan"),
          },

          {
            path: "/user-profile",
            name: "User Profile",
            component: page("app/UserProfile"),
          },

          {
            path: "/user-management",
            name: "user-management",
            component: page("app/UserManagement"),
          },

          {
            path: "/monitorization",
            name: "monitoring",
            component: page("app/Monitorization"),
          },

          {
            path: "/docs",
            name: "docs",
            component: page("app/Docs"),
          },

          {
            path: "/consumption",
            name: "consumption",
            component: page("app/Consumption"),
          },

          {
            path: "/closure",
            name: "closure",
            component: page("app/Closure"),
          },

          {
            path: "/table-list",
            name: "Table List",
            component: page("app/TableList"),
          },

          {
            path: "/typography",
            component: page("app/Typography"),
          },

          {
            path: "/icons",
            component: page("app/Icons"),
          },

          {
            path: "/notifications",
            name: "notifications",
            component: page("app/Notifications"),
          },

          {
            path: "documents",
            name: "documents",
            component: page("app/Documents"),
          },
        ],
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

  { path: "/:catchAll(.*)", component: page("errors/404") },
];
