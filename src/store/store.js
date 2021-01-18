import Vue from "vue";
import Vuex from "vuex";
import products from "./modules/products";

Vue.use(Vuex);//подключаем vue к vuex

export const store = new Vuex.Store({//Экспортируем Vuex.Store дnя даnьнейwеrо использования в файле maiп.js
  modules: {
    products
  }

})


