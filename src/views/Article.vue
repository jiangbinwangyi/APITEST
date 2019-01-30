<template>
  <div class="article">
    <h1>{{ article.title }}</h1>
    <Row class="articleInfo">
    	<Col span="6">发布者：{{ article.publish_user}}</Col>
    	<Col span="6">发布时间：{{ article.publish_time}}</Col>
    	<Col span="6">浏览数量：{{ article.count_view}}</Col>
    	<Col span="6">评论数量：{{ article.count_comment}}</Col>
    </Row>
    <article v-html="article.content"></article>
  </div>
</template>

<script type="text/javascript">
	export default{
		name:'article',
		data() {
			return {
				id: '', //栏目ID
				article: [], //栏目列表
			}
		},
		mounted(){
			this.id = this.$route.params.id
			axios({
				methods: 'get',
				url: '/front/api/articleDetail?ajax&articleId=' + this.id, //文章列表	
			}).then(response => {
				this.article = response.data.data
			})
		}
	}
</script>

<style scoped="scoped">
	.article{
		padding: 0 10%;
	}
	.article h1{
		text-align: center;
	}
	.articleInfo{
		width: 60%;
		text-align: center;
		margin: 0 auto;
		line-height: 40px;
	}
</style>
