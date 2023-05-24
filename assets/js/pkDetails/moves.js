function createMoves(pokemon) {
  const movesContainer = document.querySelector("#moves");
  movesContainer.innerHTML = "";
  movesContainer.classList.add("hidden");
  movesContainer.classList.add("moves");

  for (let i = 0; i < 12; i++) {
    const move = pokemon.moves[i];

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = move;

    li.appendChild(span);
    movesContainer.appendChild(li);
  }
}
