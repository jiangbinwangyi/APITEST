<template>
	<Form ref="formInline" :model="formInline" :rules="ruleInline" class="loginForm">
		<FormItem prop="email">
			<Input type="email" v-model="formInline.email" placeholder="邮箱地址">
			<Icon type="ios-mail-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="user">
			<Input type="text" v-model="formInline.user" placeholder="姓名">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="date">
			<DatePicker type="date" placeholder="出生日期" v-model="formInline.date"></DatePicker>
		</FormItem>
		<FormItem>
			<RadioGroup v-model="formInline.gender">
				<Radio label="male">男</Radio>
				<Radio label="female">女</Radio>
			</RadioGroup>
		</FormItem>
		<FormItem prop="tel">
			<Input type="text" v-model="formInline.tel" placeholder="手机号码">
			<Icon type="ios-phone-portrait" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="password">
			<Input type="password" v-model="formInline.password" placeholder="密码">
			<Icon type="ios-lock-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="password2">
			<Input type="password" v-model="formInline.password2" placeholder="确认密码">
			<Icon type="ios-lock-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="company">
			<Input type="text" v-model="formInline.company" placeholder="单位">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="post">
			<Input type="text" v-model="formInline.post" placeholder="职务">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="job_title">
			<Input type="text" v-model="formInline.job_title" placeholder="职称">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="citizenship">
			<Input type="text" v-model="formInline.citizenship" placeholder="国籍">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="speciality">
			<Input type="text" v-model="formInline.speciality" placeholder="专业/特长">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="degree">
			<Input type="text" v-model="formInline.degree" placeholder="最高学历">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="school">
			<Input type="text" v-model="formInline.school" placeholder="毕业学校">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="language">
			<Input type="text" v-model="formInline.language" placeholder="使用语种">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="voice_proficiency">
			<Input type="text" v-model="formInline.voice_proficiency" placeholder="语音熟练程度">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="fax">
			<Input type="text" v-model="formInline.fax" placeholder="传真">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="tel2">
			<Input type="text" v-model="formInline.tel2" placeholder="固定电话">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="address">
			<Input type="text" v-model="formInline.address" placeholder="通讯地址">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem prop="intro">
			<Input type="text" v-model="formInline.intro" placeholder="个人学历">
			<Icon type="ios-person-outline" slot="prepend"></Icon>
			</Input>
		</FormItem>
		<FormItem>
			<Upload :data="{'ajax':true}" :before-upload="handleUpload" name="avatar_file" ref="upload" :on-success="uploadSuccess" :action="uploadAction">
				<Button icon="ios-cloud-upload-outline">上传一寸照片</Button>
			</Upload>
			<div v-if="avatar_file !== null">文件名: {{ avatar_file.name }}</div>
		</FormItem>

		<FormItem>
			<Upload :data="{'ajax':true}" :before-upload="handleUpload2" name="certificate_file" ref="upload2" :on-success="uploadSuccess2" :action="uploadAction2">
				<Button icon="ios-cloud-upload-outline">执业资格证</Button>
			</Upload>
			<div v-if="certificate_file !== null">文件名: {{ certificate_file.name }}</div>
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
				uploadAction: '/front/regist/upload_avatar',
				uploadAction2: '/front/regist/upload_cert?',
				imageCodeSrc: '/front/image_code',
				formInline: {
					user: '',
					password: '',
					password2: '',
					imageCode: '',
					email: '',
					tel: '',
					date: '',
					gender: '',
					company: '',
					post: '',
					job_title: '',
					citizenship: '',
					speciality: '',
					degree: '',
					school: '',
					language: '',
					voice_proficiency: '',
					fax: '',
					tel2: '',
					address: '',
					intro: ''
				},
				avatar_file: null,
				certificate_file: null,
				loadingStatus: false,
				ruleInline: {
					user: [{
//						required: true,
						message: '请输入用户名',
					}],
					imageCode: [{
//						required: true,
						message: '请输入验证码',
					}],
					password: [{
//							required: true,
							message: '请输入密码',
						},
						{
							type: 'string',
							min: 6,
							message: '密码最少为6位',
						}
					]
				}
			}
		},
		methods: {
			handleUpload(file) {
				this.avatar_file = file;
				return false;
			},
			handleUpload2(file) {
				this.certificate_file = file;
				return false;
			},
			uploadSuccess(res, file, fileList) {
				//上传成功
				if(res.status === 1) {
					this.$refs.upload2.post(this.certificate_file);
				}
			},
			uploadSuccess2(res, file, fileList) {
				//上传成功
				if(res.status === 1) {
					this.formSubmit()
				}
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					//表单验证
					if(valid) {
						//上传提交
						this.$refs.upload.post(this.avatar_file);
					} else {
						this.$Message.error('格式验证未通过');
					}
				})
			},
			loadPicimageCode() {
				this.imageCodeSrc = '/front/image_code?ran=' + Math.random();
			},
			//表单提交
			formSubmit() {
				let params = new URLSearchParams();
				params.append('user.realname', this.formInline.user);
				params.append('password', this.formInline.password);
				params.append('password2', this.formInline.password2);
				params.append('imageCode', this.formInline.imageCode);
				params.append('user.email', this.formInline.email);
				params.append('user.tel', this.formInline.tel);
				params.append('member.birthday', this.formInline.date);
				params.append('member.gender', this.formInline.gender);
				params.append('member.company', this.formInline.company);
				params.append('member.post', this.formInline.post);
				params.append('member.job_title', this.formInline.job_title);
				params.append('member.citizenship', this.formInline.citizenship);
				params.append('member.speciality', this.formInline.speciality);
				params.append('member.degree', this.formInline.degree);
				params.append('member.school', this.formInline.school);
				params.append('member.language', this.formInline.language);
				params.append('member.voice_proficiency', this.formInline.voice_proficiency);
				params.append('member.fax', this.formInline.fax);
				params.append('member.tel2', this.formInline.tel2);
				params.append('user.address', this.formInline.address);
				params.append('member.intro', this.formInline.intro);
				axios({
					method: 'post',
					url: '/front/regist/save?ajax',
					data: params,
				}).then(response => {
					console.log(response.data);
					if(response.data.status === 1) {
						this.$Message.success(response.data.msg);
					} else {
						this.$Message.error(response.data.msg);
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.loginForm {
		width: 30%;
		margin: 0 auto;
		min-width: 300px;
	}
</style>