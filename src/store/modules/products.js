const state = {//хранит все состояния Vuex
  products: {}
};

const getters = {//Хранит все геттеры Vuex
  products: state => state.products
};

const actions = {//Хранит все действия Vuex
  initStore: ({ commit }) => {
    axios.get("static/products.json").then(response => {
      console.log(response.data.products);
      commit("SET_STORE", response.data.products);
    });
  }
};

const mutations = {//Хранит все мутации Vuех
  SET_STORE(state, products) {
    state.products = products;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
