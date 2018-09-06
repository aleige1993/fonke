<template>
	<iframe width="100%" :style="{height:iframeHeight+'px'}" :src="url" frameborder="0"></iframe>
</template>

<script>
	import ajax from 'utils/ajax'
	import APIADDRESS from 'api/APIADDRESS'
	export default {
		data() {
			return {
				iframeHeight: "100%",
				api: APIADDRESS,
				url: '',
			};
		},
		created () {
			if(!this.api) {
				this.url = '/car-map.html'
			} else {
				this.url = 'http://192.168.6.110:8800/'
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.iframeHeight = this.getHeight();
			});
		},
		methods: {
			getHeight() {
				var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
				var headObj = document.querySelector(".g-head");
				var headHeight = 0;
				var _ret = "";
				if (headObj) {
					headHeight = headObj.offsetHeight;
				}
				_ret = screenHeight - 120;
				return _ret;
			}
		}
	};
</script>

<style scoped>

</style>