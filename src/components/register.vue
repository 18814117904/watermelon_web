<template>
	<div class="w-max-width">
		<wMenu></wMenu>
		
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm w-login">
	<h2>注册会员</h2>
  <el-form-item label="手机号码" prop="phone">
    <el-input v-model.number="ruleForm.phone"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    <br><br />
  <el-link :underline="false" :href="BASE_URL+'/login'">已有账号,去登录</el-link>
</el-form>

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
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
			return {
				BASE_URL: process.env.BASE_URL,
				BASE_API: process.env.BASE_API,
        ruleForm: {
          pass: '',
          checkPass: '',
          phone: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ]
        }
    }
		},
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
//          alert('submit!');
//继续往下走
          } else {
            console.log('error submit!!');
            return false;
          }
          //发起请求注册
			let that = this;
			this.$axios.post(this.BASE_API + 'customer/insert', qs.stringify({
				'phone':this.ruleForm.phone,
				'password': this.ruleForm.pass,
			}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
			).then(function(res) {
				console.log(res);
				if(res.data.success==true){
					that.$message({showClose: true,type:'success',message: '注册成功'});
					that.$router.push({name:'index'});
				}else{
					alert(res.data.message)
				}
			}).catch(function(err) {
				console.log(err);
			});
         
          
          
          
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
	}

</script>

<style>
	.w-max-width {
		max-width: 1140px;
		margin: 0 auto;
	}
	.w-login{
		width: 330px;
		margin: 10px auto;
		text-align: center;
	}
</style>