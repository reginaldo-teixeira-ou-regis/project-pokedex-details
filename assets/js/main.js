const content = document.querySelector("#content");
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonCard = document.querySelector("#pokemonCard");
const currentPokemon = document.querySelector("#currentPokemon div");

const maxRecords = 250;
const limit = 12;
let offset = 0;

function handlePokemon(pokemon) {
  content.classList.add("hidden");
  pokemonCard.classList.remove("hidden");
  updatePokemon(pokemon);
}

function convertPokemonToLi(pokemon) {
  const li = document.createElement("li");
  li.classList.add("pokemon", ...pokemon.types);
  li.innerHTML = `
    <span class="number">#${pokemon.id}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
      <ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
      </ol>
      <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>`;
  li.addEventListener("click", () => handlePokemon(pokemon));
  return li;
}

async function loadPokemonItems(offset, limit) {
  const pokemons = await pokeApi.getPokemons(offset, limit);
  const newElements = pokemons.map(convertPokemonToLi);
  newElements.forEach((pokemon) => pokemonList.appendChild(pokemon));
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", async () => {
  offset += limit;
  if (offset >= maxRecords) {
    const newLimit = maxRecords - (offset - limit);
    await loadPokemonItems(offset, newLimit);
    loadMoreButton.remove();
  } else {
    await loadPokemonItems(offset, limit);
  }
});
