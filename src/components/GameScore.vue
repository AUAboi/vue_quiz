<template>
	<div>
		<p class="text-3xl my-3 mx-2 p-3">{{ score }} points</p>
	</div>
</template>

<script>
export default {
	name: "GameScore",
	props: {
		score: Number
	}
};
</script>

<style>
</style>