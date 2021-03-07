<template>
	<div>
		<table class="min-w-full table-auto">
			<thead class="justify-between">
				<tr class="bg-gray-800">
					<th class="px-16 py-2">
						<span class="text-gray-300">Id</span>
					</th>
					<th class="px-16 py-2">
						<span class="text-gray-300">Question</span>
					</th>
					<th class="px-16 py-2">
						<span class="text-gray-300">Option</span>
					</th>
					<th class="px-16 py-2">
						<span class="text-gray-300">Option</span>
					</th>

					<th class="px-16 py-2">
						<span class="text-gray-300">Option</span>
					</th>

					<th class="px-16 py-2">
						<span class="text-gray-300">Action</span>
					</th>
				</tr>
			</thead>
			<tbody class="bg-gray-200">
				<tr
					v-for="question in questions"
					:key="question.id"
					class="bg-white border-4 border-gray-200"
				>
					<td class="px-16 py-2 flex flex-row items-center">
						<span class="text-center ml-2 font-semibold">{{
							question.id
						}}</span>
					</td>
					<td>
						<span class="text-center ml-2 font-semibold">{{
							question.question
						}}</span>
					</td>
					<td
						v-for="option in question.options"
						:key="option.id"
						class="px-16 py-2"
						:class="option.is_correct == 1 ? 'bg-green-200' : 'bg-white'"
					>
						<span>{{ option.option }}</span>
					</td>

					<td class="px-16 py-2">
						<button
							@click="deleteEntry(question.id)"
							class="bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black "
						>
							DELETE
						</button>
					</td>
				</tr>
			</tbody>
		</table>
		<button @click="getQuestions">GET</button>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "QuestionTable",
	data() {
		return {
			questions: []
		};
	},
	methods: {
		getQuestions() {
			axios.get("api/questions/show").then(response => {
				this.questions = response.data;
			});
		},
		async deleteEntry(id) {
			await axios.delete(`api/questions/${id}`);
			this.getQuestions();
		}
	},
	created() {
		this.getQuestions();
	}
};
</script>

<style>
</style>