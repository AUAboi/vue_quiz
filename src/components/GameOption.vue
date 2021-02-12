<template>
	<div class=" m-2 border-black border-2">
		<button
			:disabled="isDisabled || disabled"
			@click="checkOption"
			class="text-lg w-full text-left sm:p-3 p-2"
			:class="selected ? 'selected' : ''"
		>
			{{ option.option }}
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
			this.disabled = true;
			if (!this.isDisabled) {
				this.selected = true;
			}
			axios.post(`/api/options/${this.qid}/${this.option.id}`).then(res => {
				if (res.data != 0 && !this.isDisabled) {
					this.$emit("correct", true);
				} else {
					this.$emit("correct", false);
				}
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