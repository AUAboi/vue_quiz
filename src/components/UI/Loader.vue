<template>
	<div class="popup">
		<img src="../../assets/Vanilla-1s-280px.png" />
	</div>
</template>

<script>
export default {
	name: "Loader"
};
</script>

<style>
.popup {
	position: fixed;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
</style>