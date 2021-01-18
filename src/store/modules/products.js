const state = {//хранит все состояния Vuex
  products: {},
  session: false
};

const getters = {//Хранит все геттеры Vuex
  products: state => state.products,
  session: state => state.session
};

const actions = {//Хранит все действия Vuex
  initStore: ({ commit }) => {
    axios.get("static/products.json").then(response => {
      console.log(response.data.products);
      commit("SET_STORE", response.data.products);
    });
  }
};

const mutations = {
  //Хранит все мутации Vuех
  'SET_STORE'(state, products) {
    state.products = products;
  },
  'SET_SESSION'(state, products) {
    state.products = products;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
