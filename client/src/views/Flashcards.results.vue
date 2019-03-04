<template>
    <div class="results">

        <b-row>
            <b-col cols="12">
                <h3>Resultaten</h3>
                <p>Aantal Pizza's: {{this.stats.right + this.stats.wrong}}</p>
                <p>Aantal Goed: {{this.stats.right}}</p>
                <p>Aantal Fout: {{this.stats.wrong}}</p>
            </b-col>

            <b-col>
                <h3>Goed</h3>
                <b-list-group v-for="(pizza, index) in stats.rightPizzas" :key="index">
                    <b-list-group-item>
                        {{pizza.name}}
                    </b-list-group-item>
                </b-list-group>
            </b-col>

            <b-col>
                <h3>Fout</h3>
                <b-list-group v-for="(pizza, index) in stats.wrongPizzas" :key="index">
                    <b-list-group-item>
                        {{pizza.name}}
                    </b-list-group-item>
                </b-list-group>
            </b-col>

        </b-row>

        <b-row>
            <b-col>
                <b-button class="w-100" to="/flashcards">Alle Pizza's opnieuw proberen</b-button>
            </b-col>
            <b-col>
                <b-button class="w-100 disabled" to="/flashcards">Foute Pizza's opnieuw proberen</b-button>
            </b-col>
        </b-row>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Results',
        data() {
            return {
                stats: {
                    percentage: "-",
                    right: 0,
                    rightPizzas: [],
                    wrong: 0,
                    wrongPizzas: []
                }
            }
        },

        created() {
            this.stats = this.$route.params.stats;
        },

        methods: {

        }

    }
</script>

<style scoped>
</style>