<template>
	<div class="wrapper">
		<router-view
			v-bind="{
				isScrolling: isScrolling,
				isMobile: isMobile,
				isResize: isResize,
			}"
		></router-view>
	</div>
</template>

<script>
export default {
	name: "pages-layout",

	props: {
		isScrolling: {
			type: Number,
			required: false,
			default: 0,
		},

		isMobile: {
			type: Boolean,
			requiere: false,
			default: false,
		},

		isResize: {
			type: Number,
			requiere: false,
			default: 0,
		},
	},
};
</script>
