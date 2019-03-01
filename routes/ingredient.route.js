const routes = require('express').Router()
const controller = require('../controllers/ingredient.controller')

routes.get("/", controller.getAllIngredients)
routes.post("/", controller.insertIngredient)

module.exports = routes