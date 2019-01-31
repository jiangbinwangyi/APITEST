<template>
	<div class="about">
		<h1>{{ $route.params.id }}</h1>
		<Table :show-header="false" :columns="columns" :data="list" @on-row-click="toArticle($event)">
			<Spin slot="loading"></Spin>
		</Table>
	</div>
</template>

<script>
	export default {
		name: 'list',
		data() {
			return {
				id: '', //栏目ID
				list: [], //栏目列表
				columns: [{
					title: '文档标题',
					key: 'title',
				}, {
					title: '发布日期',
					key: 'publish_time',
				}, {
					title: '发布作者',
					key: 'publish_user',
				}]
			}
		},
		mounted() {
			console.log('123')
//			this.getList(this.$route.params.id);
		},
		methods: {
			//普通列表，栏目ID
			getList(id){
				axios({
				methods: 'get',
					url: 'front/api/folderArticles?ajax&folderId=' + id + '&pageNo=1&pageSize=10', //文章列表	
				}).then(response => {
					this.list = response.data.data.list
				})
			},
			//搜索结果列表，搜索关键词
			getSearchList(val){
				axios({
					methods: 'get',
					url: '/front/api/search?ajax&tag='+ encodeURI(val), 
				}).then(response => {
					this.list = response.data.data.list
				})
			},
			//跳转到文章页（带文章ID参数）
			toArticle(e) {
				let id = e.id;
				this.$router.push({
					name: 'article',
					params: {
						id
					},
				})
			}
		},
		watch:{
			$route: {
		    handler: function(val, oldVal){
		    	if(val.name == 'list'){
		    		this.getList(val.params.id)
		    	}else if(val.name == 'search'){
		    		this.getSearchList(val.params.val)
		    	}else{
		    		this.list = [];
		    	}
		    },
		    // 深度观察监听
		    deep: true,
		    immediate: true
		  }
		}
	}
</script>