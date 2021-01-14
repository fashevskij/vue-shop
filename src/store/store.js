import Vue from "vue";
import Vuex from "vuex";
import products from "./modules/products";

Vue.use(Vuex);//подключаем vue к vuex

export const store = new Vuex.Store({//Экспортируем Vuex.Store дnя даnьнейwеrо использования в файле maiп.js
  modules: {
    products
  },
  mutations: {//обьект мутации с функцией инициализации хранилища
    'SET_STORE' (state, products) {
      state.products = products;
    }
  },
  actions: {//обьект актион с асинхронным кодом
    initStore:({commit})=>{//инитстор вызывает мутацию
      axios.get('static/products.json').then((response)=>{
        commit("SET_STORE", response.data.products);
      });
    }
  },
  getters: {//гетер возвращает список товаров
    products: state => state.products
  }
})


