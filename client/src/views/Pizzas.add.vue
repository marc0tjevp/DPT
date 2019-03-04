<template>
    <b-form @submit.prevent="onSubmit">

        <!-- Naam -->
        <b-form-group 
            id="name-group"
            label="Naam"
            label-for="name">
            <b-form-input
                id="name"
                type="text"
                v-model="pizza.name"
                required/>
        </b-form-group>

        <!-- Ingredients -->
        <b-row>
            <b-col cols="3">
                <b-form-group label="Saus">
                    <b-form-checkbox-group
                        id="ingredients-sauce"
                        name="ingredients-sauce"
                        stacked
                        v-model="pizza.ingredients"
                        :options="ingredients.sauce"
                    />
                </b-form-group>
            </b-col>

            <b-col cols="3">
                <b-form-group label="Groente">
                    <b-form-checkbox-group
                        id="ingredients-vegetable"
                        name="ingredients-vegetable"
                        stacked
                        v-model="pizza.ingredients"
                        :options="ingredients.vegetable"
                    />
                </b-form-group>
            </b-col>

            <b-col cols="3">
                <b-form-group label="Vlees">
                    <b-form-checkbox-group
                        id="ingredients-meat"
                        name="ingredients-meat"
                        stacked
                        v-model="pizza.ingredients"
                        :options="ingredients.meat"
                    />
                </b-form-group>
            </b-col>

            <b-col cols="3">
                <b-form-group label="Kaas">
                    <b-form-checkbox-group
                        id="ingredients-cheese"
                        name="ingredients-cheese"
                        stacked
                        v-model="pizza.ingredients"
                        :options="ingredients.cheese"
                    />
                </b-form-group>
            </b-col>

            <b-col>
                <b-form-group v-if="ingredients.other.length > 0" label="Overig">
                    <b-form-checkbox-group
                        id="ingredients-other"
                        name="ingredients-other"
                        stacked
                        v-model="pizza.ingredients"
                        :options="ingredients.other"
                    />
                </b-form-group>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-form-checkbox switch v-model="pizza.vegan" name="vegan-check">
                    Vegan Pizza
                </b-form-checkbox>
            </b-col>
            <b-col>
                <b-form-checkbox switch v-model="pizza.gluten" name="vegan-check">
                    Gluten-vrij verkrijgbaar
                </b-form-checkbox>
            </b-col>
            <b-col>
                <b-form-checkbox switch v-model="pizza.promo" name="vegan-check">
                    Promo Pizza
                </b-form-checkbox>
            </b-col>
        </b-row>

        <b-button type="submit" variant="primary">Opslaan</b-button>

    </b-form>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                pizza: {
                    name: '',
                    ingredients: [],
                    vegan: false,
                    promo: false,
                    gluten: false,
                },
                ingredients: {
                    sauce: [],
                    meat: [],
                    cheese: [],
                    vegetable: [],
                    other: [],
                },
                response: "",
            };
        },
        methods: {

        getIngredients() {
                axios.get("http://localhost:8080/api/ingredient")
                .then(response => {
                    response.data.forEach(i => {
                        var select = { "value": i.name, "text": i.name, "type": i.ingredientType }
                        if (i.ingredientType == 'sauce') this.ingredients.sauce.push(select)
                        if (i.ingredientType == 'meat') this.ingredients.meat.push(select)
                        if (i.ingredientType == 'cheese') this.ingredients.cheese.push(select)
                        if (i.ingredientType == 'vegetable') this.ingredients.vegetable.push(select)
                        if (i.ingredientType == 'other' || i.ingredientType == "unknown") this.ingredients.other.push(select)
                    })
                })
                .catch(error => console.log(error))
            },

            onSubmit() {
                axios.post('http://localhost:8080/api/pizza', {
                    name: this.pizza.name,
                    ingredients: this.pizza.ingredients,
                    vegan: this.pizza.vegan,
                    promo: this.pizza.promo,
                    gluten: this.pizza.gluten
                }).then((response) => {
                    console.log(response)
                    if (response.status == 200) {
                        this.$router.push({
                            name: 'pizzas',
                        })
                    }
                })
                .catch((error) => console.log(error))
            },
        },

        mounted() {
            this.getIngredients()
        }
    };
</script>