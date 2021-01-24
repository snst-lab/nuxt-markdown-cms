export default async ({ app, store }) => {
    app.router.beforeEach((to, from, next) => {
      next();
    });
  
    app.router.afterEach((to, from) => {
    });
  };