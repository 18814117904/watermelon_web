<template>
	<div class="w-max-width">
		<!-- 导航 --> 
		<wMenu></wMenu>
		<!-- end 导航-->

		<el-form :inline="true" class="demo-form-inline w-aligncenter">
			<el-form-item label="">
				<el-input v-model="query_content" placeholder="请输入您需要查找的内容"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="query">查询</el-button>
				<el-button type="primary" v-if="!new_solution_is_show" @click="show_new_solution">新建方案</el-button>
				<el-button type="primary" v-if="new_solution_is_show" @click="show_new_solution">关闭新建</el-button>
			</el-form-item>
		</el-form>
		
			<div v-if="new_solution_is_show">
				<el-input v-model="new_solution_title" placeholder="标题"></el-input>
				<quill-editor v-model="new_solution_content" ref="myQuillEditor">
				</quill-editor>
				<div class="new_card_bottom">
					<span @click="new_solution_button" class="w_new_solution_buttom">保存</span>
				</div>
			</div>
		<div >
		<el-collapse>
			<el-collapse-item v-for="(item,index) in datalist" :key="index">
				<template slot="title">
					{{item.title}}
				</template>
				<p v-if="!item.edit" v-html='item.content'></p>
				<p v-if="item.edit">
					<el-input v-model="item.title" placeholder="标题"></el-input>
					<quill-editor v-model="item.content" ref="myQuillEditor">
					</quill-editor>
				</p>

				<div class="card_bottom">
					<span v-if="item.mysolution" @click="click_edit_solution(index)" class="card_bottom_item">编辑</span>
					<span v-if="item.edit" @click="save_edit_solution_button(index,item)" class="card_bottom_item">保存</span>
					<span v-if="item.edit" @click="save_edit_solution_button_close(index,item)" class="card_bottom_item">保存且关闭编辑</span>
				</div>
					
			</el-collapse-item>

		</el-collapse>
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
				query_content: "",
				new_solution_is_show: false,
				datalist: [{
					date: "2019-01-01",
					content: "今日内容"
				}],
				new_solution_title: "",
				new_solution_content: "",
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
				}
			}
		},
		methods: {
			query() {
				let that = this;
				this.$axios.post(this.BASE_API + 'solution/select', qs.stringify({
					content: this.query_content,
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res) {
					console.log(res);
					if(res.data.success == true) {
						let customerId = sessionStorage.getItem("customerId");
						if(customerId){
							for(var i in res.data.data){
								if(customerId==res.data.data[i].customerId){
									res.data.data[i].mysolution=true;
								}
							}
						}

						that.datalist = res.data.data.list;
					} else {
						alert(res.data.message)
					}
				}).catch(function(err) {
					console.log(err);
				});
			},
			new_solution_button() { //新建日志
				let that = this;
				this.$axios.post(this.BASE_API + 'solution/insert', qs.stringify({
					'title':this.new_solution_title,
					'content': this.new_solution_content,
				}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
				).then(function(res) {
					console.log(res);
					if(res.data.success==true){
						that.new_solution_title="";
						that.new_solution_content="";
						that.new_solution_is_show=false;
						that.query();
					}else{
						alert(res.data.message)
					}
				}).catch(function(err) {
					console.log(err);
				});
			},
			show_new_solution(){
				if(this.new_solution_is_show){
					this.new_solution_is_show=false;
				}else{
					this.new_solution_is_show=true;
				}
			},

			click_edit_solution(index) {
				if(this.datalist[index].edit) {
					this.datalist[index].edit = false;
				} else {
					this.datalist[index].edit = true;
				}
				console.log("change edit to = " + this.datalist[index].edit)
				this.new_solution_is_show = !this.new_solution_is_show;
				this.new_solution_is_show = !this.new_solution_is_show;
			},
			save_edit_solution_button(index, item) {
				let that = this;
				this.$axios.post(this.BASE_API + 'solution/update', qs.stringify({
					'id': item.id,
					'title': item.title,
					'content': item.content,
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res) {
					console.log(res);
					if(res.data.success == true) {
						that.$message({showClose: true,
							message: '保存成功',
							type: 'success'
						});
					} else {
						alert(res.data.message)
						that.$message({showClose: true,type:'error',message: res.data.message});
					}
				}).catch(function(err) {
					console.log(err);
				});
			},
			save_edit_solution_button_close(index, item) {
				let that = this;
				this.$axios.post(this.BASE_API + 'solution/update', qs.stringify({
					'id': item.id,
					'title': item.title,
					'content': item.content,
				}), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res) {
					console.log(res);
					if(res.data.success == true) {
						if(that.datalist[index].edit) {
							that.datalist[index].edit = false;
						} else {
							that.datalist[index].edit = true;
						}
						console.log("change edit to = " + that.datalist[index].edit)
						that.new_solution_is_show = !that.new_solution_is_show;
						that.new_solution_is_show = !that.new_solution_is_show;
						that.$message({showClose: true,
							message: '保存成功',
							type: 'success'
						});
					} else {
						that.$message({showClose: true,type:'error',message: res.data.message});
					}
				}).catch(function(err) {
					console.log(err);
				});
			},

		},
		mounted() {
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
	
	.w-link-selected {
		border-bottom: 1px solid #409eff;
	}
	
	.diary_URL {
		border-bottom: none;
	}
	
	.repository_URL {
		border-bottom: none;
	}
	
	.solution_URL {
		border-bottom: 1px solid #409eff;
	}
	
	.w-max-width {
		max-width: 1140px;
		margin: 0 auto;
	}
	
	.w-aligncenter {
		text-align: center;
	}
	
	.card_bottom_item {
		color: #848383;
		background-color: #e4e7ed;
		padding: 5px 8px;
		border-radius: 4px;
		text-decoration: none;
		line-height: 12px;
	}
	
	.card_bottom_item:hover {
		color: #ffffff;
		background-color: #409EFF;
	}
	.w_new_solution_buttom{
		color: #ffffff;
		background-color: #409EFF;
		border-radius: 4px;
		padding:5px 19px;
		margin: 10px auto;
	}
	.el-collapse-item__content{
		padding-bottom:5px;
	}
	.new_card_bottom{
		margin: 6px 0px 28px;
	}
</style>