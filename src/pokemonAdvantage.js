const fetch = require('node-fetch');

const onPokemonAdvantage = async (pokemonOneName, pokemonTwoName) => {
    const pokemonOneTypes = await pokemonTypes(pokemonOneName);
    const pokemonTwoTypes = await pokemonTypes(pokemonTwoName);

    if (pokemonOneTypes !== null && pokemonTwoTypes !== null) {
        return {
            status: 200,
            data: await pokemonDamageRelations(pokemonOneTypes, pokemonTwoTypes)
        };
    }

    return { status: 404, data: null };
};

const pokemonTypes = async pokemonName => {
    const pokemon = await fetchPokemonData(pokemonName);

    if (pokemon !== null) {
        let pokemonTypes = new Array();

        for (let i = 0; i < pokemon.types.length; i++) {
            pokemonTypes.push(pokemon.types[i].type.name);
        }

        return pokemonTypes;
    }

    return null;
};

const fetchPokemonData = async pokemonName => {
    // Fetch pokemon data from external API
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const response = await fetch(url);

    if (response.status === 200) {
        return await response.json();
    }

    return null; 
};

const pokemonDamageRelations = async (pokemonOneTypes, pokemonTwoTypes) => {
    let doubleDamageTo = false;
    let halfDamageFrom = false;

    let pokemonOne = {
        double_damage_to: new Array(),
        half_damage_from: new Array()
    };

    for (let i = 0; i < pokemonOneTypes.length; i++) {
        // Fetch pokemon type data from external API
        const url = `https://pokeapi.co/api/v2/type/${pokemonOneTypes[i]}`;
        const response = await fetch(url);
        const data = await response.json();

        const double_damage_to = data.damage_relations.double_damage_to;
        const half_damage_from = data.damage_relations.half_damage_from;

        for (let i = 0; i < double_damage_to.length; i++) {
            pokemonOne.double_damage_to.push(double_damage_to[i].name);
        }

        for (let i = 0; i < half_damage_from.length; i++) {
            pokemonOne.half_damage_from.push(half_damage_from[i].name);
        }

        for (let i = 0; i < pokemonTwoTypes.length; i++) {
            if (pokemonOne.double_damage_to.indexOf(pokemonTwoTypes[i]) !== -1) {
                doubleDamageTo = true;
            }
            if (pokemonOne.half_damage_from.indexOf(pokemonTwoTypes[i]) !== -1) {
                halfDamageFrom = true;
            }
        }

        pokemonOne.double_damage_to = new Array();
        pokemonOne.half_damage_from = new Array();
    }

    return { double_damage_to: doubleDamageTo, half_damage_from: halfDamageFrom };
};

module.exports = {
    onPokemonAdvantage
};
