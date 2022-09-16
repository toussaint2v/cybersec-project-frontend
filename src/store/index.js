import { createStore } from 'vuex'
import axios from '../api/axios'


const state = {
  userTheme: null,
  authenticated: false,
  user: null,
  token: null,
}
const mutations = {
  SET_USER_THEME(state, userTheme){
    state.userTheme = userTheme;

    localStorage.setItem('userTheme', userTheme);
    document.documentElement.className = state.userTheme;
  },

  initialiseStore(state) {
    if (localStorage.getItem('userTheme')){
      state.userTheme = localStorage.getItem('userTheme');
    }
    if (localStorage.getItem('authenticated') && localStorage.getItem('token') && localStorage.getItem('user')) {
      state.authenticated = localStorage.getItem('authenticated');
      state.token = localStorage.getItem('token');
      state.user = JSON.parse(localStorage.getItem('user'));
    }
    else {
      state.authenticated  = false;
      state.token = null;
      state.user = null;
    }
  },

  authenticateUser(state, data) {
    state.authenticated  = true;
    state.token = data['token'];
    state.user = data.profile.data;
    localStorage.setItem('authenticated', true);
    localStorage.setItem('token', data['token']);
    localStorage.setItem('user', JSON.stringify(data.profile.data));

  },
  unauthenticateUser() {
    var temp = localStorage.getItem('userTheme');
    localStorage.clear();
    localStorage.setItem('userTheme', temp);


  }
}
const getters = {
  getUserTheme(state){
    return state.userTheme;
  },
  isAuthenticated(state) {
    return state.authenticated;
  },
  user(state) {
    return state.user;
  },
  userToken(state) {
    return state.token;
  }
}
const actions = {

  async logout({ commit }){
    await axios.post('api/logout').then(()=>{
      window.location.reload();
    });
    commit('unauthenticateUser');
  },


  toggleTheme({commit}) {
    if (state.userTheme === "light-theme") {
      commit('SET_USER_THEME', "dark-theme")
    } else {
      commit('SET_USER_THEME', "light-theme")
    }
  },



}

export default createStore({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {}
})






