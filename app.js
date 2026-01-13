const tg = window.Telegram.WebApp;
tg.expand();

let data = JSON.parse(localStorage.getItem("pet"));

function hideAll() {
  document.getElementById("screen-login").classList.add("hidden");
  document.getElementById("screen-pet").classList.add("hidden");
  document.getElementById("screen-game").classList.add("hidden");
  document.getElementById("screen-dead").classList.add("hidden");
}

function saveBirthdate() {
  const birth = document.getElementById("birthdate").value;
  if (!birth) {
    alert("Please enter your birth date");
    return;
  }

  data = {
    birth: birth,
    pet: null,
    hunger: 100,
    clean: 100,
    lastSeen: Date.now()
  };

  localStorage.setItem("pet", JSON.stringify(data));
  hideAll();
  document.getElementById("screen-pet").classList.remove("hidden");
}

function selectPet(pet) {
  data.pet = pet;
  data.lastSeen = Date.now();
  localStorage.setItem("pet", JSON.stringify(data));
  showGame();
}

function showGame() {
  const inactiveDays = Math.floor(
    (Date.now() - data.lastSeen) / 86400000
  );

  if (inactiveDays >= 3) {
    hideAll();
    document.getElementById("screen-dead").classList.remove("hidden");
    return;
  }

  hideAll();
  document.getElementById("screen-game").classList.remove("hidden");

  const ageDays = Math.floor(
    (Date.now() - new Date(data.birth)) / 86400000
  );

  document.getElementById("pet-name").innerText = data.pet;
  document.getElementById("pet-age").innerText = `Age: ${ageDays} days`;
  document.getElementById("hunger").innerText = data.hunger;
  document.getElementById("clean").innerText = data.clean;
}

function feed() {
  data.hunger = Math.min(100, data.hunger + 30);
  save();
}

function cleanPet() {
  data.clean = Math.min(100, data.clean + 30);
  save();
}

function play() {
  data.hunger = Math.max(0, data.hunger - 10);
  save();
}

function save() {
  data.lastSeen = Date.now();
  localStorage.setItem("pet", JSON.stringify(data));
  showGame();
}

function resetGame() {
  localStorage.removeItem("pet");
  location.reload();
}

/* INIT */
hideAll();

if (!data) {
  document.getElementById("screen-login").classList.remove("hidden");
} else if (!data.pet) {
  document.getElementById("screen-pet").classList.remove("hidden");
} else {
  showGame();
}
