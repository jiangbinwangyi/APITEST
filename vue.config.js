const compressionplugin = require("compression-webpack-plugin");  //GZIP压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');  //压缩js 移除config

const path = require("path");
const glob = require("glob-all");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
	publicPath: './', // 基本路径
	productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
	lintOnSave: true, //打包时校验格式
	
	devServer: {
		open: true,
        proxy: {//如需跨域请求多个域名，在此对象进行扩展即可
        	'/front':{
        		target: 'http://192.168.138.129:8081/csgor/',
        		changeOrigin: true,
        	},
        	'/jflyfox':{
        		target: 'http://192.168.138.129:8081/csgor/',
        		changeOrigin: true,
        	},
        	'/login':{
        		target: 'http://192.168.138.129:8081/csgor/',
        		changeOrigin: true,
        	},
        	'/logout':{
        		target: 'http://192.168.138.129:8081/csgor/',
        		changeOrigin: true,
        	},
//          '/api': {
//              target: 'http://localhost:8083/jfinal_cms/',
//              ws: true,
//              changeOrigin: true,
//              pathRewrite: {
//                  '^/api': '/api'
//              }
//         },
        }
	},

	chainWebpack: config => {
		config.module
			.rule("images")
			.use("image-webpack-loader")
			.loader("image-webpack-loader")
			.options({
				mozjpeg: {
					progressive: true,
					quality: 65
				},
				optipng: {
					enabled: false
				},
				pngquant: {
					quality: "65-90",
					speed: 4
				},
				gifsicle: {
					interlaced: false
				},
				webp: {
					quality: 75
				}
			});
	},

	configureWebpack: config => {
		if(process.env.NODE_ENV === 'production') {
			return {
				plugins: [
					new UglifyJsPlugin({
	                    uglifyOptions: {
	                        compress: {
	                            warnings: false,
	                            drop_console: true,
	                            drop_debugger: false,
	                            pure_funcs: ['console.log'] //移除console
	                        }
	                    },
	                    sourceMap: false,
	                    parallel: true
	                }),
					new compressionplugin({
						filename: '[path].gz[query]', //配置压缩文件名
						//algorithm: 'gzip',  //算法,默认
						test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, //匹配文件类型
						threshold: 10240, //超过10k大小的文件进行压缩
						deleteOriginalAssets: false, //是否删除源文件
						//minRatio: 0.8, //压缩最小比率
					}),
					new PurgecssPlugin({
			          paths: glob.sync([resolve("./**/*.vue")]),
			          extractors: [
			            {
			              extractor: class Extractor {
			                static extract(content) {
			                  const validSection = content.replace(
			                    /<style([\s\S]*?)<\/style>+/gim,
			                    ""
			                  );
			                  return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
			                }
			              },
			              extensions: ["vue"]
			            }
			          ],
			          whitelist: ["html", "body"]
			        })
				]
			}
		}
	},
}