import cfg from "@/config.js";

import Vue from "vue";

import VueGtag from "vue-gtag";
import VueHead from "vue-head";
import VueRouter from "vue-router";

import routes from "@/router/routes";

///-----------------------------------------

//header
Vue.use(VueHead, {
	separator: cfg.pageTitleSeparator,
	complement: cfg.pageTitle,
});

//routers
Vue.use(VueRouter);

// configure router
const router = new VueRouter({
	mode: "history",
	base: __dirname, //process.env.BASE_URL
	routes, // short for routes: routes
	linkActiveClass: "active",

	async beforeRouteLeave(to, from, next) {
		await this.nextTick();
		next();
	},
});

//analytics gtag
if (cfg.analyticsEnable) {
	Vue.use(
		VueGtag,
		{
			config: {
				id: cfg.analytics,
				cookie_flags: "max-age=7200;secure;samesite=none",
			},
			onReady() {
				setTimeout(function () {
					gtag ? gtag("event", "NoBounce") : this.$gtag.event("NoBounce");
				}, 10000);
			},
		},
		router
	);
}

export default router;
