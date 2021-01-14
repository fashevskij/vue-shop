<template>
  <div>
    <my-header :cartItemCount="cartItemCount"></my-header>
    <main>
      <div class="container">
        <div class="row row-cols-1 row-cols-md-2 g-4">
          <div v-for="product in sortedProducts">
            <div class="col">
              <div class="card h-100">
                <img
                  v-bind:src="product.image"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <router-link tag="h2":to="{ name: 'Id', params: {id: product.id}}">
                    {{product.title}}
                  </router-link>
                  <p v-html="product.description" class="card-text"></p>
                  <p class="price">{{ product.priceUah | formatPrice }}</p>
                  <button
                    v-on:click="addToCart(product)"
                    v-if="canAddToCart(product)"
                    type="button"
                    class="btn btn-secondary"
                  >
                    Купить
                  </button>
                  <button
                    v-else
                    type="button"
                    class="btn btn-secondary"
                    disabled
                  >
                    Купить
                  </button><transition name="bounce" mode="out-in"
                  <span
                    class="inventory-message"
                    v-if="
                      product.availableInventory - cartCount(product.id) === 0
                    " key = "0"
                  >
                    Товара больше не осталось=(
                  </span>

                  <span
                    class="inventory-message"
                    v-else-if="
                      product.availableInventory - cartCount(product.id) < 4
                    " key=""
                  >
                    Осталось
                    {{ product.availableInventory - cartCount(product.id) }}
                    товара!
                  </span>

                  <span class="inventory-message" v-else key="">
                    Спешите купить!
                  </span> </transition>
                  <div class="rating">
                    <span
                      v-bind:class="{
                        'rating-active': checkRating(n, product),}"v-for="n in 5">☆</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import myHeader from "./Header.vue";
import {mapGetters} from 'vuex';//импорт всех гетеров
export default {
  name: "iMain",
  data() {
    return {
      cart: [], //корзина
    };
  },
  components: { myHeader },
  methods: {
    //Функция добавления в корзину
    addToCart: function (myProduct) {
      this.cart.push(myProduct.id);
    },
    //функция корзины
    showCheckout() {
      this.showProduct = !this.showProduct;
    },
    submitForm() {
      alert("submitted");
    },
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    },
    canAddToCart: function (myProduct) {
      //проверка сколько в корзине элементов в сравнении с указаным ограничением
      return myProduct.availableInventory > this.cartCount(myProduct.id);
    },
    //метод возвращающий количество элементов в корзине по id
    cartCount(id) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    },
  },
  filters: {
    formatPrice: function (priceUah) {
      if (!parseInt(priceUah)) {
        return "";
      } //если значение не инт то вернем ничего
      if (priceUah > 99999) {
        //если оно больше чем
        let priceString = (priceUah / 27.5).toFixed(2); //делим цену на курс доллара + 2 знака после запятой
        let priceArray = priceString.split("").reverse();
        let index = 3;
        while (priceArray.length > index + 3) {
          priceArray.splice(index + 3, 0, ",");
          index += 4;
        }
        return "$ " + priceArray.reverse().join("");
      } else {
        return "$ " + (priceUah / 27.5).toFixed(2);
      }
    },
  },
  created: function() {
    this.$store.dispatch('initStore');//вызывает код для инициализации хранилища Vuex
  },
  computed: {
    //Вычисляемые свойства, которые будут подмешаны к экземпляру Vue
    cartItemCount: function () {
      return this.cart.length || "";
    },
    ...mapGetters(['products']),
    //функция для сортировки продуктов по алфавитному порядку
    sortedProducts() {
      if (this.products.length > 0) {
        let productsArray = this.products.splice(0); //преобразуем обьект в массив
        function compare(a, b) {
          //функция сравнения заголовков товаров в массиве
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        }
        return productsArray.sort(compare); //возвращаем новый массив товаров
      }
    },
  },
};
</script>
<style scoped>
.bounce-enter-active {
  animation: shake 0.72s cubic-bezier(.37,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
@keyframes shake {
  10%, 90% {
    color: red;
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    color: red;
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
