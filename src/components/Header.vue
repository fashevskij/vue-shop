<template>
  <div>
    <header>
      <nav class="navbar navbar-dark bg-dark">
        <h1>
          <router-link :to="{ name: 'iMain' }">
            {{ siteName }}
          </router-link>
        </h1>
        <button class="btn btn-light">
          <router-link
            active-class="active"
            tag="button"
            class="btn btn-default btn-lg"
            :to="{ name: 'Form' }"
          >
            <span class="glyphicon glyphicon-shopping-cart">{{
              cartItemCount
            }}</span>
            Корзина
          </router-link>
        </button>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "my-header",
  data() {
    return {
      siteName: "GALAXY",
    };
  },
  props: ["cartItemCount"],
  methods: {
    showCheckout() {
      this.$router.push({ name: "Form" }); //напрявляет приложение по маршруту формы
    },
  },
};
</script>

<!-- атрибудт "scoped" ограничивает обрасть видимости css текущим компонентом -->
<style scoped>
a {
  text-decoration: none;
  color: rgb(46, 182, 41);
}
.router-link-exact-active {
  color: rgb(62, 13, 153);
}
</style>
