<template>
	<div>
		<div class="quiz-container mt-12 mx-auto p-12 w-9/12 bg-gray-200">
			<div>
				<p class="text-center text-lg">
					Question {{ currentQuestion + 1 }}
					{{ questions[currentQuestion].question }}
				</p>

				<div class="grid grid-cols-2">
					<div>
						<Quiz-Option
							v-for="option in options"
							:option="option"
							:qid="questions[currentQuestion].id"
							:key="option.id"
						/>
					</div>
					<Game-Timer class="m-auto" />
				</div>

				<button @click="renderQuestion">Next</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

import QuizOption from "@/components/GameOption.vue";
import GameTimer from "@/components/GameTimer.vue";

export default {
	name: "Game",
	data() {
		return {
			questions: [],
			options: [],
			currentQuestion: 0,
			currentOptions: []
		};
	},
	components: {
		QuizOption,
		GameTimer
	},
	methods: {
		gameRender() {
			this.getQuestions();
		},

		getQuestions() {
			axios
				.get("/api/questions")
				.then(res => {
					this.questions = res.data;
					this.getOptions(this.questions[this.currentQuestion].id);
				})
				.catch(err => console.log(err));
		},

		getOptions(id) {
			axios.get(`api/options/${id}`).then(res => {
				this.options = res.data;
			});
		},

		renderQuestion() {
			this.currentQuestion++;
			this.getOptions(this.questions[this.currentQuestion].id);
		}
	},
	beforeMount() {
		this.gameRender();
	}
};
</script>

<style>
</style>