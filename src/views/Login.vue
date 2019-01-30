<template>
	<Form ref="formInline" :model="formInline" :rules="ruleInline" class="loginForm">
		<FormItem prop="user">
			<Input type="text" v-model="formInline.user" placeholder="用户名">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="password">
			<Input type="password" v-model="formInline.password" placeholder="密码">
			<Icon type="ios-lock-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="imageCode">
			<Input type="text" v-model="formInline.imageCode" placeholder="验证码" style="width: 70%;display: inline-block;"></Input>
			<img id="picimageCode" align="middle" width="60" height="26" style="cursor:pointer;width: 30%;" :src="imageCodeSrc" title="更换验证码" @click="loadPicimageCode()" />
		</FormItem>
		<FormItem>
			<Button type="primary" @click="handleSubmit('formInline')">登录</Button>
		</FormItem>
	</Form>
</template>
<script>
	export default {
		data() {
			return {
				imageCodeSrc : '/front/image_code',
				formInline: {
					user: '',
					password: '',
					imageCode: ''
				},
				ruleInline: {
					user: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					imageCode: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 6,
							message: '密码最少为6位',
							trigger: 'blur'
						}
					]
				}
			}
		},
		methods: {
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						let params = new URLSearchParams();
						params.append('username', this.formInline.user);
						params.append('password', this.formInline.password);
						params.append('imageCode', this.formInline.imageCode);
						axios({
						  method:'post',
						  url: '/login?ajax',
						  data: params,
						}).then(response => {
							console.log(response.data);
						})
					} else {
						this.$Message.error('格式验证未通过');
					}
				})
			},
			loadPicimageCode() {
				this.imageCodeSrc = '/front/image_code?ran=' + Math.random();
			}
		}
	}
</script>

<style scoped="scoped">
	.loginForm{
		width: 30%;
		margin: 0 auto;
		min-width: 300px;
	}
</style>