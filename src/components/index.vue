<template>
	<div class="w-max-width">
		<!-- 导航 -->
		<wMenu></wMenu>
		<el-row>
			<h2 class="w-h2"></h2>
			还没想好首页内容，欢迎大家在收件箱提意见，如若被采用，必有重赏→_→
		</el-row>
		<el-row>
			<h2 class="w-h2">站主收件箱:</h2>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<el-form :rules="rules" :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
				<el-form-item label="手机号码" prop="phone">
					<el-input v-model="formInline.phone" placeholder="输入您的联系号码"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="formInline.name" placeholder="怎么称呼您呢"></el-input>
				</el-form-item>
				<el-button type="primary" @click="sendMessage">发件</el-button>
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" placeholder="随便说点什么吧" v-model="formInline.message">
				</el-input>
			</el-form>
			</el-col>
		</el-row>
		<el-row v-if="showmessage">
			<div v-for="(item,index) in datalist":key="index">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-divider>{{item.createTime}}</el-divider>
				</el-col>
				<el-col :xs="24" :sm="15" :md="17" :lg="18" :xl="18">
					留言人:{{item.name}}-{{item.phone}}:<br>
					内容&nbsp;&nbsp;&nbsp;:{{item.message}}
				</el-col>
				<el-col :xs="24" :sm="9" :md="7" :lg="6" :xl="6">
					<el-input v-model="item.remark" @blur='saveRemark(item)'></el-input>
				</el-col>
			</div>
		</el-row>
		<!--<el-row>
			<h2 class="w-h2">分享创业经验,共享创业项目</h2>
			<p >版块开发中.</p>
		</el-row>-->
		<el-row >
			<h2 class="w-h2">新闻传送门:</h2>
			<a target="_blank" href="http://www.nbd.com.cn/">每日经济新闻(每经网)http://www.nbd.com.cn/</a><br>
			<a target="_blank" href="http://www.chinanews.com/">中国新闻网http://www.chinanews.com/</a><br>
			<a target="_blank" href="http://gz.southcn.com/">广州新闻.南方网http://gz.southcn.com/</a><br>
			<a target="_blank" href="https://news.sina.com.cn/">新浪新闻https://news.sina.com.cn/</a><br>
			<a target="_blank" href="https://news.baidu.com/">百度新闻https://news.baidu.com/</a><br>
			<a target="_blank" href="http://news.k618.cn/">未来网资讯http://news.k618.cn/</a><br>
			<a target="_blank" href="http://news.sohu.com/">搜狐新闻http://news.sohu.com/</a><br>
			<a target="_blank" href="https://news.163.com/">网易新闻https://news.163.com/</a><br>
		</el-row>
		<!--<el-row>
		<h2 class="w-h2">成功案例:</h2>
			<el-collapse>
				<el-collapse-item>
					<template slot="title">
						微信小程序"致尚go"
					</template>
					<p>网上商城,加个分销在系统里面
打算是在学校运营,一间学校一个模块</p>
				</el-collapse-item>
				<el-collapse-item title="官网项目">
				</el-collapse-item>
				<el-collapse-item title="设想:我的100个愿望">
					<p>1.定制自己的愿望清单;</p>
					<p>2.大家一起完成心愿</p>
				</el-collapse-item>
				<el-collapse-item title="收合伙人">
					<p>下方留言,一起发财</p>
				</el-collapse-item>
			</el-collapse>
		</el-row>-->
		<wFooter></wFooter>
	</div>
</template>
<script>
	import qs from 'qs';
	export default {
		components: {
			wMenu: require('./menu.vue').default,
			wFooter: require('./footer.vue').default
		},
		data() {
			return {
				BASE_API: process.env.BASE_API,
		        formInline: {
					searchInfo:"",
					phone:sessionStorage.getItem("customerPhone")?sessionStorage.getItem("customerPhone"):'',
					name:"",
					message:"",
		        },
		        rules: {
		        	phone: [{required:true, message: '请输入电话', trigger: 'blur' }],
		        	name: [{required: true, message: '请输入姓名', trigger: 'blur' }],
		        },
		        datalist:[],
				showmessage:(sessionStorage.getItem("customerPhone")&&sessionStorage.getItem("customerPhone")=='18814117904')?true:false,
			}
		},
		methods: {
			sendMessage(){
				this.$refs['formInline'].validate((valid) => {
		          if (valid) {
					let that = this;
					this.$axios.post(this.BASE_API + 'leaveMessage/insert', qs.stringify({
						phone: this.formInline.phone,
						name: this.formInline.name,
						message: this.formInline.message,
					}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
					).then(function(res) {
						console.log(res);
						if(res.data.success==true){
							that.$message({showClose: true,type:'success',message: "感谢您的留言,西瓜先生会尽快回复您."});
							that.formInline.message="";
						}else{
							alert(res.data.message)
						}
					}).catch(function(err) {
						console.log(err);
					});
		          } else {
		            console.log('error submit!!');
		            return ;
		          }
		        });
			},
			getMessage(){
				let that = this;
				this.$axios.post(this.BASE_API + 'leaveMessage/select', qs.stringify({
				}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
				).then(function(res) {
					console.log(res);
					if(res.data.success==true){
						that.datalist=res.data.data;
					}else{
						alert(res.data.message)
					}
				}).catch(function(err) {
					console.log(err);
				});
			},
			saveRemark(item){
				let that = this;
				this.$axios.post(this.BASE_API + 'leaveMessage/update', qs.stringify({
					id:item.id,
					remark:item.remark
				}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
				).then(function(res) {
					debugger;
					if(res.data.success==true){
						that.$message({showClose: true,type:'success',message: "备注已保存."});
					}else{
						alert(res.data.message)
					}
				}).catch(function(err) {
					console.log(err);
				});
			}
		},
		mounted() {
			this.getMessage();
		},
	}
</script>

<style>
	.w-max-width {
		max-width: 1140px;
		margin: 0 auto;
	}
	
	.w-sbumit-button {
		margin-top: 34px;
	}
	.w-nav-item-div{
		/*text-align: center;*/
	}
	.w-nav-item-div img{
		height: 150px;
	}
	.w-h2 {}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>