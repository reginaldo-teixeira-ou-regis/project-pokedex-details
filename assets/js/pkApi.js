const pokeApi = {
  getPokemonEvolution: async (id) => {
    const url = `https://pokeapi.co/api/v2/evolution-chain/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },

  getPokemonDetail: async (pokemon) => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    return convertPokeApiDetailToPokemon(data);
  },

  getPokemons: async (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    const pokemons = data.results;
    const detailRequests = pokemons.map((pokemon) => pokeApi.getPokemonDetail(pokemon));
    const pokemonsDetails = await Promise.all(detailRequests);
    return pokemonsDetails;
  },
};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const { id, name, types, abilities, sprites, height, weight, species, stats, moves } = pokeDetail;
  const [type] = types.map((typeSlot) => typeSlot.type.name);
  const abilitiesList = abilities.map((ability) => ability.ability.name);
  const photo = sprites.other.dream_world.front_default;
  const speciesUrl = species.url;
  const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;
  const attack = stats.find((stat) => stat.stat.name === "attack").base_stat;
  const defense = stats.find((stat) => stat.stat.name === "defense").base_stat;
  const specialAttack = stats.find((stat) => stat.stat.name === "special-attack").base_stat;
  const specialDefense = stats.find((stat) => stat.stat.name === "special-defense").base_stat;
  const speed = stats.find((stat) => stat.stat.name === "speed").base_stat;
  const movesList = moves.map((move) => move.move.name);

  return {
    id,
    name,
    types: [...types.map((typeSlot) => typeSlot.type.name)],
    type,
    abilities: [...abilitiesList],
    photo,
    height,
    weight,
    speciesUrl,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    moves: [...movesList],
  };
}
