<template>
	<div>
		<div class="home-scene js-fadeout">
			<div class="home-content">
				<div class="home-scene-content">
					<imageBgLazy
						class="logo-float"
						:data-src="$toWebp('/src/assets/img/mid-ground-logo-opt.png')"
						:imageAddToLoadCallback="eAddPreloadImage"
						:imageSuccessCallback="ePreloaderSucecss"
					/>

					<div class="scroll-down">
						<span></span>
						{{ $t("scrollDown") }}
					</div>
				</div>
			</div>

			<div class="home-scene-layers">
				<imageBgLazy
					class="home-scene-img home-scene-bg"
					:data-src="$toWebp('/src/assets/img/sky.jpg')"
					:imageAddToLoadCallback="eAddPreloadImage"
					:imageSuccessCallback="ePreloaderSucecss"
				/>

				<imageBgLazy
					class="home-scene-img home-scene-mid-ground"
					:data-src="$toWebp('/src/assets/img/mid-ground-opt.png')"
					:imageAddToLoadCallback="eAddPreloadImage"
					:imageSuccessCallback="ePreloaderSucecss"
					v-html="fogDom"
				/>

				<imageBgLazy
					class="home-scene-img home-scene-mountains"
					:data-src="$toWebp('/src/assets/img/mountains.png')"
					:imageAddToLoadCallback="eAddPreloadImage"
					:imageSuccessCallback="ePreloaderSucecss"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import imageBgLazy from "@/layout/components/imageBgLazy.vue";
import gsap from "gsap";

export default {
	name: "Home-Scene",

	props: {
		isScrolling: {
			type: Number,
			required: false,
			default: 0,
		},

		isResize: {
			type: Number,
			requiere: false,
			default: 0,
		},

		isMobile: {
			type: Boolean,
			requiere: false,
			default: false,
		},
	},

	components: {
		imageBgLazy,
	},

	data() {
		return {
			//loaded composition
			isLoaded: false,
			countFilesToLoad: 0,
			countFilesLoaded: 0,

			//scroller value
			scrollYPos: 0,

			//compos scale
			HSFB: 0,
			HSFS: 0,

			timer: null,
			ticking: false,
		};
	},

	computed: {
		fogDom() {
			return `<div class="fog"></div>`;
		},
	},

	watch: {
		isScrolling(e) {
			this.scrollYPos = e;

			this.m_animateScene();
		},

		isResize(e) {
			this.fn_resize();
		},
	},

	methods: {
		eAddPreloadImage() {
			this.countFilesToLoad++;
		},

		ePreloaderSucecss() {
			this.countFilesLoaded++;

			if (this.countFilesToLoad !== this.countFilesLoaded) return;

			this.isLoaded = true;

			document.querySelector("html").classList.add("loaded");

			if (!/(ie|MSIE)/gim.test(navigator.userAgent))
				document.querySelector(".fog").classList.add("movement");

			//set defaults
			this.fn_resize();
		},

		//event resize + definicion de variables globales
		fn_resize() {
			if (!this.isLoaded) return;

			const sceneGap = document.querySelector(".home-scene-gap").clientHeight;

			this.HSFB = sceneGap / 5;
			this.HSFS = sceneGap - this.HSFB * 3;
		},

		//animate scene
		m_animateScene() {
			if (!this.isLoaded) return;

			if (!this.ticking)
				window.requestAnimationFrame(() => {
					let self = this;

					// DO PARALLAX STUFF WHEN BLACKOUT INACTIVE
					const zoomBGNumeric = 1 + this.scrollYPos / 13000;
					const zoomMidGroundNumeric = 1 + this.scrollYPos / 5000;
					//const zoomMidMountainsNumeric = 1 + this.scrollYPos / 3000;
					const zoomMountainsNumeric = 1 + this.scrollYPos / 1000;
					const homeSceneFadeOut =
						1 + (this.HSFS - this.scrollYPos) / this.HSFB;

					gsap.to(".home-scene-bg", 0.6, {
						scale: zoomBGNumeric,
					});

					gsap.to(".home-scene-mid-ground", 0.6, {
						scale: zoomMidGroundNumeric,
					});

					gsap.to(".home-scene-mountains", 0.6, {
						scale: zoomMountainsNumeric,
					});

					//fadeout
					let opacity_value =
						Math.sign(homeSceneFadeOut) < 0 ? 0 : homeSceneFadeOut;
					opacity_value =
						Math.sign(homeSceneFadeOut) > 1 ? 1 : homeSceneFadeOut;

					gsap.to(".js-fadeout", 0.5, {
						opacity: opacity_value,
					});

					this.ticking = false;
				});

			this.ticking = true;
		},
	},

	beforeDestroy() {
		this.timer = null;
		this.countFilesToLoad = 0;
		this.countFilesLoaded = 0;
		this.isLoaded = false;

		document.querySelector("html").classList.remove("loaded");
	},
};
</script>

<style scoped>
.home-scene-layers {
	overflow: hidden;
	-webkit-transform: scale(1.15);
	-moz-transform: scale(1.15);
	-ms-transform: scale(1.15);
	-o-transform: scale(1.15);
	transform: scale(1.15);
}

.loaded .home-scene-layers {
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	-ms-transform: scale(1);
	-o-transform: scale(1);
	transform: scale(1);
}

.home-header-gap {
	height: 768px;
}

@media only screen and (max-width: 700px) {
	.home-header-gap {
		display: none;
	}
}

.fixNav .home-scene {
	position: absolute;
}

.fixNav .home-scene .logo-float {
	opacity: 0;
}

.home-scene {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	height: 100%;
	will-change: opacity;
}

.home-scene .home-scene-layers {
	-webkit-transition: -webkit-transform 1.35s cubic-bezier(0.7, 0.3, 0, 1) 0.1s;
	-moz-transition: -moz-transform 1.35s cubic-bezier(0.7, 0.3, 0, 1) 0.1s;
	transition: transform 1.35s cubic-bezier(0.7, 0.3, 0, 1) 0.1s;
	will-change: transform;
}

.home-scene-content {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	-webkit-transition: 0.22s linear;
	transition: 0.22s linear;
	pointer-events: none;
}

@media only screen and (max-width: 700px) {
	.home-scene {
		height: 100vh;
		width: 100%;
	}

	.home-scene-content {
		position: relative;
		height: 100vh;
		margin-bottom: 80px;
	}
}

.home-scene-layers,
.home-scene-img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.home-scene-img {
	will-change: transform;
}

.all-home-scene,
.home-scene-bg,
.home-scene-mid-ground,
.home-scene-mid-mountains,
.home-scene-mountains {
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
}

.home-content {
	width: 100%;
	height: 100%;
	z-index: 10;
	position: relative;
	overflow: hidden;
}

.logo-float {
	position: fixed;
	top: 50%;
	left: 50%;

	display: block;
	width: 124px;
	height: 121px;

	transform: translate(-50%, -50%);
	-webkit-transform: translate(-50%, -50%);

	opacity: 1;

	-webkit-animation: slide-top-logo 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
		infinite alternate both;
	animation: slide-top-logo 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite
		alternate both;
}

.scroll-down {
	position: absolute;
	left: 50%;
	bottom: 2%;

	display: block;
	font-size: 0.7rem;
	text-transform: uppercase;

	transform: translateX(-50%);
	-webkit-transform: translateX(-50%);
	-moz-transform: translateX(-50%);
}
</style>
