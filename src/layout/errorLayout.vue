<template>
	<div class="wrapper">
		<div class="w-1-1 vh">
			<div class="flx@ccc h-100">
				<div class="g">
					<div class="w-1-1 pt-10"></div>

					<div class="ws-1-1 txt@c focus" v-in-viewport.once>
						<div class="w-1-1 pb-5">
							<img
								src="~@/assets/images/g.svg#i-host-view"
								alt="not found icon"
								width="123"
								height="131"
							/>
						</div>

						<h1>{{ $t("notFound404") }}</h1>

						<div class="subtitle pt-4">
							<p>{{ $t("notFound404Text") }}</p>
							<div class="w-1-1 pt-2"></div>
							<router-link :to="{ name: 'home' }" class="button">{{
								$t("buttons.goHome")
							}}</router-link>
						</div>
					</div>

					<div class="w-1-1 cp-4@s txt@c pt-4"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import cfg from "@/config";

export default {
	name: "layout-error",

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

	created() {
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
					content: this.$t("descriptions.error"),
					id: "desc",
				},
				{
					property: "og:description",
					content: this.$t("descriptions.error"),
					id: "ogdesc",
				},
			];

			this.$emit("updateHead");
		},
	},
};
</script>

<style scoped></style>
