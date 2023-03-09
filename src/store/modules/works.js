import cfg from "@/config.js";
import { i18n } from "@/plugins/i18n.js";
import data from "@/data.json";

export default {
	namespaced: true,
	state: {
		//works
		worksCurrentPageLoaded: 0,
		worksItems: data,
		worksLoading: false,
		worksError: null,
		worksMessage: null,

		//details
		detailPagePreviousHash: null,
		detailPageHash: null,
		detailPageContent: {},
		detailsLoading: false,
		detailsError: null,
	},

	getters: {
		GET_WORK_ITEMS: (state) => {
			return state.worksItems;
		},

		//details page
		GET_DETAILS_CONTENT: (state) => {
			return state.detailPageContent;
		},
	},

	mutations: {
		SET_WORK_ITEMS: (state, value) => {
			const { worksItems } = state;

			if (worksItems.length == undefined) {
				state.worksItems = value;
			} else {
				//listado de hash de la lista
				const hash = worksItems.map((m) => {
					if (m.hash) return m.hash;
				});

				let outFiltred = value.filter((f) => {
					if (!hash.includes(f.hash)) return f;
				});

				let result = [...worksItems, ...outFiltred];

				state.worksItems = result;
			}
		},
	},

	actions: {
		async GET_HOME_WORKS({ commit, state }) {
			if (state.worksLoading) return;
		},

		async GET_DETAILS_WORKS({ commit, state }, payload) {
			const f = state.worksItems.filter((i) => i.hash === payload);
			if (f.length) state.detailPageContent = f[0];
		},
	},
};
