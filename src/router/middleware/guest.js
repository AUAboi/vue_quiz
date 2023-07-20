export default function guest({ store, next }) {

  if (store.authenticated) {
    console.log("test");
    return next({
      name: "Admin",
    });
  }

  return next();
}
