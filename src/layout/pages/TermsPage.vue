<template>
	<div>
		<div class="c cc focus" v-in-viewport.once>
			<div class="w-1-1 pt-10 pb-10@s"></div>

			<div class="w-1-1 pt-5 pt-10@s">
				<h1>{{ $t(`pages.${$route.meta.hash}TitlePage`) }}</h1>
			</div>

			<div class="w-1-1 pt-10 pb-10" v-html="showContentHtml"></div>
		</div>
	</div>
</template>

<script>
import cfg from "@/config";

export default {
	name: "Terms-Page",

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
		};
	},

	updated() {
		this.$nextTick(() => {
			this.updateTitle(
				this.$t(`pages.${this.$route.meta.hash}TitlePage`),
				[],
				[
					{
						rel: "canonical",
						href: `https://${cfg.uid}${this.$route.path}`,
						id: "canonical",
					},
				],
				[]
			);
		});
	},

	computed: {
		showContentHtml() {
			let fn_dir = cfg.dir[cfg.dirDefault];
			fn_dir.uid = cfg.uid;

			return this.$t(`longTexts.${this.$route.meta.hash}`, fn_dir);
		},
	},

	methods: {
		//update title
		updateTitle(title, metas, links, script) {
			if (title) this.stageTitle = title;
			if (metas) this.stageMetas = metas;
			if (links) this.stageLinks = links;
			if (script) this.stageScript = script;

			this.$emit("updateHead");
		},
	},
};
</script>
