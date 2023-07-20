export default function guest({ store, next }) {
  if (store.authenticated) {
    return next({
      name: "Admin",
    });
  }

  return next();
}
