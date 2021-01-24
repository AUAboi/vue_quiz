<template>
	<div>
		<p class="text-8xl">
			{{ timer }}
		</p>
	</div>
</template>

<script>
export default {
	name: "GameTimer",
	data() {
		return {
			timer: 10
		};
	},
	methods: {
		countDown() {
			if (this.timer > 0) {
				setTimeout(() => {
					this.timer--;
					this.countDown();
				}, 1000);
			}
		}
	},
	created() {
		this.countDown();
	}
};
</script>

<style>
</style>