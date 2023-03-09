<template>
	<router-link
		tag="a"
		:disabled="isDisabled"
		:to="!isDisabled ? { name: 'worksDetails', params: { hash: eTo } } : {}"
		:class="[
			'ws-1-1',
			'wm-1-4',
			'wl-1-4',
			'wxl-1-4',
			'tilt-container',
			'button',
		]"
		@click="e_clickItem"
	>
		<div
			:class="[
				'item',
				{ tilt: !isDisabled },
				{ disabled: isDisabled },
				{ lock: isLock == 'true' || isLock == '1' },
			]"
			ref="tilt"
			data-scale="1.1"
		>
			<div class="m-thumb">
				<lazy-background
					v-if="eThumb"
					class="item-bg"
					:data-src="eThumb"
					:imageAddToLoadCallback="e_initTilt"
				/>
			</div>

			<div class="item-bg no-img" v-if="!eThumb"></div>

			<slot></slot>
		</div>
	</router-link>
</template>

<script>
import UniversalTilt from "universal-tilt.js";
import imageBgLazy from "@/layout/components/imageBgLazy.vue";

export default {
	name: "Tilt-Item",

	props: {
		eThumb: {
			type: String,
			required: false,
		},

		eTo: {
			type: String,
			required: false,
		},

		isDisabled: {
			type: Boolean,
			required: false,
			default: false,
		},

		isLock: {
			required: false,
			default: false,
		},
	},

	components: {
		"lazy-background": imageBgLazy,
	},

	data() {
		return {
			tiltLoaded: false,
		};
	},

	methods: {
		e_initTilt() {
			const elems = this.$refs.tilt;

			if (elems.length == 0 || this.tiltLoaded || this.isDisabled) return;

			UniversalTilt.init({
				elements: elems,
				settings: {
					speed: 620,
				},
				callbacks: {},
			});

			this.tiltLoaded = true;
		},

		//on click item
		e_clickItem(e) {
			if (this.isDisabled) {
				e.preventDefault();
				return;
			}
		},
	},

	destroy() {
		if (!this.tiltLoaded) return;

		const elems = this.$refs.tilt;
		elems.universalTilt.destroy();
	},
};
</script>

<style>
button.tilt-container,
.button.tilt-container {
	-webkit-appearance: none;
	appearance: normal;

	background-color: transparent !important;
	border: none !important;
	margin-bottom: 2em;
}

.item .button,
.item,
.p3d {
	transform-style: preserve-3d;
}

.item {
	display: block;
	min-height: 382px;

	margin-bottom: 12%;

	transform-origin: "50% 0";
	z-index: 10;
}

.item:not(.disabled) {
	cursor: pointer;
}

.item-bg {
	position: absolute;
	top: 0;
	left: 0;

	display: block;
	width: 100%;
	height: 100%;

	background-image: url(~@/assets/images/preloader.svg);

	background-position: center center;
	background-repeat: no-repeat;

	border-radius: 9px;
}

