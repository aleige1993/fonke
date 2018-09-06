<template>
	<iframe width="100%" :style="{height:iframeHeight+'px'}" :src="api + '/car/monitor/toMap'" frameborder="0"></iframe>
</template>

<script>
	import ajax from 'utils/ajax'
	import APIADDRESS from 'api/APIADDRESS'
	export default {
		data() {
			return {
				iframeHeight: "100%",
				api: APIADDRESS
			};
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
				_ret = screenHeight - headHeight;
				return _ret;
			}
		}
	};
</script>

<style scoped>

</style>