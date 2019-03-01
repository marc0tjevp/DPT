const routes = require('express').Router()

const pizza = require('./pizza.route')
const ingredient = require('./ingredient.route')

routes.get('/', (req, res) => res.status(200).json({"messsage": "Hello World!"}))
routes.use('/pizza', pizza)
routes.use('/ingredient', ingredient)
routes.use('*', (req, res) => res.status(404).json({"message": "Not found"}).end())

module.exports = routes