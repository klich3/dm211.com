import cfg from "@/config";
import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "@/locale/es";

Vue.use(VueI18n);

export const i18n = new VueI18n({
	locale: cfg.defaultLang,
	fallbackLocale: cfg.defaultLang,
	messages,
});
