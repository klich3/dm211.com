<template>
	<div id="app" data-app app-data="true">
		<tmplHeader
			v-bind="{
				isScrolling: isScrolling,
				isMobile: isMobile,
				isHome: isHome,
			}"
		></tmplHeader>

		<main>
			<router-view
				v-bind="{
					isScrolling: isScrolling,
					isMobile: isMobile,
					isResize: screenW,
				}"
			></router-view>
		</main>

		<tmplFooter></tmplFooter>

		<!--//modal cookies//-->
		<v-snackbar
			v-model="isShowCookieModal"
			:vertical="true"
			:bottom="true"
			:right="true"
			:multi-line="true"
			:timeout="-1"
		>
			<div class="g">
				<div class="ws-1-1 w-1-10 txt s-c pb-3@s">
					<img
						src="~@/assets/images/g.svg#i-cookie-view"
						alt="cookies icon"
						width="48"
						height="48"
					/>
				</div>
				<div class="ws-1-1 w-9-10 flx@ai-c@ac-c">
					<div>{{ $t("cookiesNotify") }}</div>
				</div>
			</div>

			<div class="w-1-1 pt-2">
				<div class="flx@jc-sb@ai-c@ac-c">
					<router-link :to="{ name: 'cookies' }" class="button">
						{{ $t("buttons.consult") }}
					</router-link>

					<button class="button" @click="e_closeCookies">
						{{ $t("buttons.acept") }}
					</button>
				</div>
			</div>
		</v-snackbar>

		<div class="footer-line"></div>
	</div>
</template>

<script>
import cfg from "@/config.js";
import { mapGetters } from "vuex";

//import gsap from "gsap";

//components
import tmplHeader from "@/layout/components/Header.vue";
import tmplFooter from "@/layout/components/Footer.vue";

