<template>
    <b-form @submit="onSubmit">

        <!-- Naam -->
        <b-form-group 
            id="name-group"
            label="Naam"
            label-for="name">
            <b-form-input
                id="name"
                type="text"
                v-model="ingredient.name"
                required/>
        </b-form-group>

        <!-- Type -->
        <b-form-group 
            id="type-group"
            label="Type"
            label-for="type">
            <b-form-select
                id="type"
                v-model="ingredient.ingredientType"
                :options="types"
                required/>
        </b-form-group>

     <b-button type="submit" variant="primary">Opslaan</b-button>

    </b-form>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                types: [
                    {value: "cheese", text: "Kaas"},
                    {value: "meat", text: "Vlees"},
                    {value: "sauce", text: "Saus"},
                    {value: "vegetable", text: "Groente"},
                    {value: "other", text: "Anders"}
                ],
                response: "response goes here",
                ingredient: {
                    _id: '',
                    ingredientType: '',
                    name: '',
                },
            };
        },
        methods: {
            onSubmit(evt) {
                axios.post('http://localhost:8080/api/ingredient', {
                    name: this.ingredient.name,
                    type: this.ingredient.ingredientType,
                }).then((response) => {
                    this.$router.push({
                        name: 'ingredients',
                    })
                })
                .catch((error) => console.log(error))
            },
        }
    };
</script>