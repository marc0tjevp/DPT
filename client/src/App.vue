<template>
  <div id="app">

    <div>
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand to="/">
          <img height="32px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Domino%27s_pizza_logo.svg/1200px-Domino%27s_pizza_logo.svg.png"
            class="d-inline-block align-top" alt="Dominos" />
          Pizza Trainer
        </b-navbar-brand>

        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item to="/">Pizza's</b-nav-item>
            <b-nav-item to="/ingredients">Ingredienten</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-button to="/flashcards">Start Training</b-button>
          </b-navbar-nav>
        </b-collapse>

      </b-navbar>
    </div>

    <b-container>
      <router-view />
    </b-container>

  </div>
</template>

<script>
  import Pizzas from './components/Pizzas.vue'

  export default {
    name: 'app',
    components: {
      Pizzas
    }
  }
</script>

<style>
  .list-group-item {
    border-radius: 0px !important;
    padding: 20px !important;
  }

  .navbar-toggler {
    border-radius: 0px !important;
  }

  .row {
    margin-bottom: 20px;
  }

  .btn {
    background-color: #e21836 !important;
    border-color: #e21836 !important;
    border-radius: 0px !important;
  }

  .navbar {
    margin-bottom: 20px;
    background-color: #006491 !important;
  }

  .navbar-brand img {
    margin-right: 8px;
  }

  .card {
    border-radius: 0px !important;
  }
</style>