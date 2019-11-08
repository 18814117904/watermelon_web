<template>
	<div class="w-max-width">
		<!-- 导航 -->
<wMenu></wMenu>
		<!-- 导航 -->
		<h1>待开发</h1>
		待着吧,好长一段时间都要待着呢.
<!--
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="搜索条件">
    <el-input v-model="formInline.user" placeholder="搜索条件"></el-input>
  </el-form-item>
  <el-form-item label="搜索条件2">
    <el-select v-model="formInline.region" placeholder="搜索条件2">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>


  <template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </template>-->
		<wFooter></wFooter>

	</div>
</template>
<script>
	export default {
	    components:{
	      wMenu:require('../menu.vue').default,
			wFooter: require('../footer.vue').default
	    },
		data() {
			return {
				BASE_URL:process.env.BASE_URL,
				BASE_API:process.env.BASE_API,
		        formInline: {
		          user: '',
		          region: ''
		        },
	          tableData: [{
	            date: '2016-05-02',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1518 弄'
	          }, {
	            date: '2016-05-04',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1517 弄'
	          }, {
	            date: '2016-05-01',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1519 弄'
	          }, {
	            date: '2016-05-03',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1516 弄'
	          }]
          }
		},
		mounted() {
			this.$axios.post(this.BASE_API+'customer/select',{  
				firstName:'Fred',  
				lastName:'Flintstone'
				}).then(function(res){  
					console.log(res);
				}).catch(function(err){  
					console.log(err);
				});
		},

	}
</script>

<style>
	.w-logo{
		min-height: 36px;
		width: 100%;
	}
	.w-menu{
		margin-bottom: 15px;
		border-bottom:1px solid #e4e7ed;
	}
	.w-link-selected{
		border-bottom:1px solid #409eff;
	}
	.diary_URL{
		border-bottom:none;
	}
	.repository_URL{
		border-bottom:1px solid #409eff;
	}
	.solution_URL{
		border-bottom:none;
	}
	.w-max-width {
		max-width: 1140px;
		margin: 0 auto;
	}

</style>