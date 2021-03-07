<template>
	<div id="app">
		<Snack />
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<template v-if="!authenticated">
				<router-link to="/login">Sign in</router-link>
			</template>
			<template v-else>
				<router-link to="/admin">{{ user.name }}</router-link> |
				<a class="cursor-pointer" @click.prevent="signOut">Sign out</a>
			</template>
		</div>
		<router-view />
		<footer class="fixed bottom-0">
			&copy; Ahsan_AUA
			<a class="text-blue-500" href="https://auaboi.github.io/auaahsan/dist/"
				>Portfolio</a
			>
		</footer>
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
		},
		showModal(score) {
			this.score = score;
			this.modalDisplay = true;
		}
	}
};
</script>
<style>
body {
	background: #c7d5c3;
}
#nav {
	text-align: center;
}
</style>
