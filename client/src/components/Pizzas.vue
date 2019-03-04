<template>
  <div class="pizzas">

    <b-row>
      <b-col class="pizza" cols="6" v-for="(pizza, index) in pizzas" :key="index">

        <b-card class="shadow-sm h-100" v-b-toggle="pizza.name">

          <b-row>
            <b-col cols="8">
              <b-card-title>{{pizza.name}}</b-card-title>
            </b-col>

            <b-col>
              <div v-if="pizza.vegan == true">
                <img class="header-icon float-right" alt="Vegetarisch" height="28" src="@/assets/icons/veg.png" />
              </div>
              <div v-if="pizza.gluten == true">
                <img class="header-icon float-right" alt="Gluten Vrij" height="28" src="@/assets/icons/gluten.jpg" />
              </div>
            </b-col>
          </b-row>

          <!-- <b-collapse :id="pizza.name" class="mt-2"> -->
            <b-card-text>
              <b-list-group v-for="(ingredient, index) in pizza.ingredients" :key="index">
                <b-list-group-item>
                  {{ingredient.name}}
                </b-list-group-item>
              </b-list-group>
            </b-card-text>
          <!-- </b-collapse> -->

        </b-card>

      </b-col>
    </b-row>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Pizzas',
    data() {
      return {
        pizzas: [],
      }
    },
    methods: {
      getPizzas() {
        axios.get("http://192.168.178.199:8080/api/pizza")
          .then(response => (this.pizzas = response.data))
          .catch(error => console.log(error))
      }
    },

    mounted() {
      this.getPizzas();
    }
  }
</script>

<style scoped>
  .pizza {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .pizza .list-group-item {
    margin-bottom: 5px;
  }

  .header-icon {
    margin-right: 5px;
  }
</style>