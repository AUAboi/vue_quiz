<template>
	<div class=" m-2 border-black border-2">
		<button
			:disabled="isDisabled || disabled"
			@click="checkOption"
			class="text-lg w-full text-left p-3"
			:class="selected ? 'selected' : ''"
		>
			<!-- {{ option.option }} -->

			Option A
		</button>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "GameOption",
	props: {
		option: Object,
		qid: Number,
		isDisabled: Boolean
	},
	data() {
		return {
			selected: false,
			disabled: false
		};
	},
	methods: {
		checkOption() {
			this.disabled = false;
			this.selected = true;
			axios.post(`/api/options/${this.qid}/${this.option.id}`).then(res => {
				this.$emit("correct", res.data);
			});
		}
	}
};
</script>

<style scoped>
.selected {
	background-color: #173940;
}
</style>