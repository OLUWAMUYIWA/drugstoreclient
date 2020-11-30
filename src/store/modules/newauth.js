import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from '../actions/auth';

import axios from 'axios'
import {BASE_URL} from 'src/services/http-common'
const API_ROUTE = `${BASE_URL}api/no_auth/login`


const namespaced = true;
const state = {
  user : ( JSON.parse(localStorage.getItem("user")) ?  JSON.parse(localStorage.getItem("user")) : null),
  status: "",
  loggedIn : false,
  role:  (localStorage.getItem("user")? JSON.parse(localStorage.getItem('user')).role : "" ),
  hasLoadedOnce: false
};

const getters = {
  isIn: state=> state.loggedIn,
  authStatus: state => state.status,
  id: state => state.user.id,
  company_name: state => state.user.company_name,
  loggedIn: state => state.loggedIn,
  isUser: state => state.user.role === "junior",
  isContributor: state => state.user.role === "senior",
  isBoss: state => state.user.role  === "boss"
};
const actions = {
 [AUTH_REQUEST]: ({commit}, user) => {
    return new Promise((resolve, reject) => { 
      commit(AUTH_REQUEST)
      axios({url: API_ROUTE, data: user, method: 'POST' }).then(resp => {
          const userData = resp.data
          console.log(userData)
          
          //if (accessToken) {  
          localStorage.setItem('user', JSON.stringify(userData))
          commit(AUTH_SUCCESS, user)
          
          resolve(resp)
          //}
        })
      .catch(err => {
        commit(AUTH_ERROR, err)
        console.log(err)
        console.log('shit happened')
        localStorage.removeItem('user')
        reject(err)
      })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("user");
      resolve();
    });
  }
};

const mutations = {
    [AUTH_REQUEST]: state => {
    state.status = "loading";
    },

    [AUTH_SUCCESS]: (state) => {
    state.status = "success";
    state.loggedIn = true;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
    state.loggedIn = false;
    state.user.role = "";
    state.user.id = '';
    state.user.company_name = "";
  },
  [AUTH_LOGOUT]: state => {
    state.user.accessToken = ""
    localStorage.removeItem("user");
    
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
};