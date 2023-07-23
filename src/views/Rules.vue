<template>
	<div class="mainCon">
		<h1 class="heading">QUIZ GAME RULES</h1>
		<div class="line"></div>
		<div class="mx-2">
			<p class="text-center m-3">The rules of the quiz app are:</p>
			<p> 1. You will be presented with multiple questions. <br>
				2. Each question will have at least 3 options, or more. <br>
				3. Each question have at least 1 correct answers, or more. <br>
				4. You will have 10 seconds to answer each question. After that your answer will not be submitted. <br>
				5. Each question is worth 1 point.
			</p>
		</div>
		<div class="line"></div>
	</div>
</template>

<script>
export default {
	name: "About"
};
</script>

<style lang="scss" scoped>
.heading {
	font-size: 25px;
	text-align: center;
	margin:auto;
}
.line {
	width: 100%;
	height: 1px;
	background: black;
	margin: 10px;
}
.mainCon{
	max-width: 500px;
	margin: 30px auto;
}
</style>