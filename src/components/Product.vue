<template>
  <div>
    <my-header >ss</my-header>
    <div class="row">
      <h2> This is the id {{ $route.params.id }}</h2>
      <div class="card h-70 col-md-6">
        <figure>
          <img class="card-img-top" v-bind:src="product.image"/>
        </figure>

        <div class="col-md-6 col-md-offset-0 description">
          <h2>{{ product.title }}</h2>
          <p v-html="product.description"></p>
          <p class="price">
            {{ product.price }}
          </p>
          <button @click="info">Инфо о продукте</button>
        <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myHeader from "./Header.vue";//импортируем компонент header
export default {
  components: { myHeader },
    data() {
      return {
        product: ''
      }
    },
    methods: {
      info() {
        this.$router.push({name: 'Info'})
      }
    },
    created: function() {
    axios.get('/static/products.json')
    .then((response) =>{
      this.product = response.data.products.filter(data => data.id == this.$route.params.id)[0]
      this.product.image = '/' + this.product.image;
    });
  }
}


</script>
