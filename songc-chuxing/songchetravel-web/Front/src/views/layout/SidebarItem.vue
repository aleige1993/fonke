<template>
	<div class='menu-wrapper'>
		<template v-for="item in routes">

			<router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
				<el-menu-item :index="item.path+'/'+item.children[0].path"  class='submenu-title-noDropdown'>
					<i class="iconfont sideBarIcon" v-if='item.icon' v-html="item.icon"></i><span class="m-name" slot="title">{{item.children[0].name}}</span>
				</el-menu-item>
			</router-link>

			<el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
				<template slot="title">
					<i class="iconfont sideBarIcon" v-if='item.icon' v-html="item.icon"></i><span class="m-name">{{item.name}}</span>
				</template>
				<template v-for="child in item.children" v-if='!child.hidden'>

					<sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>

					<router-link v-else :to="item.path+'/'+child.path">
						<el-menu-item :index="item.path+'/'+child.path">
								<i class="iconfont sideBarIcon" v-if='child.icon' v-html="child.icon"></i><span class="m-name">{{child.name}}</span>
						</el-menu-item>
					</router-link>

				</template>

			</el-submenu>

		</template>
	</div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.sideBarIcon {
		color: #6F7597;
		font-size: 16px;
		margin-right: 10px;
		width: 20px;
		display: inline-block;
	}
	.m-name {
		color: #6F7597;
		font-weight: bold;
	}
</style>

