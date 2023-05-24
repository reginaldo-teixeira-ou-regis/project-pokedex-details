const infoPokemon = document.querySelector("#infoPokemon");
const arrowLeft = document.querySelector("#arrow-left");
const navegation = document.querySelectorAll("nav h2");

arrowLeft.addEventListener("click", resetPokemonCard);

navegation.forEach((element, index) => {
  element.addEventListener("click", () => isActive(index));
});

async function updatePokemon(pokemon) {
  classesPokemonCard(pokemon.type);
  currentPokemon.innerHTML = `
    <span class="name">${pokemon.name}</span>
    <span class="number">#${pokemon.id}</span>

    <div class="detail">
      <ol class="types">
        <span class="type ${pokemon.type}">${pokemon.type}</span>
        <span class="type ${pokemon.type}">poison</span>
      </ol>

      <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
  `;

  createAbout(pokemon);
  createAttributes(pokemon);
  await createEvolution(pokemon);
  await createMoves(pokemon);
}

function classesPokemonCard(className) {
  const parentElement = currentPokemon.parentElement;
  parentElement.classList.remove(...parentElement.classList);
  parentElement.classList.add("pokemon", className);
}

function resetPokemonCard() {
  resetActive();
  content.classList.remove("hidden");
  pokemonCard.classList.add("hidden");
  navegation[0].classList.add("active");
}

function isActive(index) {
  const ols = infoPokemon.querySelectorAll("ol");

  resetActive();
  navegation[index].classList.add("active");
  ols[index].classList.remove("hidden");
}

function resetActive() {
  const ols = infoPokemon.querySelectorAll("ol");

  navegation.forEach((element) => {
    element.classList.remove("active");
  });

  ols.forEach((ol) => {
    ol.classList.add("hidden");
  });
}
