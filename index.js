const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const pokemonAdvantage = require('./src/pokemonAdvantage');
const pokemonMoves = require('./src/pokemonMoves');

// Pokemon advantage endpoint
app.get('/api/v1/pokemon-advantage/:pokemonOne/:pokemonTwo', async (req, res) => {
    const response = await pokemonAdvantage.onPokemonAdvantage(
        req.params.pokemonOne,
        req.params.pokemonTwo
    );
    res.status(response.status).send(response.data);
});

// Pokemon moves endpoint ...
app.get('/api/v1/pokemon-moves/:language/:pokemonList/:movesLimit', async (req, res) => {
    const response = await pokemonMoves.onPokemonMoves(
        req.params.language,
        req.params.pokemonList,
        req.params.movesLimit
    );
    res.status(response.status).send(response.data);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

module.exports = app;
