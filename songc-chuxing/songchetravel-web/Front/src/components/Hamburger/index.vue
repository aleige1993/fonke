<template>
	<div>
		<svg t="1492500959545" @click="toggleClick" class="wscn-icon hamburger" :class="{'is-active':isActive}" style="" viewBox="0 0 1024 1024"
		  version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
			<path d="M64.012 149.386h896.174v128.025H64.012zM64.012 448.111h896.174v128.025H64.012zM64.012 746.835h896.174V874.86H64.012z" fill="#333" p-id="2037"></path>
</path>
		</svg>
	</div>
</template>

<script>
  export default {
    name: 'hamburger',
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      toggleClick: {
        type: Function,
        default: null
      }
    }
  }
</script>

<style scoped>
.hamburger {
	display: inline-block;
	position: relative;
	top: 2px;
	cursor: pointer;
	width: 28px;
	height: 28px;
	transform: rotate(90deg);
	transition: .38s;
	transform-origin: 50% 50%;
}

.hamburger.is-active {
	transform: rotate(0deg);
}

</style>
