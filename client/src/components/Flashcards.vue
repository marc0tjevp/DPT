<template>
    <div class="flashcards">

        <b-row>
            <b-col>
                <b-card class="shadow-sm">
                    <b-row style="margin-bottom: 5px;">
                        <b-col cols="3">Aantal Goed: {{stats.right}}</b-col>
                        <b-col cols="3">Aantal Fout: {{stats.wrong}}</b-col>
                        <b-col cols="3">Pizza's te gaan: {{pizzasLeft}}</b-col>
                        <b-col cols="3">Cijfer: {{stats.percentage}}%</b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>

        <b-row class="h-100">
            <b-col class="h-100 d-table">

                <b-card @click="toggle()" class="shadow-sm flashcard d-table-cell align-middle">
                    <b-card-text>

                        <div class="flash-card front text-center h-100" v-if="isHidden">
                            <h1>{{selectedPizza.name}}</h1>
                        </div>

                        <div class="flash-card back text-center" v-if="!isHidden">
                            <b-list-group v-for="(ingredient, index) in selectedPizza.ingredients" :key="index">
                                <b-list-group-item>

                                    {{ingredient.name}}

                                </b-list-group-item>
                            </b-list-group>
                        </div>

                    </b-card-text>
                </b-card>

            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-button class="w-100" v-on:click="wrongPizza()">Fout</b-button>
            </b-col>
            <b-col>
                <b-button class="w-100 btn-right" v-on:click="rightPizza()">Goed</b-button>
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
                selectedPizza: {},
                counter: 0,
                pizzasLeft: 0,
                isHidden: true,
                stats: {
                    percentage: "-",
                    right: 0,
                    rightPizzas: [],
                    wrong: 0,
                    wrongPizzas: []
                }
            }
        },
        methods: {

            getPizzas() {
                axios.get("http://192.168.178.199:8080/api/pizza")
                    .then(response => {
                        this.pizzas = response.data
                        this.pizzasLeft = response.data.length
                        this.selectedPizza = response.data[0]
                    })
                    .catch(error => console.log(error))
            },

            rightPizza() {
                if (this.pizzasLeft > 0) {

                    // Flip card back
                    this.isHidden = true

                    // Save stats
                    this.stats.right++
                    this.stats.rightPizzas.push(this.selectedPizza)

                    this.stats.percentage = (this.stats.right / this.pizzas.length * 100)

                    // Pizza's left
                    this.pizzasLeft--
                }

                if (this.counter + 1 < this.pizzas.length) {
                    // Next pizza
                    this.selectedPizza = this.pizzas[this.counter + 1]
                    this.counter++
                } else {
                    this.$router.push({
                        name: 'flashcardsResults',
                        params: {
                            stats: this.stats
                        }

                    })
                }
            },

            wrongPizza() {
                if (this.pizzasLeft > 0) {

                    // Flip card back
                    this.isHidden = true

                    // Save stats
                    this.stats.wrong++
                    this.stats.wrongPizzas.push(this.selectedPizza)

                    // Pizza's left
                    this.pizzasLeft--
                }

                if (this.counter + 1 < this.pizzas.length) {

                    // Next pizza
                    this.selectedPizza = this.pizzas[this.counter + 1]
                    this.counter++
                } else {
                    this.$router.push({
                        name: 'flashcardsResults',
                        params: {
                            stats: this.stats
                        }

                    })
                }
            },

            toggle() {
                this.isHidden = !this.isHidden
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

    .flashcard {
        height: 500px;
        cursor: pointer;
    }

    .header-icon {
        margin-right: 5px;
    }

    .btn-right {
        background-color: #316c42 !important;
    }
</style>