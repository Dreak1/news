<template>
	<view>
		<rich-text :nodes="body"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				body : ""
			}
		},
		methods: {
			
		},
		onLoad(option) {
			console.log(option.body)
			this.body = option.body
		}
	}
</script>

<style>

</style>
