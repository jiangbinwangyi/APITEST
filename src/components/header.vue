<template>
	<Header>
		<div class="layout-top">
			<Row>
				<Col span="17">
				<div class="layout-logo">
					<h1>
							<img src="../assets/logo.png" width="30"/>
							中国老年学和老年医学学会肿瘤分会
						</h1>
				</div>
				</Col>
				<Col span="5">
				<Input search enter-button placeholder="全站内容搜索" @on-search="allSearch($event)" style="padding-top: 12px;" />
				</Col>
				<Col span="2">
					<div class="layout-user" v-if="userInfo.status==1">
						{{userInfo.userName}}
					</div>
					<div class="layout-login" v-else>
						<router-link to="/login">登录</router-link> |
						<router-link to="/register">注册</router-link>
					</div>
				</Col>
			</Row>
		</div>
		<Menu mode="horizontal" theme="dark" active-name="1">
			<template v-for="item in navList">
				<template v-if="item.child.length>0">
					<Submenu :name="item.name">
						<template slot="title">
							{{item.text}}
						</template>
						<MenuItem v-for="cItem in item.child" :name="cItem.name" :to="cItem.url"> {{cItem.text}}
						</MenuItem>
					</Submenu>
				</template>
				<template v-else>
					<MenuItem :name="item.name" :to="item.url"> {{item.text}}
					</MenuItem>
				</template>
			</template>
		</Menu>
	</Header>
</template>

<script>
	export default {
		name: 'baseHeader',
		data(){
			return {
			}
		},
		props: ['menu'],
		computed: {
			userInfo(){
				console.log(this.$store.state.userInfo);
				return this.$store.state.userInfo;
			},
			navList() {
				let arr = [];
				
				function module(v) {
					let obj = {
						name: v.id,
						text: v.name,
						url: '/',
						child: [],
					}

					//模板类型
					if(v.id === 1) {
						obj.url = '/home';
					} else if(v.type === 2 && v.jump_url !== null) {
						obj.url = '/article/' + v.jump_url; //jump_url 为跳转文章ID
					} else if(v.type === 1) {
						obj.url = '/list/' + v.id;
					} else {
						obj = null;
					}

					return obj;
				}

				//一级菜单(p 为 parent)
				if(this.menu) {
					for(let p of this.menu[0]) {
						let m = module(p);

						//二级菜单(c 为 child)
						if(this.menu[p.id]) {
							for(let c of this.menu[p.id]) {
								m.child.push(module(c));
							}
						}

						arr.push(m);
					}
				}
				return arr;
			}
		},
		created() {
			//获取登录状态
			this.$store.dispatch('getUser');
		},
		methods: {
			//跳转到搜索页
			toSearch(val){
				this.$router.push({
					name: 'search',
					params: {
						val
					},
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.layout-top {
		background: #fff;
		padding: 0 10px;
		height: 60px;
		line-height: 60px;
		overflow: hidden;
		.layout-logo {
			h1 {
				font-size: 24px;
			}
			img {
				vertical-align: middle
			}
		}
		.layout-login {
			font-size: 14px;
			text-align: right;
		}
	}
	
	.ivu-layout-header {
		font-size: 0;
		padding: 0;
		line-height: 1;
		height: auto;
	}
</style>