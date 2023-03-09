<script>
/*
	DOCS:
		Dynamic render functions: https://vuejs.org/v2/guide/render-function.html
		Directives: https://vuejs.org/v2/guide/custom-directive.html

	Sample:

	[{
		"tag": "div",
		"dom": {
			"class": ["w-1-1", "pb-3", "debug"],
			"domProps": {
				"innerHTML": "<h1 class='txt@c'><b>UN CAVA AMB NOM PROPI</b></h1>"
			},
			"attrs": {
				"data-id": "1",
				"wtoh": false
			},
			"directives":[ {
				"name":"in-viewport",
				"modifiers": {
					"once":true
				}
			}]
		},
		"child": [{
			"tag": "img",
			"dom": {
				"attrs": {
					"src": "ontent/7cf570130d6c26ff37a916632bda9029.jpg",
					"alt": "alt okey",
					"class": "mc e"
				}
			}
		}]
	}]
*/

export default {
	name: "JsonParser",

	props: {
		jsonContent: {
			type: Array,
			required: true,
		},
	},

	render(h) {
		if (this.jsonContent.length == 0) return;

		const filteredChildren = this.jsonContent.filter((child) => child.tag);

		let parseRender = (j) => {
			if (!j) return [];

			return j.map((r) => {
				let dom = Object.assign({}, r.dom);

				return h(r.tag, dom, parseRender(r.child));
			});
		};

		//render all
		return h(
			"div",
			{
				class: ["content-container"],
			},
			parseRender(filteredChildren)
		);
	},
};
</script>
