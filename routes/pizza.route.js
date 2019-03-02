const routes = require('express').Router()
const controller = require('../controllers/pizza.controller')

routes.get('/', controller.getAllPizzas)
routes.get('/random', controller.getRandomPizza)
routes.get('/:id', controller.getPizzaByID)
routes.post('/', controller.insertPizza)

module.exports = routes