<template>
	<div>
		<Question-Form />
		<Question-Table />
	</div>
</template>

<script>
import QuestionForm from "@/components/admin/QuestionForm";
import QuestionTable from "@/components/admin/QuestionTable";

import auth from "../../router/middleware/auth";

export default {
	middleware: [auth],
	name: "Admin",
	components: {
		QuestionForm,
		QuestionTable
	},
	data() {
		return {
			form: {
				question: "Hello",
				option: [
					{
						name: "Hey",
						is_correct: true
					},
					{
						name: "Yes",
						is_correct: false
					},
					{
						name: "????",
						is_correct: false
					}
				]
			}
		};
	}
};
</script>

<style>
</style>