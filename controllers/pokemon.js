const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  try{
    const foundPokeFaves = await db.pokemon.findAll()
    res.render('pokemon/index', {
      pokemon: foundPokeFaves
    })
  } catch(err) {
    console.log(err)
  }
  
});

// GET /pokemon/:name
router.get('/:name', async (req, res) => {
  try {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/bulbasaur`).then(apiResponse => {
      let foundPokemon = apiResponse.data

      console.log(apiResponse.data)
      res.render('pokemon/show', {
        pokemon: foundPokemon
      })
    })
  } catch(err) {
    console.log(err)
  }
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  try{
    const newPokemon = await db.pokemon.create({
      name: req.body.name
    })
    console.log(`made new pokemon ${newPokemon}`)
    res.redirect('pokemon')
  } catch(err) {
    console.log(err)
  }
  // res.send(req.body);
});

module.exports = router;