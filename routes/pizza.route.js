const routes = require('express').Router()
const controller = require('../controllers/pizza.controller')

routes.get('/', controller.getAllPizzas)
routes.post('/', controller.insertPizza)

module.exports = routes