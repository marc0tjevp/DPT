const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ingredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredientType: {
    type: String,
    enum: ['cheese', 'meat', 'sauce', 'vegetable', 'other', 'unknown'],
    default: 'unknown',
    required: true
  }
})

const Ingredient = mongoose.model('ingredient', ingredientSchema)

module.exports = {
  Ingredient,
  ingredientSchema
}