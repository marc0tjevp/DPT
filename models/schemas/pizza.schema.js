const mongoose = require('mongoose')
const Ingredient = require('./ingredient.schema').ingredientSchema
const Schema = mongoose.Schema

var pizzaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [Ingredient],
    required: false
  },
  vegan: {
    type: Boolean,
    default: false,
    required: false
  },
  promo: {
    type: Boolean,
    default: false,
    required: false
  },
  gluten: {
    type: Boolean,
    default: true,
    required: false
  }
})

const Pizza = mongoose.model('pizza', pizzaSchema)

module.exports = {
  Pizza,
  pizzaSchema
}