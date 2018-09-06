<template>
	<el-menu class="navbar" mode="horizontal">
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
		<levelbar></levelbar>
		<!-- <tabs-view></tabs-view> -->
		<error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>
		<screenfull v-if="!isMobile" class='screenfull'></screenfull>
		<div class="avatar-container" :class="{ mobile: isMobile}">
			<el-dropdown @command="command">
				<span class="el-dropdown-link user-wrap">
					<span class="username">
						<i class="iconfont">&#xe68a;</i>
						<span v-if="!isMobile">{{ userInfo.username }}</span>
						<!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
					</span>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="rePwd">修改密码</el-dropdown-item>
					<el-dropdown-item command="updateSelf">修改个人信息</el-dropdown-item>
					<el-dropdown-item command="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>

	</el-menu>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Levelbar from './Levelbar';
  import TabsView from './TabsView';
  import Hamburger from 'components/Hamburger';
  import Screenfull from 'components/Screenfull';
  import ErrorLog from 'components/ErrLog';
  import errLogStore from 'store/errLog';

  import { getInfo } from 'api/login'
  export default {
    components: {
      Levelbar,
      TabsView,
      Hamburger,
      ErrorLog,
      Screenfull,
			Levelbar
    },
    data() {
      return {
				log: errLogStore.state.errLog,
				userHead: require('assets/userHead.jpg'),
				userInfo: {}
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar',
				'isMobile'
      ])
    },
    mounted () {
    	const self = this
    	getInfo().then(res => {
    		self.userInfo = res.data.entity
    	}).catch(err => {
    		self.$message.error(err)
    	})
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
			command (ind) {
				switch (ind) {
					case 'logout':
					this.logout(); break;
					case 'rePwd':
					this.$router.push({path: '/modiflyPwd'}); break;
					case 'updateSelf':
					this.$router.push({path: '/updateSelf'}); break;
				}
			},
      logout() {
      	this.$confirm('退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('LogOut').then(res => {
						//this.$router.push('/login')
	          location.reload(); // 为了重新实例化vue-router对象 避免bug
	        });
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import '../../styles/color';
	.navbar {
			height: 60px;
			line-height: 60px;
			border-radius: 0px !important;
			background-color: $blue;
			.hamburger-container {
					line-height: 50px;
					height: 60px;
					float: left;
					padding: 10px 20px;
			}
			.errLog-container {
					display: inline-block;
					position: absolute;
					right: 200px;
			}
			.screenfull {
					position: absolute;
					right: 120px;
					top: 16px;
					color: red;
			}
			.logout{
				position: absolute;
				right: 20px;
				height: 60px;
				cursor: pointer;
			}
			.avatar-container {
				height: 50px;
				display: inline-block;
				position: absolute;
				right: 10px;
				top: 0;
				.userHead{
					width: 46px;
					height: 46px;
					border-radius: 50%;
				}
				.username{
					font-size: 13px;
					width: 100px;
					height: 52px;
					text-align: center;
					color: #fff;
					display: block;
					line-height: 46px;
					margin-top: 7px;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					cursor: pointer;
					.iconfont{
						font-size: 16px;
						margin-right: 10px;
						color: #fff;
					}
					.el-icon-arrow-down{
						font-size: 12px;
					}
				}
				&.mobile {
					.username {
						width: auto;
						.iconfont{
							font-size: 22px;
						}
					}
				}
			}
	}
  @media screen and (max-width: 768px) {
    .navbar {
      height: 50px;
      line-height: 50px;
			position: fixed;
			z-index: 99;
			width: 100%;
			top: 0;
      .hamburger-container {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        padding-top: 6px;
        position: relative;
        z-index: 101;
      }
      .avatar-container {
        z-index: 101;
        .username {
          margin-top: 0;
        }
      }
    }
  }
</style>



