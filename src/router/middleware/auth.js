export default function auth({ store, next }) {
  console.log("nah eh");

  if (!store.getters["auth/authenticated"]) {

    return next({
      name: "Login",
    });
  }

  return next();
}
