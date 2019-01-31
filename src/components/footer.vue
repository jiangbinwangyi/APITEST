<template>
  <Footer class="layout-footer-center">
  	2011-2016 &copy; TalkingData
  	<div class="friendLink">
  		<span v-for="item in friendLink">
  			<a :href="item.url" target="_blank">{{item.name}}</a>
  		</span>
  	</div>
  </Footer>
</template>

<script>
export default {
  name: 'baseFooter',
  props: ['friendLink','systemConfig'],
  mounted(){
  }
}
</script>

<style scoped lang="less">
	.layout-footer-center{
		text-align: center;
		.friendLink span{
			padding: 0 10px;
		}
	}
</style>
