const Pizza = require('../models/schemas/pizza.schema').Pizza
const Ingredient = require('../models/schemas/ingredient.schema').Ingredient

/*
    Returns all pizza's from database
*/
let getAllPizzas = (req, res) => {
    Pizza.find({}, (error, pizzas) => {
        if (!error) res.status(200).json(pizzas).end()
        else res.status(error.status || 500).json(error).end()
    })
}

/* 
    Inserts a pizza into the database
    TODO: Handle not found ingredients
*/

let insertPizza = (req, res) => {

    let name = req.body.name || ''
    let ingredients = req.body.ingredients || []
    let vegan = req.body.vegan || ''
    let promo = req.body.promo || ''
    let gluten = req.body.gluten || ''
    let ingredientsTemp = []
    let counter = 0;

    // Check for missing params
    if (name == '' || vegan == '' || promo == '' || gluten == '') {
        res.status(412).end()
        return
    }

    // Loop over all provided ingredients
    ingredients.forEach(i => {
        Ingredient.find({
            name: i
        }, (error, ingredient) => {

            // Push the found ingredient to the temp array
            ingredientsTemp.push(ingredient[0])

            // Keep count of items
            counter++

            // When we loop over the whole array, insert the pizza with the new ingredient array
            if (counter === ingredients.length) {

                const pizza = new Pizza({
                    name: name,
                    ingredients: ingredientsTemp,
                    vegan: vegan,
                    promo: promo,
                    gluten: gluten
                })

                pizza.save((error) => {
                    if (!error) {
                        res.status(200).json(pizza).end()
                    } else res.status(error.status || 500).json(error).end()
                })

            }
        })
    })

}

module.exports = {
    getAllPizzas,
    insertPizza
}