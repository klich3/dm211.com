<template>
	<div>
		<div class="w-1-1 pt-5 pt-10@s vh-9 bg-line-w">
			<div class="w-1-1 caption-content">
				<lazy-background
					class="stageCaption"
					v-if="captionThumbImage"
					:data-src="captionThumbImage"
				/>
				<div class="overlay"></div>
			</div>

			<div class="flx@fd-c@jc-se@ai-fe@ac-c h-100">
				<div class="mt-a pb-5 captionTitles">
					<transition name="fade">
						<h1 class="pageTitle txt-outline" v-if="stageTitle">
							{{ stageTitle }}
						</h1>
					</transition>
					<transition name="fade">
						<h3 v-if="stageCategory" class="u-dash">{{ stageCategory }}</h3>
					</transition>
				</div>
			</div>
		</div>

		<tmplJsonParser
			class="pt-5 w-1-1"
			v-bind="{
				jsonContent: detailsJsonTmpl,
			}"
		></tmplJsonParser>
	</div>
</template>

<script>
import cfg from "@/config";
import { mapGetters, mapActions } from "vuex";

//component
import tmplJsonParser from "@/layout/components/JsonParser.vue";
import imageBgLazy from "@/layout/components/imageBgLazy.vue";

export default {
	name: "Works-Details-Page",

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

	data() {
		return {
			//stage header
			//heade
			stageTitle: this.$t(`pages.${this.$route.meta.hash}TitlePage`),
			stageMetas: [],
			stageLinks: [],
			stageScript: [],

			stageCategory: null,
			captionThumbImage: null,

			detailsData: {},
			detailsJsonTmpl: [],

			scrollYPos: 0,
		};
	},

	components: {
		tmplJsonParser,
		"lazy-background": imageBgLazy,
	},

	computed: {
		...mapGetters("works", {
			GET_DETAILS_CONTENT: "GET_DETAILS_CONTENT",
		}),
	},

	watch: {
		isResize() {
			this.fn_resizeOverlayinViewport();
		},

		isScrolling(e) {
			this.scrollYPos = e;

			this.fn_resizeOverlayinViewport();
		},

		//response api callback
		GET_DETAILS_CONTENT(res) {
			if (res.title) this.stageTitle = res.title;

			let metasArray = [...this.stageMetas];

			if (res.title)
				metasArray.push({
					property: "og:title",
					content: `${this.stageTitle} ${cfg.pageTitleSeparator} ${cfg.pageTitle}`,
					id: "ogt",
				});

			if (res.description) {
				metasArray.push(
					{
						name: "description",
						content: res.description,
						id: "desc",
					},
					{
						property: "og:description",
						content: res.description,
						id: "ogdesc",
					}
				);
			}

			if (res.seo_thumb)
				metasArray.push({
					property: "og:image",
					content: res.seo_thumb,
					id: "ogimage",
				});

			if (res.seo_keywords)
				metasArray.push({
					name: "keywords",
					content: res.seo_keywords,
					id: "keys",
				});

			//update header
			//title, metas, links, script
			this.updateTitle(
				this.stageTitle,
				//metas
				metasArray,
				//links
				null,
				//script
				[]
			);

			//category
			const rCat =
				res.category_rel.map((f) => {
					return f.title;
				}) || [];

			this.stageCategory = rCat.join(" / ");

			//thumb image
			this.captionThumbImage = res.thumb;

			//content
			try {
				const preContent = res.content.replace(/(?:\r\n|\r|\n)/g, "");
				this.detailsJsonTmpl = JSON.parse(preContent);
			} catch (err) {
				this.detailsJsonTmpl = /array|object/gim.test(typeof res.content)
					? res.content
					: [];
			}
		},
	},

	mounted() {
		//cargamos stage content
		if (!this.$route.params.hash) this.$router.push({ name: "not-found" });

		//update metas basic & othe rone more complex on are details are loaded
		this.stageLinks = this.$route.path
			? [
					{
						rel: "canonical",
						href: `https://${cfg.uid}${this.$route.path}`,
						id: "canonical",
					},
			  ]
			: [];

		this.GET_DETAILS_WORKS(this.$route.params.hash);
	},

	methods: {
		...mapActions("works", ["GET_DETAILS_WORKS"]),

		//update title
		updateTitle(title, metas, links, script) {
			if (title) this.stageTitle = title;
			if (metas) this.stageMetas = metas;
			if (links) this.stageLinks = links;
			if (script) this.stageScript = script;

			this.$emit("updateHead");
		},

		//move caption overlay on scene
		fn_resizeOverlayinViewport() {
			const el = document.querySelector(".overlay");

			const H = window.innerHeight;
			const r = el.getBoundingClientRect();
			const t = r.bottom;
			const b = r.top;

			let window_offset = Math.max(90, t > 0 ? H - t : b < H ? b : H);
			let dom_offest_percent = ((H - t) / H) * 100;
			let degByPercent = (90 * dom_offest_percent) / 100 - 90;

			degByPercent = degByPercent > 90 ? 90 : degByPercent;

			if (degByPercent > 90) return;

			el.style.transform = "rotateX(" + degByPercent + "deg)";

			document.querySelector(".captionTitles").style.transform =
				"translateY(-" + window_offset / 5 + "px)";
		},
	},
};
</script>

<style scoped>
.caption-content {
	position: absolute;
	display: block;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}

.stageCaption {
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 100%;

	background-image: url(~@/assets/images/preloader.svg);

	background-position: center center;
	background-repeat: no-repeat;

	opacity: 0.4;
	filter: blur(5px);

	z-index: -1;
}

.stageCaption::after {
	content: "";
	position: absolute;
	top: 0;
	left: 0;

	display: block;
	width: 100%;
	height: 100%;

	background-image: linear-gradient(35deg, #000000, #3da3d4);
	mix-blend-mode: multiply;
}

.stageCaption::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;

	display: block;
	width: 100%;
	height: 100%;

	/*background-color: rgba(0, 0, 0, 0.72);
	*/
	z-index: 2;
}

.stageCaption[data-status="loaded"] {
	background-size: cover;
}

.overlay {
	position: absolute;
	bottom: -10px;
	left: 0;
	width: 100%;
	height: 100%;

	pointer-events: none;

	background-image: url(~@/assets/images/overlay.svg);
	background-position: center bottom;
	background-repeat: no-repeat;
	background-size: cover;

	transform: rotateX(90deg);
	transform-origin: bottom;

	filter: blur(5px);

	z-index: -1;
}

@media (min-width: 1220px) {
	.overlay {
		bottom: -8px;
		filter: none;
	}
}
</style>
