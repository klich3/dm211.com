/*
	Author: Anthony Sychev [hello at dm211 dot com]
	
	how to use:
	
	main.js -> 
		
		import isWebpSupport from "@/plugins/isWebpSupport.js";

		Vue.use(isWebpSupport);
		
	-----
		
	template.vue -> <img :src="$toWebp('<url>')"
	
	call by function -> this.$webp -> return true or false is support format
	
	call by style ->
	
			template -> <div :style="homeHandCSS">
			script -> computed: {
				homeHandCSS() {
					return {
						'--home-imageHand': `url(${this.$toWebp('/src/assets/img/<image>')})`,
					}
				}
			css -> background: var(--home-imageHand)
	
*/

export default {
	install: (Vue, config) => {
		let isWebpSupport = false;

		try {
			isWebpSupport =
				document
					.createElement("canvas")
					.toDataURL("image/webp")
					.indexOf("data:image/webp") == 0;
		} catch (e) {
			console.warn("This browser not support Webp!");
		}

		Vue.prototype.$webp = isWebpSupport;
		Vue.prototype.$toWebp = (url) => {
			let p_url = isWebpSupport
				? url.toString().replace(/(\.jpg|\.png)/g, ".webp")
				: url;
			return p_url;
		};
	},
};
