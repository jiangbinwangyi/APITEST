import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		//	host: 'http://192.168.0.183:8080/csgor',
		host: 'http://192.168.138.76:8080', //断点调试
		userInfo: null,
		bannerList: null,
		navList: null,
		linkList: null,
		config: null
	},
	mutations: {
		setUser(s,data){
			s.userInfo = data;
		},
		setBanner(s, data) {
			s.bannerList = data;
		},
		setNav(s, data) {
			s.navList = data;
		},
		
		setLink(s, data) {
			s.linkList = data;
		},
		setConfig(s, data){
			s.config = data;
		}
	},
	actions: {
		getUser({commit}) {
			axios.get('/front/person/profile?ajax')
				.then((res) => {
					if(res.data) {
						commit('setUser', res.data);
					} else {
						commit('setUser', null);
					}
				})
		},
		getBanner({commit}) {
			axios.get('/front/api/rollpic?ajax&folderId=1')
				.then((res) => {
					if(res.data) {
						commit('setBanner', res.data.data);
					} else {
						commit('setBanner', null);
					}
				})
		},
		getNav({commit}) {
			axios.get('front/api/index_menus?ajax')
				.then((res) => {
					if(res.data) {
						commit('setNav', res.data.data);
					} else {
						commit('setNav', null);
					}
				})
		},
		
		getLink({commit}) {
			axios.get('/front/api/allFriendlinks?ajax')
				.then((res) => {
					if(res.data) {
						commit('setLink', res.data.data);
					} else {
						commit('setLink', null);
					}
				})
		},
		getConfig({commit}) {
			axios.get('/front/api/config?ajax')
				.then((res) => {
					if(res.data) {
						commit('setConfig', res.data.data);
					} else {
						commit('setConfig', null);
					}
				})
		},
	}
})