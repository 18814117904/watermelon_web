<template>
	<div class="w-max-width">
		<!-- 导航-->
		<wMenu></wMenu> 
		<!-- 导航 -->

		<br>
		<el-form :inline="true"  class="demo-form-inline w-aligncenter">
			<el-form-item label="">
				<el-input v-model="query_type_string" placeholder="请输入类别"style="width: 105px;"></el-input>
				<el-input v-model="query_title" placeholder="请输入标题" style="width: 150px;"></el-input>

				<el-button type="primary" @click="query">查询</el-button>
				<el-button type="primary" v-if="!new_is_show" @click="show_new">新建文章</el-button>
				<el-button type="primary" v-if="new_is_show" @click="show_new">关闭新建</el-button>
			</el-form-item>
		</el-form>

		<div class="block">
			<div>
				<div placement="top" v-if="new_is_show">
					<el-card>
						<template>
							<el-row :gutter="10" class="w-marginbottom w-aligncenter">
							    <el-date-picker
							      v-model="new_date"
							      type="datetime"
							      placeholder="选择日期时间">
							    </el-date-picker>
							    <el-input v-model="create_title" placeholder="请输入标题"></el-input>
							    <el-input v-model="create_type" placeholder="请输入类型"></el-input>
								<el-button type="primary" @click="new_button_save">保存</el-button>
							</el-row>
							<quill-editor v-model="new_content" ref="myQuillEditor" >
							</quill-editor>
						</template>
					</el-card>
				</div>
				<div  v-for="(item,index) in datalist":key="index">
					<el-card >
						<!--<p v-if="!item.edit" v-html='item.content'></p>-->
						<p v-if="item.edit" >
							<quill-editor v-model="item.content" ref="myQuillEditor" >
							</quill-editor>
						</p>
						<div class="card_bottom">
							<span v-if="!item.edit">{{item.typeString}}-----</span>
							<span v-if="!item.edit">{{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<span v-if="!item.edit">【阅读量:{{item.readTimes}}&nbsp;&nbsp;</span>
							<span v-if="!item.edit">时间:{{item.timeString}}】</span>
							<span @click="click_edit(index)" class="card_bottom_item">编辑</span>
							<span v-if="item.edit" @click="save_edit_button(index,item)" class="card_bottom_item">保存</span>
							<span v-if="item.edit" @click="save_edit_button_close(index,item)" class="card_bottom_item">保存且关闭编辑</span>
							<span @click="delete_item(index,item)" class="card_bottom_item">删除</span>
						</div>
					</el-card>
				</div>
				<div>
					<span v-if="pageInfo&&pageInfo.hasPreviousPage" @click="changePage(1)">首页</span>
					<span v-if="pageInfo&&pageInfo.hasPreviousPage" @click="changePage(pageInfo.prePage)">上一页</span>
					<span v-if="pageInfo">当前页:{{pageInfo.pageNum}}</span>
					<span v-if="pageInfo&&pageInfo.hasNextPage" @click="changePage(pageInfo.nextPage)">下一页</span>
					<span v-if="pageInfo&&pageInfo.hasNextPage" @click="changePage(pageInfo.pages)">尾页</span>
				</div>
			</div>
		</div>
		<wFooter></wFooter>

	</div>
</template>
<script>
	import { quillEditor } from 'vue-quill-editor'
    import qs from 'qs';
	export default {
		components: {
			wMenu: require('../menu.vue').default,
			wFooter: require('../footer.vue').default
		},
		data() {
			return {
				BASE_URL: process.env.BASE_URL,
				BASE_API: process.env.BASE_API,
				new_date:Date.now(),
				query_title:"",
				query_type_string:"",
				query_content:"",
				create_title:"",
				pageSize:10,
				pageNum:1,
				create_type_string:"",
				new_is_show:false,
				datalist:[{date:"2019-06-02",content:"例子:只能看到自己的日志和心情"},{date:"2018-01-01",content:"例子:这是许久以前的美好回忆"}],
				new_content: "",
				editorOption: {
					modules: {
						toolbar: [
							['bold', 'italic', 'underline', 'strike', {
								'header': []
							}, {
								'size': []
							}], // toggled buttons
							['code-block', {
								'list': 'ordered'
							}, {
								'list': 'bullet'
							}]
						]
					}
				},
				pageInfo:null,
			}
		},
		methods: {
			query(){
				let that = this;
				this.$axios.post(this.BASE_API + 'article/select', qs.stringify({
					title: this.query_title,
					typeString: this.query_type_string,
					pageSize:this.pageSize,
					pageNum:this.pageNum,
				}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
				).then(function(res) {
					console.log(res);
					if(res.data.success==true){
						that.datalist = res.data.data.list;
						that.pageInfo = res.data.data;
						that.pageInfo.list = null;
					}else if(res.data.message&&res.data.message=='用户未登录'){
						that.$message({showClose: true,type:'error',message: "登录后使用记事"})
						sessionStorage.removeItem("customerId")
						sessionStorage.removeItem("customerPhone")
						sessionStorage.removeItem("customerNickname")
						this.$router.push({name:'login'});
					}else{
						that.$message({showClose: true,type:'error',message: res.data.message})
					}
				}).catch(function(err) {
					console.log(err);
				});
			},
			new_button_save() { //新建日志
				let that = this;
				this.$axios.post(this.BASE_API + 'article/insert', qs.stringify({
					'time':this.dateFormat(this.new_date),
					'createType': this.create_type,
					'createTitle': this.create_title,
					'timeString': this.dateFormat(this.new_date),
				}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
				).then(function(res) {
					console.log(res);
					if(res.data.success==true){
						that.new_content="";
						that.new_is_show=false;
						that.query();
					}else if(res.data.message&&res.data.message=='用户未登录'){
						that.$message({showClose: true,type:'error',message: "长时间未操作,请重新登录后再记事."})
						sessionStorage.removeItem("customerId")
						sessionStorage.removeItem("customerPhone")
						sessionStorage.removeItem("customerNickname")
//						this.$router.push({name:'login'});
					}else{
						that.$message({showClose: true,type:'error',message: res.data.message})
					}
				}).catch(function(err) {
					console.log(err);
				});
			},
			show_new(){
				if(this.new_is_show){
					this.new_is_show=false;
				}else{
					this.new_is_show=true;
				}
			},
			click_edit(index){
				if(this.datalist[index].edit){
					this.datalist[index].edit=false;
				}else{
					this.datalist[index].edit = true;
				}
				console.log("change edit to = "+this.datalist[index].edit)
				this.new_is_show = !this.new_is_show;
				this.new_is_show = !this.new_is_show;
			},
			save_edit_button(index,item){
				let that = this;
				this.$axios.post(this.BASE_API + 'article/update', qs.stringify({
					'id':item.id,
					'content': item.content,
				}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
				).then(function(res) {
					console.log(res);
					if(res.data.success==true){
						that.$message({showClose: true,
				          message: '保存成功',
				          type: 'success'
				        });
					}else{
        				that.$message({showClose: true,type:'error',message: res.data.message})
					}
				}).catch(function(err) {
					console.log(err);
				});
			},
			save_edit_button_close(index,item){
				let that = this;
				this.$axios.post(this.BASE_API + 'article/update', qs.stringify({
					'id':item.id,
					'content': item.content,
				}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
				).then(function(res) {
					console.log(res);
					if(res.data.success==true){
						if(that.datalist[index].edit){
							that.datalist[index].edit=false;
						}else{
							that.datalist[index].edit = true;
						}
						console.log("change edit to = "+that.datalist[index].edit)
						that.new_is_show = !that.new_is_show;
						that.new_is_show = !that.new_is_show;
						that.$message({showClose: true,
				          message: '保存成功',
				          type: 'success'
				        });
					}else{
        				that.$message({showClose: true,type:'error',message: res.data.message})
					}
				}).catch(function(err) {
					console.log(err);
				});
			},
			dateFormat(timestamp){
        		var time = new Date(timestamp)    //先将时间戳转为Date对象，然后才能使用Date的方法
		        var year = time.getFullYear(),
	            month = time.getMonth() + 1 ,  //月份是从0开始的
	            day = time.getDate(),
	            hour = time.getHours(),
	            minute = time.getMinutes(),
	            second = time.getSeconds()
		        return  year+'-'+month+'-'+ day+' '+hour+':'+minute+':'+second;
		   },
		   changePage(page){
		   	this.pageNum = page;
		   	this.query();
		   },
		   delete_item(index,item){
				let that = this;
				this.$axios.post(this.BASE_API + 'article/delete', qs.stringify({
					'id':item.id,
				}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
				).then(function(res) {
					console.log(res);
					if(res.data.success==true){
						that.$message({showClose: true,
				          message: '删除成功',
				          type: 'success'
				        });
				        debugger;
				        that.datalist[index];
						
					}else{
        				that.$message({showClose: true,type:'error',message: res.data.message})
					}
				}).catch(function(err) {
					console.log(err);
				});
		   }
		},
		mounted() {
//					var location = location;
//					var locationhref = location.href;
//					var search = window.location.search;
			this.query();
		},

	}
</script>

<style>
	.w-logo {
		min-height: 36px;
		width: 100%;
	}
	
	.w-menu {
		margin-bottom: 15px;
		border-bottom: 1px solid #e4e7ed;
	}
	
	
	
	.w-max-width {
		max-width: 1140px;
		margin: 0 auto;
	}
	.w-marginbottom{
		margin-bottom: 4px;
	}
	.w-aligncenter{
		text-align: center;
	}
	.el-card__body{
		padding:20px 20px 11px 20px;
	}
	.card_bottom_item{
		color: #848383;
		background-color: #e4e7ed;
		padding:5px 8px;
		border-radius:4px;
		text-decoration:none;
	}
	.card_bottom_item:hover{
		color: #ffffff;
		background-color: #409EFF;
		
	}

</style>