import cfg from "@/config.js";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import App from "@/App.vue";

import inViewportDirective from "vue-in-viewport-directive";
import onChangeDirective from "@/plugins/directives/onChangeDirective.js";
import isWebpSupport from "@/plugins/isWebpSupport.js";

//plugins
import { i18n } from "@/plugins/i18n.js";
import contentFromSource from "@/plugins/directives/contentFromSource.js";

Vue.directive("from-source", contentFromSource);
Vue.directive("on-change", onChangeDirective);
Vue.directive("in-viewport", inViewportDirective);

Vue.use(isWebpSupport);
Vue.use(Vuetify);

Vue.config.devtools = cfg.devtools;
Vue.config.productionTip = false;

import store from "@/store";
import router from "@/router";

//general css style
import "@/assets/css/960.css";
//import "vuetify/dist/vuetify.min.css";
import "@/assets/css/general.css";

//icons Vuetify | https://materialdesignicons.com/
import { mdiChevronLeft } from "@mdi/js";
import { mdiChevronRight } from "@mdi/js";

const v_config = {
	icons: {
		iconfont: "mdiSvg", //"mdi", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'

		//$vuetify.icons.nextIcon
		nextIcon: { component: mdiChevronRight },
		prevIcon: { component: mdiChevronLeft },
	},
	theme: {
		dark: false,
	},
};

new Vue({
	i18n,
	store,
	router,
	vuetify: new Vuetify(v_config),
	render: (h) => h(App),
}).$mount("#app");
