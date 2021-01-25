const fetch = require('node-fetch');

const onPokemonMoves = async (language, pokemonList, movesLimit) => {
    const pokemonNames = pokemonList.toString().split('&');

    if (await arePokemonNamesValid(pokemonNames)) {
        const pokemonNamesLength = pokemonNames.length;
        let pokemonMoves = new Array();
        let pokemonCommonMoves = new Array();

        // Store all the pokemon moves
        await Promise.all(pokemonNames.map(async pokemonName => {
            const moves = await requestPokemonMoves(pokemonName);
            pokemonMoves.push(moves);
        }));

        // Create an ocurrence map to track the common moves
        let movesOcurrences = new Map();
        pokemonMoves.map(pokemonMovesSet => {
            pokemonMovesSet.map(move => {
                if (movesOcurrences.has(move)) {
                    // Update the number of ocurrences of the pokemon move
                    const countedOcurrences = movesOcurrences.get(move) + 1;
                    movesOcurrences.set(move, countedOcurrences);

                    // Update the common pokemon moves structure if a common moves is found
                    if (countedOcurrences === pokemonNamesLength) {
                        pokemonCommonMoves.push(move);
                    }
                } else {
                    movesOcurrences.set(move, 1);
                }
            });
        });

        let result = await filterAndTranslateMoves(pokemonCommonMoves, language, movesLimit);

        return { status: 200, data: result };
    }
    
    return { status: 404, data: 'Invalid API use, see documentation for help' };
};

const arePokemonNamesValid = async pokemonNames => {
    // At least two pokemon are required
    if (pokemonNames.length >= 2) {
        let arePokemonNamesValid = true;
        
        // Fetch pokemon information to validate the data integrity
        await Promise.all(pokemonNames.map(async pokemonName => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            if (response.status !== 200 || pokemonName === '') { 
                arePokemonNamesValid = false;
            }
        }));

        return arePokemonNamesValid;
    }

    return false;
};

const filterAndTranslateMoves = async (pokemonCommonMoves, language, movesLimit) => {
    // Filter moves
    let filteredMoves = new Array();

    if (Number.isNaN(Number.parseInt(movesLimit))) {
        filteredMoves = pokemonCommonMoves;
    } else {
        for (let i = 0; i < movesLimit && i < pokemonCommonMoves.length; i++) {
            filteredMoves.push(pokemonCommonMoves[i]);
        }
    }

    // Translate filtered moves
    let translatedMoves = new Array();
    await Promise.all(filteredMoves.map(async moveName => {
        const translatedMoveName = await fetchPokemonMovesTranslated(moveName, language);
        translatedMoves.push(translatedMoveName);
    }));

    return translatedMoves;
}

const requestPokemonMoves = async pokemonName => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();

    let pokemonMoves = new Array();

    data.moves.map(pokemonMove => {
        // Push just the name of the pokemon move
        pokemonMoves.push(pokemonMove.move.name);
    });

    return pokemonMoves;
}

const fetchPokemonMovesTranslated = async (move, language) => {
    const response = await fetch(`https://pokeapi.co/api/v2/move/${move}`);
    const data = await response.json();
    const names = data.names;
    let translatedMove = move;
    
    names.map(moveTranslated => {
        if (moveTranslated.language.name === language) {
            translatedMove = moveTranslated.name;
        }
    });
    
    return translatedMove;
}

module.exports = {
    onPokemonMoves
};
