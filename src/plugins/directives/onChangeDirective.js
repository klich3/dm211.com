/*
	Author: Anthony Sychev [hello at dm211 dot com]
	
	how to use:
	
	main.js -> 
		
		import onChangeDirective from "@/plugins/directives/onChangeDirective.js";

		Vue.directive("on-change", onChangeDirective);
	
	template -> 
		class: on appear this class trigger call callback function
		data: if nedeed to parse data to function callback
	
		<div v-on-change="{ class:'in-viewport', data: {} }" @on-change="function_callback"></div>
		
	function_callback -> attbutes
		el -> dom element
		data -> parsed from data
*/
export default {
	bind: function (el, binding, vnode) {
		let parseDataToCallback = binding.value.data || {};

		let observer = new MutationObserver((mutations) => {
			const classToWatch = binding.value.class;

			for (const m of mutations) {
				const newValue = m.target.getAttribute(m.attributeName);

				if (new RegExp(classToWatch, "igm").test(newValue)) {
					const handlers =
						(vnode.data && vnode.data.on) ||
						(vnode.componentOptions && vnode.componentOptions.listeners);

					if (handlers && handlers["on-change"])
						handlers["on-change"].fns(el, parseDataToCallback);

					observer.disconnect();
				}
			}
		});

		observer.observe(el, {
			attributes: true,
			attributeOldValue: true,
			attributeFilter: ["class"],
		});
	},
	/*
	unbind: function(el) {
		//el.disconnect();
	}
	*/
};
