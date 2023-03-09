<template>
	<div class="wrapper">
		<!--//home scene//-->
		<tmplHomeScene
			v-bind="{
				isResize: isResize,
				isScrolling: isScrolling,
				isMobile: isMobile,
			}"
		></tmplHomeScene>

		<div class="w-1-1 clearfix"></div>

		<div class="home-scene-gap"></div>

		<div class="home-rest-content">
			<!--// nothing is impossible //-->
			<div class="w-1-1 vh home-nii focus" v-in-viewport.once>
				<div class="flx@ccc h-100">
					<div class="txt txt-outline">Digital Media</div>
				</div>
			</div>

			<div class="w-1-1 pt-10 pb-10"></div>

			<div class="bg-line-o bg-i">
				<div class="c cc">
					<div class="flx@ccc pt-5 focus vh" v-in-viewport.once>
						<div class="ws-1-1 wm-7-10 wl-7-10 wxl-7-10 txt@c">
							<p>
								<strong>Digital Media 211</strong> en abreviado
								<strong>Dm211</strong> somo un pequeño grupo de personas que
								varía segun el proyecto o necesidad del momento.
							</p>
							<p>
								Nos enfrentamos desafíos y ayudando a lograr diferentes
								objetivos para diferente público, ya sea una aplicación, landing
								o una web. Con más de
								<i>{{ caclYears("1996") }} años</i>
								de experiencia en el sector.
							</p>
						</div>
					</div>
				</div>
			</div>

			<!--// grid //-->
			<div class="w-1-1 pt-5"></div>

			<div
				class="c cc"
				v-in-viewport.once
				v-on-change="{ class: 'in-viewport' }"
				@on-change="GET_HOME_WORKS"
			>
				<div class="focus" v-in-viewport.once>
					<div class="w-1-1 txt@c s-l">
						<h3 class="u-dash">Últimos trabajos</h3>
					</div>

					<div class="w-1-1 pt-5 pt-10@s pb-10@s">
						<transition name="fade">
							<div class="txt@c" v-if="GET_WORK_ITEMS.length == 0">
								<img
									src="~@/assets/images/g.svg#i-warn-view"
									alt="error icon"
									width="48"
									height="44"
								/>

								<div class="w-1-1 pt-3">
									<p>
										No se ha podido cargar items, por favor vuelva a intentarlo
										en un minuto.
									</p>
									<div class="w-1-1 pt-5"></div>
									<button class="button" @click="GET_HOME_WORKS">
										Volver a cargar
									</button>
								</div>
							</div>
						</transition>

						<transition name="fade">
							<div class="w-1-1" v-if="GET_WORK_ITEMS.length > 0">
								<tmplHomeWorkGrid
									v-bind="{
										aItems: fn_getHomeItems,
									}"
									class="pt-5"
								>
								</tmplHomeWorkGrid>

								<div class="txt@c pt-5 pt-10@s">
									<router-link
										tag="button"
										:to="{ name: 'works' }"
										class="button"
										>{{ $t("buttons.moreWorks") }}</router-link
									>
								</div>
							</div>
						</transition>
					</div>
				</div>
			</div>

			<div class="w-1-1 pb-10 pt-10"></div>

			<div class="w-1-1 bg-line-t bg-i" id="contact">
				<div class="c cc vh-m">
					<div class="w-1-1 h-100 flx@ccc">
						<div class="g">
							<div
								class="ws-1-1 wm-3-10 wl-3-10 wxl-2-10 focus"
								v-in-viewport.once
							>
								<div class="flx@fd-c@@jc-se@ac-c h-100">
									<div class="layers-container hs" v-in-viewport.once>
										<div class="layers">
											<span></span>
											<span></span>
											<span></span>
											<span></span>
											<span></span>
										</div>
									</div>
								</div>
							</div>

							<div
								class="ws-1-1 wm-7-10 wl-7-10 wxl-6-10 focus"
								v-in-viewport.once
							>
								<h3 class="u-dash">Servicios</h3>

								<div class="hl">
									<div class="w-1-1 pt-5"></div>
								</div>

								<!--//version mobil//-->
								<div class="hl w-1-1">
									<div
										class="services-anim flx@jc-c s-fd-r"
										v-from-source="{ dom: '.layers', to: '.services-anim' }"
										v-in-viewport.once
									></div>
								</div>

								<p>
									¿Te has imaginado una nueva plataforma digital innovadora, una
									web revolucionaria, un servicio que mejora la vida o quieres
									cambiar el mundo? Entonces hagámoslo juntos.
								</p>
								<p>
									Estamos a su disposición para hacer sus sueños realidad.
									Nosotros transformaremos su brillante idea en un proyecto
									real.
								</p>

								<p>Trabajamos con siguientes tecnologías:</p>

								<div class="g gws-1-1 gwm-1-2 gwl-1-2 gwxl-1-2">
									<div>
										<p><strong>FrontEnd</strong></p>
										<ul>
											<li>JavaScript (ES6), TypeScript, jQuery</li>
											<li>VUE / VUEX</li>
											<li>Stylus / SCSS / CSS</li>
											<li>HandleBars / TemplateX</li>
											<li>Bootstrap</li>
											<li>Webpack / Gulp</li>
										</ul>
									</div>

									<div class="hl w-1-1 pt-3@s"></div>

									<div>
										<p><strong>BackEnd</strong></p>
										<ul>
											<li>NodeJS / Express</li>
											<li>PHP</li>
											<li>WebSocket</li>
										</ul>

										<p><strong>Otros Skils</strong></p>
										<ul>
											<li>Git / GitHub / BitBacket</li>
											<li>MySQL</li>
										</ul>
									</div>
								</div>

								<div class="w-1-1 pt-5"></div>

								<div class="txt s-c">
									<a class="button" :href="mailTo">
										{{ $t("buttons.contact") }}
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="clearfix w-1-1"></div>
			</div>

			<div class="w-1-1 pb-10@s pt-10@s"></div>
		</div>
	</div>
