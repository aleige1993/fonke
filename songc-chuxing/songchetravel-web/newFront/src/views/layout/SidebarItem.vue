<template>
	<div class='menu-wrapper'>
		<template v-for="item in routes">
			<router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
				<el-menu-item @click="path" :index="item.path+'/'+item.children[0].path"  class='submenu-title-noDropdown'>
					<i class="iconfont sideBarIcon" v-if='item.icon' v-html="item.icon"></i><span slot="title">{{item.children[0].name}}</span>
				</el-menu-item>
			</router-link>
			<el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
				<template slot="title">
					<i class="iconfont sideBarIcon" v-if='item.icon' v-html="item.icon"></i><span>{{item.name}}</span>
				</template>
				<template v-for="child in item.children" v-if='!child.hidden'>
					<sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
					<router-link v-else :to="item.path+'/'+child.path">
						<el-menu-item @click="path" :index="item.path+'/'+child.path">
								<i class="iconfont sideBarIcon" v-if='child.icon' v-html="child.icon"></i><span>{{child.name}}</span>
						</el-menu-item>
					</router-link>
				</template>
			</el-submenu>
		</template>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    },
		computed: {
      ...mapGetters([
        'isMobile'
      ])
		},
		methods: {
			path() {
				if (this.isMobile) {
					this.$store.dispatch('ToggleSideBar')
				}
      },
		}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import '../../styles/color';
	.sideBarIcon {
		color: #fff;
		font-size: 16px;
		margin-right: 10px;
		width: 20px;
		display: inline-block;
	}
	.el-submenu{
		.el-menu{
			li {
				background-color: #F1F3FA;
				margin-bottom: 10px;
				line-height: 40px;
				height: 40px;
				border-radius: 20px;
				color: $block;
				padding-left: 20px;
			}
			.sideBarIcon{
				color: $gray;
				font-weight: normal;
			}
		}
	}
</style>

