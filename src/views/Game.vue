<template>
	<div>
		<Modal :show="showModal" :score="playerScore" />

		<div
			class="quiz-container mt-12 mx-auto p-12 w-9/12 bg-gray-200 text-white rounded-lg"
		>
			<div>
				<Game-Score :score="playerScore" :newScore="newScore" :i="i" />
				<p v-if="questions[currentQuestion]" class="mx-2 text-lg p-3">
					Question {{ currentQuestion + 1 }}
					{{ questions[currentQuestion].question }}
				</p>

				<div class="grid grid-cols-2">
					<div>
						<Game-Option
							v-for="option in options"
							:option="option"
							:qid="questions[currentQuestion].id"
							:isDisabled="optionDisabled"
							:key="option.id"
							@correct="processOption"
						/>
					</div>
					<div class="m-auto">
						<p class="text-9xl">{{ timer }}</p>
					</div>
				</div>

				<button
					:disabled="disableNext"
					class="mx-2 p-3 text-xl"
					:class="!timer ? 'block' : 'hidden'"
					@click="renderQuestion"
				>
					Next
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

import GameOption from "@/components/GameOption";
import GameScore from "@/components/GameScore";

import Modal from "@/components/UI/Modal";

export default {
	name: "Game",
	data() {
		return {
			questions: [],
			options: [],
			currentQuestion: 0,
			timer: 10,
			timeout: Function,
			playerScore: 0,
			newScore: 0,
			i: 0,
			showModal: false,
			disableNext: true,
			optionDisabled: false
		};
	},
	components: {
		GameOption,
		GameScore,
		Modal
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
			if (this.disableNext) {
				return;
			}
			this.disableNext = true;

			clearTimeout(this.timeout);
			if (this.currentQuestion < this.questions.length - 1) {
				this.currentQuestion++;
				this.getOptions(this.questions[this.currentQuestion].id);
				this.optionDisabled=false
			} else {
				this.showModal = true;
			}
		},

		processOption(correct) {
			this.optionDisabled = true;

			this.disableNext = false;
			this.timer = 0;
			clearTimeout(this.timeout);
			this.i++;
			if (correct) {
				this.playerScore++;
				this.newScore = 1;
			} else {
				this.newScore = 0;
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