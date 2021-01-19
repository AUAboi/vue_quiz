<template>
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
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: "Login",

	data() {
		return {
			form: {
				email: "",
				password: ""
			}
		};
	},

	methods: {
		...mapActions({
			signIn: "auth/signIn"
		}),

		async submit() {
			await this.signIn(this.form);
			//Redirects to admin
			this.$router.replace({ name: "admin" });
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