<template>
	<div id="app">
		<Snack />
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<template v-if="!authenticated">
				<router-link to="/login">Sign in</router-link> |
			</template>
			<template v-else>
				<p>{{ user.name }}</p>
				<a href="#" @click.prevent="signOut">Sign out</a>
			</template>
			<button @click="snackBar">Press</button>
		</div>
		<router-view />
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

import Snack from "./components/UI/Snack";

export default {
	name: "App",
	components: {
		Snack
	},
	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			user: "auth/user"
		})
	},
	methods: {
		...mapActions({
			signOutAction: "auth/signOut",
			snack: "snack/snack"
		}),

		snackBar() {
			this.snack({
				text: "This is text",
				delay: 2000
			});
		},
		async signOut() {
			await this.signOutAction();

			this.$router.replace({ name: "Home" });
		}
	}
};
</script>
<style>
#nav {
	text-align: center;
}
</style>
