<template>
  <div class="ingredients">

    <b-row>
      <b-col>
        <h3>Ingrediënten</h3>
      </b-col>
      <b-col>
        <b-button class="float-right" to="/ingredients/add">Ingredient toevoegen</b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col>

        <b-list-group v-for="(ingredient, index) in ingredients" :key="index">
          <b-list-group-item class="shadow-sm">

            <div class="d-flex w-100 justify-content-between">
              <p class="mb-1">{{ingredient.name}}</p>

              <div v-if="ingredient.ingredientType == 'cheese'">
                <img height="28" src="@/assets/icons/cheese.png" />
              </div>

              <div v-if="ingredient.ingredientType == 'sauce'">
                <img height="28" src="@/assets/icons/sauce.png" />
              </div>

              <div v-if="ingredient.ingredientType == 'meat'">
                <img height="28" src="@/assets/icons/meat.png" />
              </div>

              <div v-if="ingredient.ingredientType == 'vegetable'">
                <img height="28" src="@/assets/icons/vegetable.png" />
              </div>
            </div>

          </b-list-group-item>
        </b-list-group>

      </b-col>
    </b-row>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Ingredients',
    data() {
      return {
        ingredients: [],
      }
    },
    methods: {
      getIngredients() {
        axios.get("http://localhost:8080/api/ingredient")
          .then(response => this.ingredients = response.data)
          .catch(error => console.log(error))
      }
    },

    mounted() {
      this.getIngredients();
    }
  }
</script>

<style scoped>
  .col .list-group-item {
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>