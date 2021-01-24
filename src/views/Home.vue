<template>
	<div>
		<section class="text-center">
			<div class="mt-36 mb-24 relative">
				<h1 class="text-9xl">QUIZ</h1>
				<h2 class="text-5xl ml-24">Game</h2>
			</div>
			<div class="text-left text-5xl text-gray-700 flex flex-col">
				<router-link class="m-3" to="/quiz-game">Start Quiz</router-link>
				<router-link class="m-3" to="/rules">Rules</router-link>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: "Home"
};
</script>

<style lang="scss" scoped>
</style>
