<template>
	<header class="w-1-1" id="top">
		<!--//header content//-->
		<div class="w-1-1 mt-a">
			<nav class="flx@fd-r@jc-se">
				<!--//left//-->
				<div class="fg-8 hs">
					<div class="flx@jc-fs@ai-c@ac-c nav-l">
						<!--// icono home //-->
						<router-link
							:to="{ name: 'home', params: { scrollTo: 'top' } }"
							data-action="{'sctollTo':'top'}"
							class="no logo mr-4"
						>
							<span @click="toAnchor('top')">
								<img
									src="~@/assets/images/logo-small.png"
									class="menu-logo"
									:alt="`pageTitle logotype`"
								/>
							</span>
						</router-link>

						<div class="mr-4">
							<span
								><router-link :to="{ name: 'works' }">
									{{ $t("pages.worksTitlePage") }}</router-link
								></span
							>
						</div>
					</div>
				</div>

				<!--//mobile center//-->
				<div class="flx@ai-c@ac-c@jc-c s-fg-1 hl">
					<router-link :to="{ name: 'home' }" class="no logo">
						<span>
							<img
								src="~@/assets/images/logo-small.png"
								class="menu-logo"
								:alt="`pageTitle logotype`"
							/>
						</span>
					</router-link>
				</div>
				<div class="flx@ai-c@ac-c@jc-c s-fg-1 hl">
					<div class="no logo fr">
						<span @click="e_mobMenuHandler">
							<div :class="['m', 'm-3dx', { 'is-active': isOpenMenu }]">
								<div class="m-box">
									<div class="m-inner"></div>
								</div>
							</div>
						</span>
					</div>
				</div>

				<!--//right//-->
				<div class="fg-2 hs">
					<div class="flx@jc-fe nav-r">
						<span
							><router-link
								:to="{ name: 'home', params: { scrollTo: 'contact' } }"
								class="no"
							>
								<span @click="toAnchor('contact')">{{
									$t("pages.contactTitlePage")
								}}</span></router-link
							></span
						>
					</div>
				</div>
			</nav>
		</div>

		<!--//mob menu container//-->
		<div :class="['mob-menu-container', { open: isMobile && isOpenMenu }]">
			<div class="flx@ccc h-100">
				<transition name="show-menu">
					<div class="nav-mob" v-if="isMobile && isOpenMenu">
						<div
							class="flx@fd-c@ai-c@ac-c"
							v-from-source="{ dom: '.nav-l span a' }"
						></div>
						<div
							class="flx@fd-c@ai-c@ac-c"
							v-from-source="{ dom: '.nav-r span a' }"
						></div>
					</div>
				</transition>
			</div>
		</div>
	</header>
</template>

<script>
import cfg from "@/config.js";

export default {
	name: "Header",

	props: {
		isScrolling: {
			type: Number,
			required: false,
			default: 0,
		},

		isMobile: {
			type: Boolean,
			required: false,
			default: false,
		},

		isHome: {
			type: Boolean,
			required: false,
			default: false,
		},
	},

	data() {
		return {
			pageTitle: cfg.pageTitle,
			isOpenMenu: false,
			currentYScrollPos: 0,
		};
	},

	watch: {
		//cada cambio de url hacemos scroll up
		$route(/*to, from*/) {
			if (this.currentYScrollPos !== 0) this.currentYScrollPos = 0;

			window.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth",
			});
		},

		isScrolling(e) {
			this.currentYScrollPos = e;

			let ifHome = this.isHome ? 1200 : 20;

			if (e && e >= ifHome && !this.isOpenMenu) {
				document.querySelector("html").classList.add("fixNav");
			} else {
				document.querySelector("html").classList.remove("fixNav");
			}
		},
	},

	methods: {
		toAnchor(anchor) {
			const posAnchor = document.querySelector("#" + anchor).offsetTop;

			window.scroll({
				top: posAnchor,
				behavior: "smooth",
			});
		},

		e_mobMenuHandler() {
			this.isOpenMenu = !this.isOpenMenu;

			if (this.isOpenMenu) {
				document.querySelector("html").classList.add("fixScrol");
			} else {
				document.querySelector("html").classList.remove("fixScrol");
			}
		},
	},
};
</script>

<style scoped>
header {
	position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	z-index: 100;
}

svg.logo {
	position: absolute;
	top: 50%;
	left: 50%;

	display: block;
	width: 49%;
	height: 49%;

	margin-top: -2%;

	transform: translate(-50%, -50%);
	-webkit-transform: translate(-50%, -50%);
}

nav {
	-webkit-transition: 250ms all 0s ease-in-out, 250ms background 0s ease-in-out;
	transition: 250ms all 0s ease-in-out, 250ms background 0s ease-in-out;

	padding: 26px 5% 0 5%;
}

nav img.menu-logo {
	display: inline-block;
	width: 19px;
}

nav a {
	position: relative;
	font-size: 14px;
	vertical-align: bottom;
	color: #fff;
	cursor: pointer;
}

