function createAttributes(pokemon) {
  const attributes = document.querySelector("#attributes");
  attributes.innerHTML = "";
  attributes.classList.add("hidden");

  const attributesList = [
    { label: "HP", value: pokemon.hp },
    { label: "Attack", value: pokemon.attack },
    { label: "Defense", value: pokemon.defense },
    { label: "Sp. Atk", value: pokemon.specialAttack },
    { label: "Sp. Def", value: pokemon.specialDefense },
    { label: "Speed", value: pokemon.speed }
  ];

  attributesList.forEach(attribute => {
    const attributeItem = createElementAttribute(attribute.label, attribute.value);
    attributes.appendChild(attributeItem);
  });
}

function createElementAttribute(label, value) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const div = document.createElement("div");
  const strong = document.createElement("strong");
  const color = value > 50 ? "green" : "red";

  span.textContent = label;
  strong.textContent = value;
  div.classList.add("experienceBar");
  div.style.height = "2px";
  div.innerHTML = `<div style="--i: ${(value * 100) / 210}%;--color:${color}"></div>`;
  li.appendChild(strong);
  li.appendChild(span);
  li.appendChild(div);

  return li;
}
