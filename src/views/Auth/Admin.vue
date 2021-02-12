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
	}
};
</script>

<style>
</style>