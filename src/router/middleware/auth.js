export default function auth({ store, next }) {
  if (!store.authenticated) {
    return next({
      name: "Login",
    });
  }

  return next();
}
