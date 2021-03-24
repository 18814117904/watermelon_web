<template>
	<div class="w-max-width">
		<!-- 导航-->
		<wMenu></wMenu> 
		<!-- 导航 -->

		<br>
		<el-form :inline="true"  class="demo-form-inline w-aligncenter">
			<el-form-item label="">
				<el-input v-model="query_content" placeholder="请输入您需要查找的类目"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="query">查询</el-button>
				<el-button type="primary" v-if="!new_diary_is_show" @click="show_new_diary">新建目标大类</el-button>
				<el-button type="primary" v-if="new_diary_is_show" @click="show_new_diary">关闭新建</el-button>
			</el-form-item>
		</el-form>

		<div class="block w-diary">
			<el-timeline>
				<el-timeline-item  :timestamp="dateFormat(new_diary_date)" placement="top" v-if="new_diary_is_show">
					<el-card>
						<template>
							<el-row :gutter="10" class="w-marginbottom w-aligncenter">
							    <el-date-picker
							      v-model="new_diary_date"
							      type="datetime"
							      placeholder="选择日期时间">
							    </el-date-picker>
								<el-button type="primary" @click="new_diary_button">保存</el-button>
							</el-row>
							<quill-editor v-model="new_diary_content" ref="myQuillEditor" >
							</quill-editor>
						</template>
					</el-card>
				</el-timeline-item>
				<el-timeline-item :timestamp="item.date" placement="top"  v-for="(item,index) in datalist":key="index">
					<el-card >
						<p v-if="!item.edit" v-html='item.content'></p>
						<p v-if="item.edit" >
							<quill-editor v-model="item.content" ref="myQuillEditor" >
							</quill-editor>
						</p>
						<div class="card_bottom">
							<span @click="click_edit_diary(index)" class="card_bottom_item">编辑</span>
							<span v-if="item.edit" @click="save_edit_diary_button(index,item)" class="card_bottom_item">保存</span>
							<span v-if="item.edit" @click="save_edit_diary_button_close(index,item)" class="card_bottom_item">保存且关闭编辑</span>
						</div>
					</el-card>
				</el-timeline-item>

			</el-timeline>
		</div>
		<div class="pageController">
		  <el-pagination
		  	@size-change="handleSizeChange"
  			@current-change="handleCurrentChange" 
		    layout="sizes,prev, pager, next"
		    :page-sizes="[10, 50, 100]"
		    :page-size="10"
		    :total="totalNum">
		  </el-pagination>
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

			}
		},
		methods: {
			handleSizeChange(val){
				this.pageSize = val;
				this.query();
			},
			handleCurrentChange(val){
				this.pageNum = val;
				this.query();
			},
			query(){
				let that = this;
				this.$axios.post(this.BASE_API + 'diary/select', qs.stringify({
					content: this.query_content,
					pageSize:this.pageSize,
					pageNum:this.pageNum,
				}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
				).then(function(res) {
					console.log(res);
					if(res.data.success==true){
						that.datalist = res.data.data.list;
						that.totalNum = res.data.data.total;
						
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
			new_diary_button() { //新建日志
				let that = this;
				this.$axios.post(this.BASE_API + 'diary/insert', qs.stringify({
					'date':this.dateFormat(this.new_diary_date),
					'content': this.new_diary_content,
				}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
				).then(function(res) {
					console.log(res);
					if(res.data.success==true){
						that.new_diary_content="";
						that.new_diary_is_show=false;
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
			show_new_diary(){
				if(this.new_diary_is_show){
					this.new_diary_is_show=false;
				}else{
					this.new_diary_is_show=true;
				}
			},
			click_edit_diary(index){
				debugger
				if(this.datalist[index].edit){
					this.datalist[index].edit=false;
				}else{
					this.datalist[index].edit = true;
				}
				console.log("change edit to = "+this.datalist[index].edit)
				this.new_diary_is_show = !this.new_diary_is_show;
				this.new_diary_is_show = !this.new_diary_is_show;
			},
			save_edit_diary_button(index,item){
				let that = this;
				this.$axios.post(this.BASE_API + 'diary/update', qs.stringify({
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
			save_edit_diary_button_close(index,item){
				let that = this;
				this.$axios.post(this.BASE_API + 'diary/update', qs.stringify({
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
						that.new_diary_is_show = !that.new_diary_is_show;
						that.new_diary_is_show = !that.new_diary_is_show;
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
	.el-timeline{
		padding-left: 0px;
	}
	.pageController{
		width: 100%;
		text-align: center;
	}
</style>