function createAbout(pokemon) {
  const about = document.querySelector("#about");
  about.innerHTML = "";
  about.classList.remove("hidden");

  const speciesItem = createListItem("Species", pokemon.name);
  const heightItem = createListItem("Height", `${pokemon.height} cm`);
  const weightItem = createListItem("Weight", `${pokemon.weight / 10} kg`);
  const abilitiesItem = createListItem("Abilities", pokemon.abilities.join(", "));

  appendChildren(about, [speciesItem, heightItem, weightItem, abilitiesItem]);
}

function createListItem(label, value) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  return listItem;
}

function appendChildren(parent, children) {
  children.forEach(child => parent.appendChild(child));
}
