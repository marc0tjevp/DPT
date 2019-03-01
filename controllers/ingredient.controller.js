const Ingredient = require('../models/schemas/ingredient.schema').Ingredient

/*
    Returns all ingredients from database
*/
let getAllIngredients = (req, res) => {
    Ingredient.find({}, (error, ingredients) => {
        if (!error) {
            res.status(200).json(ingredients).end()
        } else res.status(error.status || 500).json(error).end()
    })
}

/* 
    Inserts an ingredient into the database
*/

let insertIngredient = (req, res) => {

    let name = req.body.name || ''
    let type = req.body.type || ''

    if (name == '' || type == '') {
        res.status(412).end()
        return
    }

    const ingredient = new Ingredient({
        name: name,
        ingredientType: type
    })

    ingredient.save((error) => {
        if (!error) {
            res.status(200).json(ingredient).end()
        } else res.status(error.status || 500).json(error).end()
    })

}

module.exports = {
    getAllIngredients,
    insertIngredient
}