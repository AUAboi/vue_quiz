export default function isAdmin({ store, next }) {
  if (!store.authenticated) {
    return next({
      name: "NotFound"
    })
  }

  if (!store.user.is_admin) {
    return next({
      name: "Home",
    });
  }

  return next();
}
