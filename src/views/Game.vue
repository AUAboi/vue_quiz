<template>
	<div>
		<p>
			{{ questions[this.currentQuestionNumber].question }}
		</p>
		<div>
			<button v-for="options in currentOptions[0]" :key="options">
				{{ options }}
			</button>
		</div>
		<button @click="currentQuestionNumber++">Next</button>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "Game",
	data() {
		return {
			currentQuestionNumber: 1,
			currentOptions: [],
			questions: []
		};
	},
	methods: {
		getQuestions() {
			axios({
				method: "get",
				url: `https://opentdb.com/api.php?amount=10&category=${this.$route.params.category}&difficulty=easy&type=multiple`
			})
				.then(res => {
					let result = res.data["results"];
					for (let i in result) {
						this.questions.push(result[i]);
					}
				})
				.catch(err => console.log(err));
		}
	},
	beforeMount() {
		this.getQuestions();
	},
	watch: {
		currentQuestionNumber() {
			this.currentOptions = [];
			this.currentOptions.push(
				this.questions[this.currentQuestionNumber].incorrect_answers.concat(
					this.questions[this.currentQuestionNumber].correct_answer
				)
			);
			console.log(this.currentOptions[0]);
		}
	}
};
</script>

<style>
</style>