<template>
	<footer>
		<div class="cc c">
			<div class="g">
				<div class="w-1-1 txt@c pt-2">
					<img src="~@/assets/images/logo-small.png" alt="dm211 logotype" />
				</div>

				<div class="w-1-1 pt-2 pb-2">
					<div class="sep-h"></div>
				</div>

				<div class="w-1-1 h-100">
					<div class="g gc h-100">
						<div class="ws-1-1 wm-1-2 wl-1-2 wxl-1-2">
							<div class="h-100 flx@fd-c@jc-c copyz">
								{{ $t("copyz") }} © {{ thisYear }} - {{ siteName }}
							</div>
						</div>

						<div class="ws-1-1 wm-1-2 wl-1-2 wxl-1-2 h-100 pt-4@s">
							<ul class="p-n ln fr txt@r list-sep">
								<!--//
								<li><a href="javascript:void(0);">Report Bug</a></li>
								<li><a href="javascript:void(0);">Feedback</a></li>
								//-->

								<li>
									<router-link :to="{ name: 'terms' }">{{
										$t("pages.termsTitlePage")
									}}</router-link>
								</li>
								<li>
									<router-link :to="{ name: 'cookies' }">{{
										$t("pages.cookiesTitlePage")
									}}</router-link>
								</li>
								<li>
									<router-link :to="{ name: 'privacy' }">{{
										$t("pages.privacyTitlePage")
									}}</router-link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="pt-4"></div>
			</div>
		</div>
	</footer>
</template>

<script>
import cfg from "@/config.js";

export default {
	name: "Footer",

	data() {
		return {
			siteName: cfg.pageTitle,
			thisYear: new Date().getFullYear(),
		};
	},
};
</script>

<style scoped>
footer {
	position: relative;
	display: block;
	width: 100%;
	margin-top: 10%;
	background-color: #2f2f2f;
	color: #a3a09f;
	font-size: 0.7rem;
	font-weight: 400;
}

footer a:visited,
footer a {
	color: #a3a09f;
}

footer a:hover {
	color: #39f;
}

.footer-line {
	position: fixed;
	bottom: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 3px;
	background-color: #35a3d4;
}

.sep-h {
	position: relative;
}

.sep-h::after {
	content: "";
	position: absolute;
	left: 0;
	width: 100%;
	height: 1px;
	background-color: #747271;
}

@media (max-width: 768px) {
	.copyz {
		text-align: center;
	}

	.list-sep {
		display: block;
		width: 100%;
		text-align: center !important;
		font-size: 0.6rem;
		margin-left: auto;
		margin-right: auto;
	}

	.list-sep li {
		position: relative;
		display: inline-block;
		padding-right: 4px;
		margin-right: 4px;
	}

	.list-sep li:not(:last-child)::after {
		content: "";
		position: absolute;
		right: 0;
		width: 1px;
		height: 100%;
		background-color: #747271;
	}
}
</style>
