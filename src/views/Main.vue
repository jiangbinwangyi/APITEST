<template>
  <Layout>
  	<Header :menu="navList"></Header>
  	<Content :style="{'padding': '10px'}">
    	<router-view></router-view>
    </Content>
    <Footer :friendLink="linkList" :systemConfig="config"></Footer>
  </Layout>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Main',
  components: {
  	Header,
    Footer,
    HelloWorld
  },
  computed:{
  	navList(){
  		return this.$store.state.navList
  	},
  	linkList(){
  		return this.$store.state.linkList;
  	},
  	config(){
  		return this.$store.state.config;
  	}
  },
  created(){
  	//获取导航菜单
  	this.$store.dispatch('getNav');
  	
  	//获取底部友情链接
  	this.$store.dispatch('getLink');
  	
  	//获取底部版权信息
  	this.$store.dispatch('getConfig');
  }
}
</script>

<style scoped="scoped">
	.ivu-layout{
		background: none;
	}
</style>
