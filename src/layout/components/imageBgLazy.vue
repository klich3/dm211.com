<template>
	<div :style="showImage"></div>
</template>

<script>
import cfg from "@/config.js";
import axios from "axios";
import { setup } from "axios-cache-adapter";

export default {
	name: "imageLazyBgLoader",

	props: {
		imageAddToLoadCallback: {
			type: Function,
			required: false,
			default: function () {},
		},
		imageProgressCallback: {
			type: Function,
			required: false,
			default: function () {},
		},
		imageErrorCallback: {
			type: Function,
			required: false,
			default: function () {},
		},
		imageSuccessCallback: {
			type: Function,
			required: false,
			default: function () {},
		},
	},

	data() {
		return {
			domName: 0,
			percentageLoaded: 0,
			observer: null,
			observerImageUrl: null,
			imageWidth: 0,
			imageHeight: 0,
			imageState: "loading",
			asyncImage: new Image(),
		};
	},

	computed: {
		showImage() {
			if (this.imageState === "loaded")
				return `background-image: url(${this.asyncImage.src});`;

			return "";
		},
	},

	methods: {
		fetchImage(url) {
			this.imageState = "loading";

			const _this = this;

			const cache = setup({
				//baseURL: 'https://'+cfg.uid+'/',
				cache: {
					maxAge: 15 * 60 * 1000,
				},
			});

			cache
				.get(url, {
					responseType: "arraybuffer", //'blob'
				})
				.then((r) => {
					_this.imageState = "loaded";
					_this.imageWidth = _this.asyncImage.naturalWidth;
					_this.imageHeight = _this.asyncImage.naturalHeight;

					_this.$el.dataset.status = _this.imageState;

					const blob = new Blob([r.data]);
					_this.asyncImage.src = window.URL.createObjectURL(blob);

					if (_this.imageSuccessCallback) _this.imageSuccessCallback();
				})
				.catch(() => {
					_this.imageState = "error";

					_this.$el.dataset.status = _this.imageState;

					if (_this.imageErrorCallback) _this.imageErrorCallback();
				});

			this.domName = Math.floor(Math.random() * (0, 9999));

			if (this.imageAddToLoadCallback)
				this.imageAddToLoadCallback(this.domName);
		},

		//listener si la clase cambia
		w_classChange(fn_className, fn_dom_classes) {
			if (
				this.observerImageUrl &&
				new RegExp(fn_className).test(fn_dom_classes)
			)
				this.fetchImage(this.observerImageUrl);
		},
	},

	mounted() {
		if (this.$el.dataset.listenclass) {
			//con watcher si cambia la classe indicada en data-listenclass del mismo objeto
			this.observerImageUrl = this.$el.dataset.src;

			this.observer = new MutationObserver((mutations) => {
				for (const m of mutations) {
					const newValue = m.target.getAttribute(m.attributeName);
					this.$nextTick(() => {
						this.w_classChange(this.$el.dataset.listenclass, newValue);
					});
				}
			});

			this.observer.observe(this.$el, {
				attributes: true,
				attributeOldValue: true,
				attributeFilter: ["class"],
			});
		} else {
			//simple load
			this.$nextTick(() => {
				this.fetchImage(this.$el.dataset.src);
			});
		}
	},

	beforeDestroy() {
		if (this.observer) this.observer.disconnect();
	},
};
</script>
