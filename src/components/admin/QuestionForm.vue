<template>
	<div>
		<div>
			<h1>Question</h1>
		</div>
		<form @submit.prevent="submit" class="form">
			<input
				type="text"
				class="border border-black my-3"
				placeholder="Question"
				v-model="form.question"
			/>
			<div v-for="(op, i) in form.option" :key="i">
				<input
					type="text"
					class="form-input border border-black"
					v-model="op.name"
				/>
				<input type="checkbox" class="form-checkbox" v-model="op.is_correct" />
				<p>{{ op.is_correct }}</p>
			</div>
			<button type="submit">Submit</button>
		</form>
	</div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
	name: "QuestionForm",
	data() {
		return {
			form: {
				question: "",
				option: [
					{
						name: "",
						is_correct: false
					},
					{
						name: "",
						is_correct: false
					},
					{
						name: "",
						is_correct: false
					}
				]
			}
		};
	},
	methods: {
		...mapActions({
			snack: "snack/snack"
		}),
		submit() {
			axios
				.post("api/questions", this.form)
				.then(res => {
					this.form.question = "";
					this.form.option = [
						{
							name: "",
							is_correct: false
						},
						{
							name: "",
							is_correct: false
						},
						{
							name: "",
							is_correct: false
						}
					];

					this.snack({
						text: res.data,
						delay: 1000
					});
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style>
</style>