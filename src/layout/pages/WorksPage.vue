<template>
	<div>
		<div class="w-1-1 pt-10 pb-10@s"></div>

		<div class="w-1-1 pt-5 pt-10@s vh-6 bg-line-t">
			<div class="flx@fd-c@jc-se@ai-fe@ac-c h-100">
				<h1 class="pageTitle txt-outline mt-a">
					{{ $t(`pages.${$route.meta.hash}TitlePage`) }}
				</h1>
			</div>
		</div>

		<div class="c cc">
			<div class="w-1-1 pt-10 pb-10 focus">
				<transition name="fade">
					<div class="txt@c" v-if="GET_WORK_ITEMS.length == undefined">
						<img
							src="~@/assets/images/g.svg#i-warn-view"
							alt="error icon"
							width="48"
							height="44"
						/>

						<div class="w-1-1 pt-3">
							<p>
								{{ $t("noItems") }}
							</p>
							<div class="w-1-1 pt-5"></div>
						</div>
					</div>
				</transition>

				<transition name="fade">
					<div class="w-1-1">
						<tmplHomeWorkGrid :aItems="GET_WORK_ITEMS" class="pt-5" />
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import cfg from "@/config";
import { mapGetters } from "vuex";

//components
import tmplHomeWorkGrid from "@/layout/components/Home-WorkGrid.vue";

export default {
	name: "Works-Page",

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
	},

	data() {
		return {
			//header
			stageTitle: this.$t(`pages.${this.$route.meta.hash}TitlePage`),
			stageMetas: [],
			stageLinks: [
				{
					rel: "canonical",
					href: `https://${cfg.uid}${this.$route.path}`,
					id: "canonical",
				},
			],
			stageScript: [],

			pageLoaded: 0,

			scrollYPos: 0,
		};
	},

	computed: {
		...mapGetters("works", {
			GET_WORK_ITEMS: "GET_WORK_ITEMS",
		}),
	},

	watch: {
		isScrolling(e) {
			this.scrollYPos = e;

			let yVal = -(1 + (e / 1500) * 1000) + "px";

			if (parseFloat(yVal) > 250) return;

			document.querySelector(
				"h1.pageTitle"
			).style.transform = `translateY(${yVal})`;
		},
	},

	mounted() {
		this.updateTitle();
	},

	methods: {
		//actualizamos metas en el header
		updateTitle() {
			//modificamos si hay un meta en routes
			if (this.$route.meta.localVar)
				this.stageTitle = this.$t(`sections.${this.$route.meta.localVar}`);

			this.stageMetas = [
				{ property: "og:title", content: this.stageTitle, id: "ogt" },
				{
					name: "description",
					content: this.$t("descriptions.works"),
					id: "desc",
				},
				{
					property: "og:description",
					content: this.$t("descriptions.works"),
					id: "ogdesc",
				},
			];

			this.$emit("updateHead");
		},
	},
};
</script>

<style scoped></style>