</template>

<script>
import cfg from "@/config.js";
import { mapGetters, mapActions } from "vuex";

//components
import tmplHomeScene from "@/layout/components/Home-Scene.vue";
import tmplHomeWorkGrid from "@/layout/components/Home-WorkGrid.vue";

export default {
	name: "home-layout",

	head: {
		title() {
			return {
				inner: this.stageTitle,
			};
		},
		metas() {
			if (this.stageMetas.length !== 0) return this.stageMetas;
		},
		link() {
			if (this.stageLinks.length !== 0) return this.stageLinks;
		},
		script() {
			if (this.stageScript.length !== 0) return this.stageScript;
		},
	},

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

	components: {
		tmplHomeWorkGrid,
		tmplHomeScene,
	},

	data() {
		return {
			//stage header
			stageTitle: this.$t("homePage"),
			stageMetas: [
				{
					name: "description",
					content: this.$t("descriptions.home"),
					id: "desc",
				},
			],
			stageLinks: [
				{
					rel: "canonical",
					href: `https://${cfg.uid}${this.$route.path}`,
					id: "canonical",
				},
			],
			stageScript: [],

			//loader
			countFilesToLoad: 0,
			countFilesLoaded: 0,
			isLoaded: false,

			//global vars
			firstStart: true,

			//modal
			showContactModal: false,
			mailTo: `mailto:${cfg.dir[0].email}`,
		};
	},

	computed: {
		...mapGetters("core", {
			GET_SETTINGS: "GET_SETTINGS",
		}),

		...mapGetters("works", {
			GET_WORK_ITEMS: "GET_WORK_ITEMS",
		}),

		fn_getHomeItems() {
			return this.GET_WORK_ITEMS.slice(0, 4) || 0;
		},
	},

	mounted() {
		if (process.browser && !this.isLoaded) return;
		this.firstStart = false;
	},

	methods: {
		...mapActions("works", ["GET_HOME_WORKS"]),

		//calcula años de experiencia
		caclYears(initialYear) {
			const currDate = new Date().getFullYear().toString();
			return currDate - initialYear;
		},
	},
};
</script>

<style scoped>
.home-scene-gap {
	display: block;
	width: 100%;
	height: 0;
	padding-bottom: 2000px;
}

.home-nii .txt {
	padding: 5%;

	font-size: 18vmin;
	line-height: 22vmin;
	text-transform: uppercase;
	font-weight: 300;
	text-align: justify;
	color: transparent;
}

.layers {
	position: relative;
	display: block;
	width: 150px;
	height: 150px;
	perspective: 1000px;
}

.layers span {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 60%;
	height: 60%;
	display: block;
	opacity: 0;

	border-radius: 16px;

	-webkit-transition: opacity 0.6s cubic-bezier(0.4, 0.25, 0, 1),
		-webkit-transform 0.6s cubic-bezier(0.4, 0.25, 0, 1);
	transition: opacity 0.6s cubic-bezier(0.4, 0.25, 0, 1),
		-webkit-transform 0.6s cubic-bezier(0.4, 0.25, 0, 1);
	transition: transform 0.6s cubic-bezier(0.4, 0.25, 0, 1),
		opacity 0.6s cubic-bezier(0.4, 0.25, 0, 1);
	transition: transform 0.6s cubic-bezier(0.4, 0.25, 0, 1),
		opacity 0.6s cubic-bezier(0.4, 0.25, 0, 1),
		-webkit-transform 0.6s cubic-bezier(0.4, 0.25, 0, 1);
	-webkit-transform: rotateX(65deg) rotateY(0deg) rotateZ(-45deg)
		translateZ(100px) translateY(-50%) translateX(-50%);
	transform: rotateX(65deg) rotateY(0deg) rotateZ(-45deg) translateZ(100px)
		translateY(-50%) translateX(-50%);
	background-color: rgba(255, 255, 255, 0.2);
}