.item-bg.no-img {
	background-image: url(~@/assets/images/g.svg#i-warn-view);
	background-size: 40px;
}

.item-bg[data-status="loaded"] {
	background-size: cover;
}

.item .no-img.item-bg::after,
.item-bg::after {
	content: "";
	position: absolute;
	top: 0;
	left: 0;

	display: block;
	width: 100%;
	height: 100%;

	background-color: rgba(0, 0, 0, 0.65);
	border-radius: 9px;
}

.item .button,
.item .title,
.item .title span,
.item .category,
.item .title {
	-webkit-transition: all 1200ms cubic-bezier(0.71, 0, 0, 1);
	-moz-transition: all 1200ms cubic-bezier(0.71, 0, 0, 1);
	-o-transition: all 1200ms cubic-bezier(0.71, 0, 0, 1);
	transition: all 1200ms cubic-bezier(0.71, 0, 0, 1);

	-webkit-transition-timing-function: cubic-bezier(0.71, 0, 0, 1);
	-moz-transition-timing-function: cubic-bezier(0.71, 0, 0, 1);
	-o-transition-timing-function: cubic-bezier(0.71, 0, 0, 1);
	transition-timing-function: cubic-bezier(0.71, 0, 0, 1);
}

.item .category {
	position: absolute;
	top: calc(100% - 90%);
	left: 5%;

	font-size: 0.65rem;
	text-transform: uppercase;

	color: #fff;
}

.item .category > div {
	position: relative;
	display: inline-block;
	padding-right: 2px;
}

.item .category > div:not(:last-child)::after {
	content: " / ";
}

.item:not(.disabled):hover .category {
	left: -2%;
	transform: translateZ(40px);
}

.item .title {
	position: absolute;
	top: calc(100% - 85%);
	left: 2%;

	display: block;
	max-width: 95%;

	background-color: rgba(163, 161, 160, 0.2);

	font-family: var(--common-font);
	font-weight: 300;
	font-size: 2vmax;
	line-height: 2.5vmax;
	color: #3699c5;
	text-transform: uppercase;
	overflow-wrap: break-word;
	word-break: break-word;
	padding: 2%;
}

.item .button {
	position: absolute;

	right: 3%;
	bottom: 3%;

	display: block;
	min-width: 68px;
	height: 68px;

	padding: 8px;

	border: 1px solid #3699c5;
}

.item.disabled .button {
	text-transform: uppercase;
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
}

.item:not(.disabled):hover .button {
	transform: translateZ(65px);
}

.item:not(.disabled) .more.button::after,
.item:not(.disabled) .more.button::before {
	content: "";
	position: absolute;
	top: 50%;
	left: 50%;

	background-color: #3699c5;

	transform: translate(-50%, -50%) translateZ(5px);
	-webkit-transform: translate(-50%, -50%) translateZ(5px);
	-ms-transform: translate(-50%, -50%) translateZ(5px);
	-o-transform: translate(-50%, -50%) translateZ(5px);
	-moz-transform: translate(-50%, -50%) translateZ(5px);

	-webkit-transition-delay: 600ms;
	-moz-transition-delay: 600ms;
	-ms-transition-delay: 600ms;
	-o-transition-delay: 600ms;
	transition-delay: 600ms;

	-webkit-transition: all 480ms cubic-bezier(0.95, 0.05, 0.795, 0.035);
	-moz-transition: all 480ms cubic-bezier(0.95, 0.05, 0.795, 0.035);
	-o-transition: all 480ms cubic-bezier(0.95, 0.05, 0.795, 0.035);
	transition: all 480ms cubic-bezier(0.95, 0.05, 0.795, 0.035); /* easeInExpo */

	-webkit-transition-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);
	-moz-transition-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);
	-o-transition-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);
	transition-timing-function: cubic-bezier(
		0.95,
		0.05,
		0.795,
		0.035
	); /* easeInExpo */
}

.item:not(.disabled):hover .more.button::after,
.item:not(.disabled):hover .more.button::before {
	transform: translate(-50%, -50%) translateZ(-20px);
	-webkit-transform: translate(-50%, -50%) translateZ(-20px);
	-ms-transform: translate(-50%, -50%) translateZ(-20px);
	-o-transform: translate(-50%, -50%) translateZ(-20px);
	-moz-transform: translate(-50%, -50%) translateZ(-20px);
}

.item:not(.disabled) .more.button::after {
	width: 1px;
	height: 65%;
}

.item:not(.disabled) .more.button::before {
	width: 65%;
	height: 1px;
}

.item.disabled {
	cursor: not-allowed;
}

.item.disabled .item-bg::after {
	background-color: rgba(0, 0, 0, 0.9);
}

.item:not(.disabled):hover .title span {
	transform: translateZ(60px);
}

.item:not(.disabled):hover .title {
	left: -5%;
	transform: translateZ(45px);
}

@media (max-width: 768px) {
	/**/
	.item .title {
		/*
		font-size: 9vmin;
		line-height: 12vmin;
		*/
		font-size: 4.2vmin;
		line-height: 4.2vmin;
	}

	.item .button,
	.item .title,
	.item .title span,
	.item .category,
	.item .title {
		-webkit-transition: none;
		-moz-transition: none;
		-o-transition: none;
		transition: none;
	}

	.item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		border: 1px solid #2b2b2b;
		border-radius: 8px;

		min-height: inherit;
		padding: 2% 0;
	}

	.item-bg.no-img,
	.item-bg {
		position: relative;
		display: inline-block;
		width: 90px;
		height: 90px;

		margin-left: -20px;
		border: 1px solid #2b2b2b;
		background-color: #383838;
	}

	.item .m-thumb {
		display: flex;
		height: 100%;
		flex-direction: column;
		align-items: center;
		align-content: center;
	}

	.item .m-content {
		width: 100%;
		margin-left: 10px;
	}

	.item .title,
	.item .category {
		position: relative;
		top: auto;
		left: auto;
	}

	.item .button {
		position: relative;
		right: auto;
		bottom: auto;
		margin-top: 5%;
	}

	.item.disabled .button {
		border-color: transparent;
		padding: 0;
		display: block;
		align-content: inherit;
		align-items: inherit;
		height: auto;
		font-size: 2.9vmin !important;
	}

	.item .more.button {
		min-width: 38px;
		height: 38px;
		float: right;
		margin-right: 15px;
	}

	.item .no-img.item-bg::after,
	.item-bg::after,
	.item.disabled .item-bg::after {
		background-color: transparent;
	}
}

/*
@media (min-width: 1220px) {
	.item {
		min-height: 540px;
	}
}
*/
</style>
