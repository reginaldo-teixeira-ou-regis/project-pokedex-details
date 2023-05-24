async function createEvolution(pokemon) {
  const evolution = document.querySelector("#evolution");
  evolution.innerHTML = "";
  evolution.classList.add("hidden", "evolution");

  const id = Math.ceil(pokemon.id / 3);
  const pokemonChain = await pokeApi.getPokemonEvolution(id);
  const urlImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

  const evolutionHTML = createEvolutionHTML(pokemonChain, id, urlImg);
  evolution.innerHTML = evolutionHTML;
}

function createEvolutionHTML(pokemonChain, id, urlImg) {
  const chain = pokemonChain.chain;
  const evolutions = [
    chain.species,
    ...chain.evolves_to.map(e => e.species),
    ...chain.evolves_to.map(e => e.evolves_to.map(ev => ev.species)).flat()
  ];

  return `
    <li>
      <div class="evolution">
        ${evolutions.map((evolution, index) => `
          <div class="img-group">
            <div class="img">
              <img src="${urlImg}/${id * 3 - (evolutions.length - index - 1)}.svg" alt="">
            </div>
            <p>${evolution.name}</p>
          </div>
          ${index < evolutions.length - 1 ? '<i class="fa fa-arrow-right"></i>' : ''}
        `).join('')}
      </div>
    </li>
  `;
}
