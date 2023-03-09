<template>
	<div class="g p3d">
		<tmplTiltItem
			v-for="itm in displayResult"
			:key="itm.hash"
			v-bind="{
				eThumb: itm.thumb,
				isDisabled: itm.isDisabled,
				isLock: itm.isLock,
				eTo: itm.hash,
			}"
		>
			<div class="m-content">
				<div class="category" v-if="itm.category_rel">
					<div v-for="v in itm.category_rel" :key="v.hash">{{ v.title }}</div>
				</div>

				<div class="title">
					<span>{{ itm.title }}</span>
				</div>
				<div :class="['button', { more: !itm.isDisabled }]">
					<span v-if="itm.isDisabled">{{ $t("buttons.comingSoon") }}</span>
				</div>
			</div>
		</tmplTiltItem>
	</div>
</template>

<script>
import tmplTiltItem from "@/layout/components/Tilt-Item.vue";

export default {
	name: "Home-Work-Grid",

	props: {
		aItems: {
			type: Array,
			required: false,
		},
	},

	components: {
		tmplTiltItem,
	},

	computed: {
		displayResult() {
			return this.aItems;
		},
	},
};
</script>

<style scoped>
.p3d {
	transform-style: preserve-3d;
}
</style>
