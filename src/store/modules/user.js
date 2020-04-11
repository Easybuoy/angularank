import axios from 'axios';

import { formatURL, extractURL, fetchURL } from '../../utils';

const state = {
  userDetail: {}
};

const getters = {
  userDetail: currentState => currentState.userDetail
};

const actions = {
  async getUserDetail({ commit }, login) {
    console.log(id)
    axios.get(`https://api.github.com/users/${login}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  },
  
  }
};

const mutations = {
  setUserDetail: (state, userDetail) => (state.userDetail = userDetail)
};

export default {
  state,
  getters,
  actions,
  mutations
};
