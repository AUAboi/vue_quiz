<template>
	<div class="p-3 m-2">
		<button @click="checkOption" class="text-lg">{{ option.option }}</button>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "GameOption",
	props: { option: Object, qid: Number },
	methods: {
		checkOption() {
			axios.post(`/api/options/${this.qid}/${this.option.id}`).then(res => {
				console.log(res.data);
			});
		}
	}
};
</script>

<style>
</style>