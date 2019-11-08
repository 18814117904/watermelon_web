<template>
	<div class="w-menu">
		<el-row :gutter="10">
			<el-col :xs="4" :sm="4" :md="3" :lg="3" :xl="3" class="w-logo-contain">
				<!-- -->
				<el-link :href='BASE_URL' class="w-logo">
					<img src="http://qncdnzhishang.panzhihui.cn/xgz/xgz-logo2.png" />
				</el-link>
			</el-col>
			<el-col :xs="0" :sm="2" :md="5" :lg="5" :xl="5">
				<div class="">&nbsp;</div>
			</el-col>
			<!--<el-popover placement="top-start" width="200" trigger="hover">
				<p>待开发</p>-->
				<!--<p>1.收录有用的网络资源信息</p>
				<p>2.查找大家公开的资源信息</p>
				<p>3.管理自己的仓库信息</p> slot="reference"-->
				<el-col :xs="5" :sm="4" :md="3" :lg="3" :xl="3">
					<div @click="changeMenu('wear')" :class="menuSelect=='wear'?'w-logo w-link-selected':'w-logo w-link-normal'">
						<span class="">
							天天搭
						</span>
					</div>
				</el-col>
			<!--</el-popover>
			<el-popover placement="top-start" width="200" trigger="hover">
	 			<p>1.梳理或记录每日任务,便于跟进任务,不会忘记;</p>
				<p>2.记住现在的心情,让生活留下痕迹,这将是未来最珍贵的财富;</p> slot="reference"-->
				<el-col :xs="5" :sm="4" :md="3" :lg="3" :xl="3">
					<div  @click="changeMenu('diary')" :class="menuSelect=='diary'?'w-logo w-link-selected':'w-logo w-link-normal'">
						<span>
								记事本
						</span>
					</div>
				</el-col>
			<!--</el-popover>
			<el-popover placement="top-start" width="200" trigger="hover">
				<p>1.记住问题和问题的解决方案,便于以后处理相同问题;</p>
				<p>2.查找大家的解决方案;</p>    slot="reference" -->
				<el-col :xs="5" :sm="4" :md="3" :lg="3" :xl="3">
					<div @click="changeMenu('solution')" :class="menuSelect=='solution'?'w-logo w-link-selected':'w-logo w-link-normal'">
						<span class="">
							方案库
						</span>
					</div>
				</el-col>
<!--			</el-popover>-->
			<el-col :xs="0" :sm="2" :md="4" :lg="4" :xl="4">
				<div class="">&nbsp;</div>
			</el-col>
			<el-col :xs="5" :sm="4" :md="3" :lg="3" :xl="3" class="w-logo-contain">
				<div class="w-logo">
					<a :href="LOGIN_URL" class="w-logo-item">
					{{customerPhone}}
					</a>
					<span v-if="phone" @click="logout" class="w-logo-item">/退出</span>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				BASE_URL:process.env.BASE_URL,
				BASE_API:process.env.BASE_API,
				menuSelect:sessionStorage.getItem("menuSelect"),
				phone:sessionStorage.getItem("customerPhone"),
				customerPhone:sessionStorage.getItem("customerPhone")?sessionStorage.getItem("customerPhone"):'登录',
				LOGIN_URL:sessionStorage.getItem("customerPhone")?process.env.BASE_URL:(process.env.BASE_URL+'/login'),
			}
		},
	    methods: {
			logout(){
				sessionStorage.removeItem("customerId")
				sessionStorage.removeItem("customerPhone")
				sessionStorage.removeItem("customerNickname")
				this.$router.push({name:'login'});
				this.$axios.post(this.BASE_API + 'customer/logout', null,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(res) {}).catch(function(err) {});
			},
			changeMenu(menuIndex){
				if(menuIndex=="diary"){
					sessionStorage.setItem("menuSelect","diary");
					this.$router.push({name:'diary'});
				}else if(menuIndex=="solution"){
					sessionStorage.setItem("menuSelect","solution");
					this.$router.push({name:'solution'});
				}else if(menuIndex=="wear"){
					sessionStorage.setItem("menuSelect","wear");
					this.$router.push({name:'wear'});
				}else{
					console.log('无该菜单')
				}
			}
	    }
	}
</script>

<style>
	.w-logo-contain{
	}
	.w-logo-contain:hover{
	}
	.w-logo{
		min-height: 30px;
		width: 100%;
		font-size: 15px;
	    display: flex;
	    justify-content:center;
	    align-items:Center;
	}
	.w-logo img{
		height:27px;
	}
	.w-logo:hover{
		color: #409eff;
		border-bottom: 1px solid #409eff;
	}
	.w-menu{
		margin-bottom: 15px;
		border-bottom:1px solid #e4e7ed;
	}
	.w-link-normal {
		border-bottom: 0px ;
	}
	.w-link-selected {
		border-bottom: 1px solid #409eff;
	}
	.w-logo-item{
		text-decoration:none;
		color: #001;
	}
	.w-logo-item:hover{
		color: #409eff;
	}
</style>