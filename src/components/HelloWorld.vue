<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
  	let lanmu = '/api/action/folders?version=1.0.0&p={siteId:2}' //站点ID
  	let list = '/api/action/pageArticle?version=1.0.0&p={folderId:3}' //栏目ID
  	let article = '/api/action/article?version=1.0.0&p={articleId:335}' //文章ID
  	let login = '/api/action/login?version=1.0.1&p={username:"testapi",password:"123456"}' //登录
  	
  	let info = '/front/person/profile' //登录
  	axios.get(info).then(response => {
				console.log(response.data);
		})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
