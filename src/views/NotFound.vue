<template>
	<div class="mx-auto mt-36 w-2/5">
		<h1 class="text-5xl">Oops</h1>
		<p class="text-2xl">Looks like this page doesnt exists</p>
	</div>
</template>

<script>
import guest from "../router/middleware/guest";

export default {
	name: "NotFound",
	middleware: [guest]
};
</script>

<style>
</style>