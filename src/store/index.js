import Vue from 'vue';
import Vuex from 'vuex';

//Modules
import coreModule from '@/store/modules/core';
import worksModule from '@/store/modules/works';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		core: coreModule,
		works: worksModule,
	},
});

export default store;
