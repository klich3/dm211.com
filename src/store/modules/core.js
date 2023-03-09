import cfg from "@/config.js";
import { i18n } from "@/plugins/i18n.js";

export default {
	//namespaced: true,
	state: {
		settings: {
			userAcceptCookiesConditions: false,
			userLanguage: cfg.defaultLang,
		},
	},

	getters: {
		//settings internal
		GET_SETTINGS: (state) => {
			return state.settings;
		},

		GET_USER_ACCEPT_COOKIES: (state) => {
			return state.userAcceptCookiesConditions;
		},

		GET_USER_LOCALE: (state) => {
			return state.userLanguage;
		},
	},

	mutations: {
		SET_SETTINGS: (state, settings) => {
			state.settings = settings;
		},

		//asignamos lenguaje + headers + meta
		SET_USER_ACCEPT_COOKIES: (state, value) => {
			state.settings.userAcceptCookiesConditions = value;
		},

		//asignamos lenguaje + headers + meta
		SET_LOCALE_LANG: (state, lang) => {
			i18n.locale = lang;
			document.querySelector("html").setAttribute("lang", lang);
		},
	},

	actions: {
		//SET LANG
		SET_USERLANG: ({ commit }, payload) => {
			try {
				//if change lang assign one
				if (i18n.locale === payload) commit("SET_LOCALE_LANG", payload);

				//if yet loaded lang assign it
				if (cfg.languages.includes(payload))
					return commit("SET_LOCALE_LANG", payload);

				// If the language hasn't been loaded yet
				return import(
					/* webpackChunkName: "lang-[request]" */ `@/locale/${payload}.js`
				).then((messages) => {
					i18n.setLocaleMessage(payload, messages.default[payload]);
					cfg.languages.push(payload);

					return commit("SET_LOCALE_LANG", payload);
				});
			} catch (err) {
				return false;
				//commit("SET_APP_ERROR", `175 - [set i18n] - ${err.message}`);
			}
		},

		// globales modificaciones de configuraciones
		GET_SETTINGS: ({ commit, state }) => {
			try {
				// assign settings localstorage to settings variable
				const settings = localStorage.getItem("settings");
				// check if settings variable is not null
				if (settings !== null) {
					// if not null assign the new setting array to the setting state
					commit("SET_SETTINGS", JSON.parse(settings));
				} else {
					// if null set the default state settings to localstorage
					localStorage.setItem("settings", JSON.stringify(state.settings));
				}
			} catch (err) {
				commit("SET_APP_ERROR", err.message);
			}
		},

		UPDATE_SETTINGS: ({ commit, state }, payload) => {
			try {
				const { settings } = state;

				for (let i in payload) {
					settings[i] = payload[i];
				}

				commit("SET_SETTINGS", settings);

				localStorage.setItem("settings", JSON.stringify(settings));
			} catch (err) {
				commit("SET_APP_ERROR", err.message);
			}
		},
	},
};
