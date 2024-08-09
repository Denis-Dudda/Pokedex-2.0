let firstNames = [];
let allPokemon = [];
let filterNames = [];
let allPokemonPlaceholder = [];
let counter = 0;
let aboutContainer = document.getElementById("about-container");
let baseStatsContainer = document.getElementById("base-stats-container");
let movesContainer = document.getElementById("moves-container");
let ShowButton = document.getElementById('all-pokemon-button');
async function init() {
  
  await loadFirstData();
  ShowButton.classList.remove('d-none');
  renderCards();
  allPokemonPlaceholder = allPokemon;
}

async function loadFirstData() {
  const pokemonMoreDetails = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=41&offset=0"
  );
  let pokemonJson = await pokemonMoreDetails.json();
  firstNames.push(pokemonJson.results);
  await pushToAllPokemonNames();
}

async function pushToAllPokemonNames() {
  for (let i = 1; i < firstNames[0].length; i++) {
    const pokemonMoreDetails = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${i}/`
    );
    let pokemonJson = await pokemonMoreDetails.json();
    
    allPokemon.push(pokemonJson);
  }
}

function renderCards() {
  document.getElementById("cards").innerHTML = "";
  for (let i = 0; i < allPokemon.length; i++) {
    if (allPokemon[i].types.length <= 1) {
      renderOneTypeCards(i);
    } else {
      renderTwoTypesCards(i);
    }}
  showCounter();
  loadingSpinner();
}

function renderOneTypeCards(i){
  document.getElementById("cards").innerHTML += `
  <div class="card ${allPokemon[i].types[0].type.name}">
  <div class="pokemon-name"><h2>${allPokemon[i].name}</h2></div>
  <div><img onclick="renderBigCard(${i})" id="pokemon-card${i}" class="pokemon-img" src="${allPokemon[i].sprites.other.dream_world.front_default}" alt=""></div>
  <div class="type-form ${allPokemon[i].types[0].type.name} type-card">${allPokemon[i].types[0].type.name}</div>
  </div>`;
}

function renderTwoTypesCards(i) {
  document.getElementById("cards").innerHTML += `
  <div class="card ${allPokemon[i].types[0].type.name}">
    <div class="pokemon-name"><h2>${allPokemon[i].name}</h2></div>
    <div><img onclick="renderBigCard(${i})" id="pokemon-card${i}" class="pokemon-img" src="${allPokemon[i].sprites.other.dream_world.front_default}" alt=""></div>
    <div class="types-container">
      <div class="type-form ${allPokemon[i].types[0].type.name} type-card">${allPokemon[i].types[0].type.name}</div>
      <div class="type-form ${allPokemon[i].types[1].type.name} type-card">${allPokemon[i].types[1].type.name}</div>
    </div>
  </div>`;
}

function renderBigCard(i) {
  
  document.getElementById("big-card-pokemon-name").innerHTML = `${allPokemon[i].name}`;
  document.getElementById("big-card-pokemon-img").innerHTML = 
  `<img class="big-card-img" src="${allPokemon[i].sprites.other.dream_world.front_default}" alt="">`;
  if (allPokemon[i].types.length <= 1) {
    document.getElementById("big-card-pokemon-types").innerHTML =
    `<div class="${allPokemon[i].types[0].type.name} type-form" >${allPokemon[i].types[0].type.name}</div>`;
  } else {
  renderTwoTypesBigCards(i);}
  showBigCard();
  showAboutPokemon(i);
  ShowButton.classList.add('d-none');
}

function renderTwoTypesBigCards(i) {
  document.getElementById("big-card-pokemon-types").innerHTML = `
  <div class="types-container">
    <div class="type-form ${allPokemon[i].types[0].type.name} type-card">${allPokemon[i].types[0].type.name}</div>
    <div class="type-form ${allPokemon[i].types[1].type.name} type-card">${allPokemon[i].types[1].type.name}</div>
  </div>`;
}

function showBigCard() {
  document.getElementById("big-card-frame").classList.remove("d-none");
}

function hideBigCard() {
  document.getElementById("big-card-frame").classList.add("d-none");
  bodyOverflowAuto();
  if (allPokemon.length >= 40){
  ShowButton.classList.remove('d-none');
  }
}

function showAboutPokemon(i) {
  document.getElementById("about-stats").innerHTML = `
  <p>${allPokemon[i].species.name}
  <p>${allPokemon[i].height}
  <p>${allPokemon[i].weight}
  <p>${allPokemon[i].abilities[0].ability.name} `;
  document.getElementById("base-stats").innerHTML = `
  <p>${allPokemon[i].stats[0].base_stat}
  <p>${allPokemon[i].stats[1].base_stat}
  <p>${allPokemon[i].stats[2].base_stat} `;
  document.getElementById(
    "big-card-arrow"
  ).innerHTML = `<img onclick="previousPokemon(${i})" class="arrows" src="./img/arrow-left.png" alt="">
  <img onclick="nextPokemon(${i})" class="arrows" src="./img/arrow-right.png" alt="">`;
  showMoves(i);
}

function showMoves(i) {
  document.getElementById("moves").innerHTML = "";
  for (let j = 0; j < allPokemon[i].moves.length; j++) {
    document.getElementById("moves").innerHTML += `
  <p>${allPokemon[i].moves[j].move.name} `;
  }
}

function searchPokemon() {
  filterNames = [];
  let request = document.getElementById("input-field").value;
  console.log(request);
  for (let i = 0; i < allPokemonPlaceholder.length; i++) {
     for (let j = 0; j < allPokemonPlaceholder[i].types.length; j++) {
      if (allPokemonPlaceholder[i].types[j].type.name == request)
      {filterNames.push(allPokemonPlaceholder[i]);}}
    if (allPokemonPlaceholder[i].name.startsWith(request)) {
      filterNames.push(allPokemonPlaceholder[i]);
    }}
  changePost(request);
}

function changePost(request) {
  allPokemon = filterNames;

  if (!request == "") {
    renderCards();
    ShowButton.classList.add('d-none');
    document.getElementById('search-comment').classList.add('d-none');
  }else{
    ShowButton.classList.remove('d-none');
    renderCards();
    document.getElementById('search-comment').classList.remove('d-none');
  }
}

function goBack() {
  allPokemon = allPokemonPlaceholder;
  renderCards();
  ShowButton.classList.remove('d-none');
  document.getElementById('search-comment').classList.remove('d-none'); 
}

function previousPokemon(i) {
  if (i > 0) {
    i--;
    renderBigCard(i);
  } else {
    i = allPokemon.length - 1;
    renderBigCard(i);
  }
}

function nextPokemon(i) {
  if (i < allPokemon.length - 1) {
    i++;
    renderBigCard(i);
  } else {
    i = 0;
    renderBigCard(i);
  }
}

function showAboutContainer() {
  
  aboutContainer.classList.remove("d-none");
  baseStatsContainer.classList.add("d-none");
  movesContainer.classList.add("d-none");
}

function showBaseStatsContainer() {
  baseStatsContainer.classList.remove("d-none");
  aboutContainer.classList.add("d-none");
  movesContainer.classList.add("d-none");
}

function showMovesContainer() {
  movesContainer.classList.remove("d-none");
  baseStatsContainer.classList.add("d-none");
  aboutContainer.classList.add("d-none");
}

async function showMorePokemon() {
  showLoadingSpinner();
  for (let i = 1; i < firstNames[0].length; i++) {
    let allPokemonLength = allPokemon.length + 1;
    const pokemonMoreDetails = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${allPokemonLength}/`
    );
    let pokemonJson = await pokemonMoreDetails.json();
    allPokemon.push(pokemonJson);
  }
  renderCards();
}

function showCounter() {
  counter = allPokemon.length;
  document.getElementById("pokemon-count").innerHTML = `${counter}`;
}

function bodyOverflowHidden() {
  document.body.style.overflow = "hidden";
}

function bodyOverflowAuto() {
  document.body.style.overflow = "auto";
}

function loadingSpinner() {
  document.getElementById("loading-spinner").classList.add("d-none");
  bodyOverflowAuto();
}

function showLoadingSpinner() {
  document.getElementById("loading-spinner").classList.remove("d-none");
}

