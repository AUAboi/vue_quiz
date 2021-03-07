<template>
	<div>
		<Loader v-if="loading" />
		<form action="#" @submit.prevent="submit">
			<div>
				<label for="email">Email address</label>
				<input type="text" name="email" id="email" v-model="form.email" />
			</div>
			<div>
				<label for="password">Password</label>
				<input
					type="text"
					name="password"
					id="password"
					v-model="form.password"
				/>
			</div>
			<div>
				<button type="submit">
					Sign in
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapActions } from "vuex";

import Loader from "@/components/UI/Loader";

import guest from "../../router/middleware/guest";

export default {
	middleware: [guest],
	name: "Login",
	components: { Loader },
	data() {
		return {
			form: {
				email: "",
				password: ""
			},
			loading: false
		};
	},

	methods: {
		...mapActions({
			//this gets signIn action from namespace auth
			signIn: "auth/signIn"
		}),

		async submit() {
			//send action signIn form credentials
			this.loading = true;
			await this.signIn(this.form);
			//Redirects to admin
			this.loading = false;
			this.$router.replace({ name: "Admin" });
		}
	}
};
</script>

<style scoped>
input {
	border: 1px black solid;
	margin: 0.3rem 1rem;
}
</style>