nav a:hover {
	color: #fff;
}

nav a::after {
	bottom: -5px;
	opacity: 1;

	-webkit-animation-duration: 120ms;
	animation-duration: 120ms;

	-webkit-animation-name: slidein;
	animation-name: slidein;

	-webkit-animation-direction: forwards;
	animation-direction: forwards;
}

nav a:hover::after,
nav a.active::after {
	content: "";
	position: absolute;
	width: 100%;

	left: 0;

	display: block;
	width: 100%;
	height: 2px;

	background-color: #35a3d4;
}

/*logo*/
nav a.no.active::after,
nav a.no:hover::after {
	content: "";
	opacity: 0;
	bottom: 0;

	-webkit-transition-property: none !important;
	transition-property: none !important;

	-webkit-transform: none !important;
	transform: none !important;

	-webkit-animation: none !important;
	animation: none !important;
}

.fixNav nav {
	position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	background-color: rgba(127, 130, 133, 0.55);
	padding: 10px 5%;
	z-index: 1;
}

/* menu */
.m {
	font: inherit;
	display: inline-block;
	overflow: visible;
	cursor: pointer;
	margin: 0;
	padding: 4px 0;
	transition-timing-function: linear;
	transition-duration: 0.15s;
	transition-property: opacity, filter;
	text-transform: none;
	color: inherit;
	border: 0;
	background-color: transparent;
}

.m.is-active:hover,
.m:hover {
	opacity: 0.7;
}

.m.is-active .m-inner,
.m.is-active .m-inner:after,
.m.is-active .m-inner:before {
	background-color: #fff;
}

.m-box {
	position: relative;
	display: inline-block;
	width: 20px;
	height: 20px;
}

.m-inner {
	top: 50%;
	display: block;
	margin-top: -2px;
}

.m-inner,
.m-inner:after,
.m-inner:before {
	position: absolute;
	width: 20px;
	height: 1px;
	transition-timing-function: ease;
	transition-duration: 0.15s;
	transition-property: transform;
	border-radius: 4px;
	background-color: #fff;
}

.m-inner:after,
.m-inner:before {
	display: block;
	content: "";
}

.m-inner:before {
	top: -5px;
}

.m-inner:after {
	bottom: -5px;
}

.m-3dx .m-box {
	perspective: 80px;
}

.m-3dx .m-inner {
	transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
		background-color 0 cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s;
}

.m-3dx .m-inner:after,
.m-3dx .m-inner:before {
	transition: transform 0 cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s;
}

.m-3dx.is-active .m-inner {
	transform: rotateY(180deg);
	background-color: transparent !important;
}

.m-3dx.is-active .m-inner:before {
	transform: translate3d(0, 5px, 0) rotate(45deg);
}

.m-3dx.is-active .m-inner:after {
	transform: translate3d(0, -5px, 0) rotate(-45deg);
}

.m-3dx-r .m-box {
	perspective: 80px;
}

.m-3dx-r .m-inner {
	transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
		background-color 0 cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s;
}

.m-3dx-r .m-inner:after,
.m-3dx-r .m-inner:before {
	transition: transform 0 cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s;
}

.m-3dx-r.is-active .m-inner {
	transform: rotateY(-180deg);
	background-color: transparent !important;
}

.m-3dx-r.is-active .m-inner:before {
	transform: translate3d(0, 5px, 0) rotate(45deg);
}

.m-3dx-r.is-active .m-inner:after {
	transform: translate3d(0, -5px, 0) rotate(-45deg);
}
/* menu */

@media (max-width: 768px) {
	.fixNav nav {
		padding: 10px 5% 4px 5%;
	}
}

.nav-mob a {
	font-size: 7vmin;
	font-weight: 300;
	margin-bottom: 50px;
}

.nav-mob a.active {
	color: var(--header-mobile-a-active-color);
}

/* mob menu container */
.mob-menu-container {
	position: fixed;
	display: block;
	width: 100%;
	height: 100%;

	visibility: hidden;
}

.open.mob-menu-container {
	visibility: visible;
	z-index: -1;
}

.mob-menu-container::before,
.mob-menu-container::after {
	content: "";
	position: fixed;
	top: 0;
	left: 50%;
	width: 200vw;
	height: 100vh;

	z-index: -1;
}

.mob-menu-container::before {
	background-color: var(--footer-line-color);
	transition: all 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.08s;
	transform: translate3d(-36%, 150vh, 0) rotate(-40deg);
}

.mob-menu-container::after {
	background-color: var(--default-bg-color);
	transition: all 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86);
	transform: translate3d(-26%, 150vh, 0) rotate(-40deg);
}

.open.mob-menu-container::before {
	transform: translate3d(-50%, 0, 0) rotate(0deg);
	transition: all 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.08s;
}

.open.mob-menu-container::after {
	transform: translate3d(-50%, 0, 0) rotate(0deg);
	transition: all 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.16s;
}
/* mob menu container */
</style>
