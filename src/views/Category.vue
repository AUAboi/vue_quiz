<template>
	<div>
		<h1></h1>
		<section class="grid text-center justify-items-center gap-10">
			<router-link :to="{ name: 'Game', params: { category: '20' } }">
				<img
					src="https://i.picsum.photos/id/785/200/200.jpg?hmac=vvHnS4TgoGTRqwI2soaIhbOxE7Q-hhoZTTDe75h_fz4"
				/>
				<h3>Categroy Name 1</h3>
			</router-link>
			<div>
				<img
					src="https://i.picsum.photos/id/785/200/200.jpg?hmac=vvHnS4TgoGTRqwI2soaIhbOxE7Q-hhoZTTDe75h_fz4"
				/>
				<h3>Categroy Name 2</h3>
			</div>
			<div>
				<img
					src="https://i.picsum.photos/id/785/200/200.jpg?hmac=vvHnS4TgoGTRqwI2soaIhbOxE7Q-hhoZTTDe75h_fz4"
				/>
				<h3>Categroy Name 3</h3>
			</div>
		</section>
	</div>
</template>
<script>
export default {
	name: "Category"
};
</script>

<style lang="scss" scoped>
</style>