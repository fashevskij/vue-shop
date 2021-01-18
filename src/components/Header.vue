<template>
  <div>
    <header>
      <nav class="navbar navbar-dark bg-dark">
        <h1>
          <router-link :to="{ name: 'iMain' }">
            {{ siteName }}
          </router-link>
        </h1>
        <div class="nav justify-content-end">
          <router-link
            active-class="active"
            tag="button"
            class="btn btn-light mx-3"
            :to="{ name: 'Form' }"
          >
            Корзина {{
              cartItemCount
            }}
          </router-link>

        <div v-if="!mySession">
          <button
            type="button"
            class="btn btn-light"
            v-on:click="signin"
          >
            Sign In
          </button>
        </div>
        <div v-else>
          <button type="button" class="btn btn-light" v-on:click="signOut">
            btn-lg"
            <img class="photo" :src="mySession.photoURL"/>
            Sign Out
          </button>
        </div>
        </div>
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
