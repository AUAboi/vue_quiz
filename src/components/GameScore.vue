<template>
	<div>
		<p class="text-3xl my-3 mx-2 p-3">
			<span class="temp-score" :class="show ? 'score-show' : ''"
				>+{{ newScore }}</span
			>
			{{ score }} points
		</p>
	</div>
</template>

<script>
export default {
	name: "GameScore",
	props: {
		score: Number,
		newScore: Number,
		//i to check increments in current question so we can watch something
		i: Number
	},
	data() {
		return {
			show: false
		};
	},
	watch: {
		i() {
			this.show = true;
			setTimeout(() => {
				this.show = false;
			}, 750);
		}
	}
};
</script>

<style scoped>
.temp-score {
	transition: all 250ms ease-out;
	opacity: 0;
}
.score-show {
	opacity: 1 !important;
}
</style>