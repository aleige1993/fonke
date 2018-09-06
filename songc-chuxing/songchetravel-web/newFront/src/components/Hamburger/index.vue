<template>
	<div>
		<svg @click="toggleClick" class="wscn-icon hamburger" :class="{'is-active':isActive}" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<!-- Generator: Sketch 47 (45396) - http://www.bohemiancoding.com/sketch -->
				<desc>Created with Sketch.</desc>
				<defs></defs>
				<g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
						<g id="车辆列表-普通搜索" transform="translate(-210.000000, -28.000000)" fill="#FFFFFF">
								<g id="header">
										<g id="menu-icon" transform="translate(210.000000, 28.000000)">
												<path d="M0,0 L10,0 L10,10 L0,10 L0,0 Z M14,0 L24,0 L24,10 L14,10 L14,0 Z M14,14 L24,14 L24,24 L14,24 L14,14 Z M0,14 L10,14 L10,24 L0,24 L0,14 Z" id="Combined-Shape"></path>
										</g>
								</g>
						</g>
				</g>
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
	transform: rotate(-45deg);
	transition: .38s;
	transform-origin: 50% 50%;
}

.hamburger.is-active {
	transform: rotate(0deg);
}

</style>
