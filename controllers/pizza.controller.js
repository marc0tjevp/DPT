const Pizza = require('../models/schemas/pizza.schema').Pizza
const Ingredient = require('../models/schemas/ingredient.schema').Ingredient

/*
    Returns all pizza's from database
*/
let getAllPizzas = (req, res) => {

    // Look for the pizza with name
    if (req.query.name) {
        Pizza.find({
            name: {
                '$regex': req.query.name,
                '$options': 'i'
            }
        }, (error, pizza) => {
            if (!error) res.status(200).json(pizza).end()
            else res.status(error.status || 500).json(error).end
        })
    }

    // Return all pizza's if there's no named parameters
    else {
        Pizza.find({}, (error, pizzas) => {
            if (!error) res.status(200).json(pizzas).end()
            else res.status(error.status || 500).json(error).end()
        })
    }
}

/*
    Get pizza by ID
*/
let getPizzaByID = (req, res) => {

    let id = req.params.id || ''

    if (id == '') {
        res.status(412).end()
        return
    }

    Pizza.findOne({
        _id: id
    }, (error, pizza) => {
        if (!error) res.status(200).json(pizza).end()
        else res.status(error.status || 500).json(error).end()
    })
}

/*
    Return a random pizza
*/
let getRandomPizza = (req, res) => {

    // Count pizza's
    Pizza.count().exec((error, count) => {

        // Catch errors
        if (error) {
            res.status(error.status || 500).json(error).end()
            return
        }

        // Get a random entry
        let random = Math.floor(Math.random() * count)

        // Query all pizza's but only fetch the offset
        Pizza.findOne().skip(random).exec((error, pizza) => {
            if(!error) res.status(200).json(pizza).end()
            else res.status(error.status || 500).json(error).end()
        })

    })

}


/* 
    Inserts a pizza into the database
    TODO: Handle not found ingredients
*/

let insertPizza = (req, res) => {

    let name = req.body.name || ''
    let ingredients = req.body.ingredients || []
    let vegan = req.body.vegan
    let promo = req.body.promo
    let gluten = req.body.gluten
    let ingredientsTemp = []
    let counter = 0;

    console.log(req.body)

    // Check for missing params
    if (name == '') {
        res.status(412).end()
        return
    }

    // Loop over all provided ingredients
    ingredients.forEach(i => {
        Ingredient.find({
            name: i
        }, (error, ingredient) => {

            // Catch errors
            if (error) res.status(error.status || 500).json(error).end()

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
    getPizzaByID,
    getAllPizzas,
    insertPizza,
    getRandomPizza
}