export default {
	name: "App",
	head: {
		meta: [
			{ name: "description", content: cfg.homeDescription, id: "desc" },
			{ name: "keywords", content: cfg.homeKeywords, id: "keys" },

			{ name: "author", content: "Anthony Sychev" },
			{ name: "msapplication-TileColor", content: "#FFFFFF" },
			{
				name: "msapplication-TileImage",
				content: "/src/assets/img/favicon-144.png",
			},
			{ name: "theme-color", content: "#ffffff" },
		],

		link: [
			{ rel: "author", href: "/humans.txt", undo: false },
			{ rel: "icon", href: "/src/assets/img/favicon.ico" },
			{
				rel: "shortcut icon",
				href: "/src/assets/img/favicon.ico",
				type: "image/x-icon",
				sizes: "16x16 32x32",
			},
			{
				rel: "apple-touch-icon",
				href: "/src/assets/img/favicon-152-precomposed.png",
				type: "image/x-icon",
				sizes: "152x152",
			},
			{
				rel: "apple-touch-icon",
				href: "/src/assets/img/favicon-144-precomposed.png",
				type: "image/x-icon",
				sizes: "144x144",
			},
			{
				rel: "apple-touch-icon",
				href: "/src/assets/img/favicon-120-precomposed.png",
				type: "image/x-icon",
				sizes: "120x120",
			},
			{
				rel: "apple-touch-icon",
				sizes: "114x114",
				href: "/src/assets/img/favicon-114-precomposed.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/src/assets/img/favicon-180-precomposed.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "72x72",
				href: "/src/assets/img/favicon-72-precomposed.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "57x57",
				href: "/src/assets/img/favicon-57.png",
			},
			{ rel: "icon", sizes: "32x32", href: "/src/assets/img/favicon-32.png" },
			{
				rel: "icon",
				sizes: "192x192",
				href: "/src/assets/img/favicon-192.png",
			},

			//manifest
			{
				rel: "manifest",
				href: "/manifest.json",
				id: "manifest",
			},

			//preload
			/*{
				rel: "preload",
				href: "/src/assets/fonts/mplus-1p-regular.woff2",
				as: "font",
				type: "font/woff2",
				id: "font-m1-reg",
				crossorigin: "anonymous",
			},
			{
				rel: "preload",
				href: "/src/assets/fonts/mplus-1p-thin.woff2",
				as: "font",
				type: "font/woff2",
				id: "font-m1-thin",
				crossorigin: "anonymous",
			},
			{
				rel: "preload",
				href: "/src/assets/fonts/mplus-1p-light.woff2",
				as: "font",
				type: "font/woff2",
				id: "font-m1-light",
				crossorigin: "anonymous",
			},
			*/
			{
				rel: "dns-prefetch",
				href: "https://fonts.gstatic.com/",
				id: "gfontsd",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com/",
				id: "gfontsp",
				crossorigin: "anonymous",
			},
			{
				rel: "preload",
				href:
					"https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;400;500&display=swap",
				as: "style",
				id: "gfontsl",
				crossorigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href:
					"https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;400;500&display=swap",
				id: "gfontss",
			},
			{
				rel: "preconnect",
				href: "https://www.google-analytics.com/analytics.js",
				id: "analytics",
			},
			{
				rel: "preconnect",
				href: "https://www.googletagmanager.com/gtag/js",
				id: "analytics",
			},
		],

		script: [
			/*
			{
				type: "text/javascript",
				src: "https://js.stripe.com/v3/",
				async: true,
				//defer: true
			},
			*/

			//website
			{
				type: "application/ld+json",
				inner: `{
					"@context": "http://schema.org",
					"@type": "WebSite",
					"name": "${cfg.dir[0].placeTitle}",
					"url": "https://${cfg.uid}"
				}`,
			},
			/*"sameAs": [
						"${cfg.socials.fb}"
					]*/

			//webpage
			{
				type: "application/ld+json",
				inner: `{
					    "@context": "https://schema.org",
					    "@type": "WebPage",
					    "name": "${cfg.dir[0].placeTitle}",
					    "description": "${cfg.homeDescription}",
					    "publisher": {
					        "@type": "Person",
					        "name": "Anthony Sychev",
					        "sameAs": [
					        	"https://dm211.com",
					        	"https://twooneone.xyz"
					        ]
					    }
					}`,
			},

			//organization
			{
				type: "application/ld+json",
				inner: `{ "@context" : "https://schema.org",
				      "@type" : "Organization",
				      "url" : "https://${cfg.uid}",
				      "logo": "https://${cfg.uid}/src/assets/img/favicon-114-precomposed.png"
				       }`,
			},
			/*
				"contactPoint" : [
				        { "@type" : "ContactPoint",
				          "telephone" : "+34 ${cfg.dir.tel}",
				          "contactType" : "general info",
				          "contactOption" : "TollFree",
				          "areaServed" : "ES"
				        }]
			*/
		],
	},

	components: {
		tmplHeader,
		tmplFooter,
	},

	data() {
		return {
			userLang: false,
			isShowCookieModal: false,
			firstStart: true, //mandar a core
			screenW: 0,
			isScrolling: 0,
			isOpenMenu: false,
			isMobile: false,

			//tiltObj: {}
		};
	},

	computed: {
		...mapGetters("core", {
			GET_SETTINGS: "GET_SETTINGS",
		}),

		isHome() {
			return /home/.test(this.$route.name) ? true : false;
		},
	},

	created() {
		this.$store.dispatch("GET_SETTINGS");

		//check if user accept fucking cookies terms if not show notice
		setTimeout(() => {
			this.isShowCookieModal =
				this.$store.getters.GET_SETTINGS.userAcceptCookiesConditions || false;
		}, 4000);

		//app set language
		this.userLang =
			this.$store.getters.GET_SETTINGS.userLanguage || cfg.defaultLang;
		this.$store.dispatch("SET_USERLANG", this.userLang);

		/*
		setTimeout(() => {
			this.$store.dispatch("SET_USERLANG", 'en');
		}, 8000);
		*/

		document.cookie = "cross-site-cookie=bar; SameSite=None; Secure";
	},

	watch: {
		//cada cambio de url hacemos scroll up
		$route(to /*, from*/) {
			if (this.isScrolling !== 0) this.isScrolling = 0;

			//scroll to anchor
			if (to.params.scrollTo) {
				setTimeout(() => {
					const posAnchor = document.querySelector("#" + to.params.scrollTo)
						.offsetTop;

					window.scroll({
						top: posAnchor,
						behavior: "smooth",
					});
				}, 120);
			}
		},
	},

	mounted() {
		if (process.browser) {
			if (/prod/.test(process.env.NODE_ENV)) {
				const msg_loc = cfg.msgLog
					.match(new RegExp(".{1,4}", "g"))
					.map((r) => String.fromCodePoint(r))
					.join("");
				console.info(
					`%c \u232C ${cfg.pageTitle}\nBuild: [${cfg.buidVersion}]\n\n${msg_loc}`,
					'color:#808080;font-size:12px;font-family:"Helvetica Light", "Helvetica",Arial,sans-serif;font-weight:lighter;'
				);
			}

			document.querySelector("html").classList.remove("no-js");

			const screenW = window.innerWidth;
			this.isMobile = screenW <= 769 ? true : false;

			window.addEventListener("resize", this.fn_resize);
			window.addEventListener("scroll", this.e_isScrolling);

			this.fn_resize();
			this.firstStart = false;
		}
	},

	methods: {
		/*
		e_itemClickedShowDetail(obj, el)
		{
			console.log("item clicked "+obj);

			const rect = el.getBoundingClientRect();
			const rect_item = el.querySelector('.item');

			this.tiltObj = obj;

			//anim bg
			gsap.fromTo(".bg-titl", 0.3, {
				x: el.offsetLeft,
				y: el.offsetTop - rect_item.clientHeight,
				width: rect_item.clientWidth + 'px',
				height: rect_item.clientHeight + 'px',
				opacity: 0
			}, {
				x: 0,
				y: 0,
				width: '100%',
				height: '100vh',
				opacity: 1,
				borderRadius: 0,
				ease: "expo.out"
			});
		},
		*/

		/*
		e_homeIsScrolling(e) {
			if (!e) return;

			this.isScrolling = e;
		},
		*/

		//scroll
		e_isScrolling() {
			this.isScrolling = window.scrollY;
		},

		//acciones de resize
		fn_resize() {
			//recalculamos tamaño del stage

			this.screenW = window.innerWidth;
			this.isMobile = this.screenW <= 769 ? true : false;
		},

		e_closeCookies() {
			this.isShowCookieModal = false;

			//update setting on user session
			this.$store.dispatch("UPDATE_SETTINGS", {
				userAcceptCookiesConditions: true,
			});
		},
	},

	destroyed() {
		window.removeEventListener("resize", this.fn_resize);
		window.removeEventListener("scroll", this.fn_isScrolling);
	},
};
</script>

<style scoped>
/*
.bg-titl {
	position: fixed;
	background-color: var(--default-bg-color);
	border-radius: 9px;
	opacity: 0;
	z-index: 10;
	overflow-y: auto
}
*/

main {
	width: 100%;
	height: 100%;
}

.footer-line {
	position: fixed;
	bottom: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 3px;
	background-color: var(--footer-line-color);
	z-index: 100;
}

/*
@media (max-width: 768px) {
}
*/
</style>
