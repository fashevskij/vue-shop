<template>
  <div>
    <my-header :cartItemCount="cartItemCount">

    </my-header>
    <div class="container">
     <div class="col-md-6">
            <strong>Имя:</strong>
            <input v-model.trim="order.firstName" class="form-control" />
        </div>
        <div class="col-md-6">
            <strong>Фамилия:</strong>
            <input v-model.trim="order.lastName" class="form-control" />
        </div>
        <div class="form-group">
            <div class="col-md-6"><strong>Ваш адресс:</strong></div>
            <div class="col-md-6">
                <input v-model.trim="order.address" class="form-control" />
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-6"><strong>Город:</strong></div>
            <div class="col-md-6">
                <input v-model.trim="order.city" class="form-control" />
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-2">
                <strong>State:</strong>
                <select v-model="order.state" class="form-control">
                    <option disabled value="">State</option>
                    <option v-for="(state, key) in states" v-bind:value="state">{{key}}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-6 col-md-offset-4">
                <strong>Почтовый индекс:</strong>
                <input v-model.number="order.zip" class="form-control" type="number" />
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-6 boxes">
                <input type="radio" id="home" v-bind:value="order.home" v-model="order.method">
                <label for="home">Домашний адресс</label>
                <input type="radio" id="business" v-bind:value="order.business" v-model="order.method">
                <label for="business">Рабочий андресс</label>
            </div>
        </div>

        <div class="form-group">
            <div class="col-md-6 boxes">
                <input type="checkbox" id="gift" value="true" v-bind:true-value="order.sendGift"
                    v-bind:false-value="order.dontSendGift" v-model="order.gift">
                <label for="gift">Упаковать как подарок?</label>
            </div>
        </div>
        <button v-on:click="submitForm" type="submit" class="btn btn-secondary submit">Заказать</button>
        <div class="card" style="max-width:540px;">
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Имя: {{order.firstName}}</li>
                    <li class="list-group-item">Фамилия: {{order.lastName}}</li>
                    <li class="list-group-item">Адресс: {{order.address}}</li>
                    <li class="list-group-item">Город: {{order.city}}</li>
                    <li class="list-group-item">State: {{order.state}}</li>
                    <li class="list-group-item">Почтовый индекс: {{order.zip}}</li>
                    <li class="list-group-item">Отправка: {{order.method}}</li>
                    <li class="list-group-item">Подарок: {{order.gift}}</li>
                </ul>
            </div>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import myHeader from './Header.vue';
export default {
  name: 'Form',
  props: ['cartItemCount'],
  data () {
    return {
      states : {
        AL: 'Alabama',
        AK: 'Alaska',
        AR: 'Arizona',
        CA: 'California',
        NV: 'Nevada'
      },
      order: {
        firsName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        state: '',
        method: 'Отправим домой',
        gift: 'мы его упакуем',
        sendGift: "мы его упакуем",
        dontSendGift: "отправим как есть",
        home: 'Отправим домой',
        business: 'Отправим на работу'
      }
    }
  },
components: {myHeader},
methods: {
    submitForm() {
      alert('Submited');
    }
  }
};
</script>
