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
                  </button>
                  <span
                    class="inventory-message"
                    v-if="
                      product.availableInventory - cartCount(product.id) === 0
                    "
                  >
                    Товара больше не осталось=(
                  </span>
                  <span
                    class="inventory-message"
                    v-else-if="
                      product.availableInventory - cartCount(product.id) < 4
                    "
                  >
                    Осталось
                    {{ product.availableInventory - cartCount(product.id) }}
                    товара!
                  </span>
                  <span class="inventory-message" v-else>
                    Спешите купить!
                  </span>
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
export default {
  name: "iMain",
  data() {
    return {
      products: [], //массив товаров из json
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
  created: function () {
    axios.get("./static/products.json").then((response) => {
      this.products = response.data.products;
    });
  },
  computed: {
    //Вычисляемые свойства, которые будут подмешаны к экземпляру Vue
    cartItemCount: function () {
      return this.cart.length || "";
    },
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
