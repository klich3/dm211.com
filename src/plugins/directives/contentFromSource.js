/*
	Author: Anthony Sychev [hello at dm211 dot com]
	
	desc: this directive clone come dom to another one is usefull for
		  clone desktop menu to mobile version, or repeat some content in page.
	
	how to use:
	
	main.js -> 
		
		import contentFromSource from "@/plugins/directives/contentFromSource.js";

		Vue.directive("from-source", contentFromSource);
	
	template -> 
		dom: is a dom like div, span, p or query select like class -> .class or #id
	
		<div v-from-source="{ dom:'in-viewport', to:'.header' }"></div>
		
		si se indica el "to" -> haremos que la copia se realize dentro de ese dom
*/

export default {
	inserted: function (el, binding /*, vnode*/) {
		const domItem = binding.value.dom || false;
		const domTo = binding.value.to || false;

		if (!domItem || domItem === "") return;

		const dom_from = document.querySelectorAll(`${domItem}`);

		if (dom_from)
			dom_from.forEach(function (item) {
				//content source
				const cloned = !/String/.test(typeof item)
					? item.cloneNode(true)
					: document.querySelector(`${domItem}`).cloneNode(true);

				//destination to clone
				domTo
					? document.querySelector(`${domTo}`).appendChild(cloned)
					: el.appendChild(cloned);
			});
	},
};