.in-viewport .layers span {
	opacity: 1;
	width: 100%;
	height: 100%;
	-webkit-transition: opacity 1.25s cubic-bezier(0.4, 0.25, 0, 1),
		-webkit-transform 1.25s cubic-bezier(0.4, 0.25, 0, 1);
	transition: opacity 1.25s cubic-bezier(0.4, 0.25, 0, 1),
		-webkit-transform 1.25s cubic-bezier(0.4, 0.25, 0, 1);
	transition: transform 1.25s cubic-bezier(0.4, 0.25, 0, 1),
		opacity 1.25s cubic-bezier(0.4, 0.25, 0, 1);
	transition: transform 1.25s cubic-bezier(0.4, 0.25, 0, 1),
		opacity 1.25s cubic-bezier(0.4, 0.25, 0, 1),
		-webkit-transform 1.25s cubic-bezier(0.4, 0.25, 0, 1);
	-webkit-transform: rotateX(65deg) rotateY(0deg) rotateZ(45deg) translateZ(0)
		translateY(-20%) translateX(-50%);
	transform: rotateX(65deg) rotateY(0deg) rotateZ(45deg) translateZ(0)
		translateY(-20%) translateX(-50%);
}

.layers span:nth-child(1) {
	-webkit-transition-delay: 0.9s;
	transition-delay: 0.9s;
}

.layers span:nth-child(2) {
	-webkit-transition-delay: 0.8s;
	transition-delay: 0.8s;
}

.layers span:nth-child(3) {
	-webkit-transition-delay: 0.7s;
	transition-delay: 0.7s;
}

.layers span:nth-child(4) {
	-webkit-transition-delay: 0.6s;
	transition-delay: 0.6s;
}

.layers span:nth-child(5) {
	-webkit-transition-delay: 0.4s;
	transition-delay: 0.4s;
}

/*initial*/
.in-viewport .layers span:nth-child(1) {
	top: 10%;
}

.in-viewport .layers span:nth-child(2) {
	top: 20%;
}

.in-viewport .layers span:nth-child(3) {
	top: 30%;
}

.in-viewport .layers span:nth-child(4) {
	top: 40%;
}

.in-viewport .layers span:nth-child(5) {
	top: 50%;
}

/*anim*/
.layers span:nth-child(1) {
	top: 20%;
}

.layers span:nth-child(2) {
	top: 40%;
}

.layers span:nth-child(3) {
	top: 60%;
}

.layers span:nth-child(4) {
	top: 80%;
}

.layers span:nth-child(5) {
	top: 100%;
}

/*
.bg-ic {
	background-color: #c7c7c7;
}

.bg-i:before {
	z-index: 1;
	background-color: #fff;
	filter: inherit(1);
}

.bg-i:after {
	-webkit-backdrop-filter: invert(1);
	backdrop-filter: invert(1);
	z-index: 3;
}

.bg-ic h3 {
	color: #ef6d3f;
}

.bg-ic .button {
	color: #000;
	border-color: #ef6d3f;
}
*/

/*mob menos de 768*/
@media (max-width: 768px) {
	.bg-line-t.bg-ino-s:before {
		background-color: transparent;
		filter: none;
	}

	/*
	.bg-line-t.bg-ino-s:after {
		-webkit-backdrop-filter: none;
		backdrop-filter: none;
		background: none;
	}
	*/

	.home-nii .txt {
		font-size: 16vmin;
		text-align: center;
	}

	.scroll-down {
		position: fixed;
	}

	.in-viewport .layers span {
		-webkit-transform: rotateX(65deg) rotateY(0deg) rotateZ(45deg) translateZ(0)
			translateY(-75%) translateX(-50%);
		transform: rotateX(65deg) rotateY(0deg) rotateZ(45deg) translateZ(0)
			translateY(-75%) translateX(-50%);
	}

	.home-scene-mountains {
		background-position: bottom center;
		background-size: 100%;
	}

	.services-anim .layers {
		display: inline-block;
		width: 150px;
		transform: translateX(-50%);
	}
}

/*mas de 769*/
@media (min-width: 769px) {
	.home-nii .txt {
		font-size: 7vmax;
		line-height: normal;
		text-align: center;
	}
}
</style>
