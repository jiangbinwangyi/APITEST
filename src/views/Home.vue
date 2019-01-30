<template>
  <div class="home">
  	<Row :gutter="10">
  		<Col span="16">
  			<Row :gutter="0">
  				<Col span="24">
						<Banner :list="bannerList"></Banner>  					
  				</Col>
  			</Row>
  		</Col>
  		<Col span="8">
  			<Card>
		        <p slot="title">
		            <Icon type="ios-star"></Icon>
		                        推荐文章
		        </p>
		        <ul>
		            <li v-for="item in topList">
		                <a :href="item.url" target="_blank">{{ item.name }}</a>
		                <span>
		                    <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
		                    {{ item.rate }}
		                </span>
		            </li>
		        </ul>
		    </Card>
  		</Col>
  	</Row>
  </div>
</template>

<script>
import Banner from '@/components/home/banner.vue'

export default {
  name: 'home',
  components: {
    Banner
  }, 
  computed:{
  	bannerList(){
  		return this.$store.state.bannerList
  	},
  	topList(){
  		return null
  	}
  },
  created(){
  	//获取banner
  	this.$store.dispatch('getBanner');
		
  	axios({
  		methods:'get',
			url: 'front/person/profile?ajax', //用户信息
//		url: 'front/api/menus?ajax', //所有栏目
//		url: 'front/api/folderArticles?ajax&folderId=5&pageNo=1&pageSize=10', //文章列表
//		url: '/front/api/topArticles?ajax', //置顶文章列表
//		url: '/front/api/articleDetail?ajax&articleId=112', //文章内容
//		url: '/front/api/notice?ajax&folderId=2', //栏目公告
//		url: '/front/api/rollpic?ajax&folderId=1', //栏目滚动图片
//		url: '/front/api/search?ajax&tag='+ encodeURI(encodeURI('门')), //搜索
//		url: '/front/api/index_menus?ajax',//父子栏目
  	}).then(response => {
				console.log('登录状态:'+response.data.msg);
		})
  }
}
</script>
