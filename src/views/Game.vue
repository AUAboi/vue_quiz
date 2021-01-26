<template>
	<div>
		<div
			class="quiz-container mt-12 mx-auto p-12 w-9/12 bg-gray-200 text-white rounded-lg"
		>
			<div>
				<Game-Score :score="playerScore" />
				<!-- <p v-if="questions[currentQuestion]" class="text-center text-lg">
					Question {{ currentQuestion + 1 }}
					{{ questions[currentQuestion].question }}
				</p> -->
				<p class=" mx-2 p-3">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
					aperiam iusto aut laudantium labore adipisci.
				</p>

				<div class="grid grid-cols-2">
					<div>
						<Game-Option
							v-for="option in options"
							:option="option"
							:qid="questions[currentQuestion].id"
							:isDisabled="!timer"
							:key="option.id"
							@correct="processOption(correct)"
						/>
					</div>
					<div class="m-auto">
						<p class="text-9xl">{{ timer }}</p>
					</div>
				</div>

				<button class="hidden" @click="renderQuestion">Next</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

import GameOption from "@/components/GameOption";
import GameScore from "@/components/GameScore";

export default {
	name: "Game",
	data() {
		return {
			questions: [],
			options: [],
			currentQuestion: 0,
			timer: 10,
			timeout: Function,
			playerScore: 0
		};
	},
	components: {
		GameOption,
		GameScore
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
					this.countDown();
				})
				.catch(err => console.log(err));
		},

		getOptions(id) {
			axios.get(`api/options/${id}`).then(res => {
				this.options = res.data;
				this.timer = 10;
				this.countDown();
			});
		},

		countDown() {
			if (this.timer > 0) {
				this.timeout = setTimeout(() => {
					this.timer--;
					clearTimeout(this.timeout);
					this.countDown();
				}, 1000);
			}
		},

		renderQuestion() {
			clearTimeout(this.timeout);
			if (this.currentQuestion < 10) {
				this.currentQuestion++;
				this.getOptions(this.questions[this.currentQuestion].id);
			}
		},

		processOption(correct) {
			this.timer = 0;
			clearTimeout(this.timeout);
			if (correct) {
				this.playerScore++;
			}
		}
	},
	beforeMount() {
		this.gameRender();
	}
};
</script>

<style scoped>
.quiz-container {
	background-color: #1e606e;
}
</style>