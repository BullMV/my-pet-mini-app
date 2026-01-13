const tg = window.Telegram.WebApp;
tg.expand();

let data = JSON.parse(localStorage.getItem("pet")) || null;

function show(id) {
  document.querySelectorAll("div").forEach(d => d.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function saveBirthdate() {
  const birth = document.getElementById("birthdate").value;
  if (!birth) return alert("Enter birthdate");
  data = {
    birth,
    pet: null,
    hunger: 100,
    clean: 100,
    lastSeen: Date.now()
  };
  localStorage.setItem("pet", JSON.stringify(data));
  show("screen-pet");
}

function selectPet(pet) {
  data.pet = pet;
  updateStats();
  localStorage.setItem("pet", JSON.stringify(data));
  show("screen-game");
}

function updateStats() {
  const days = Math.floor((Date.now() - new Date(data.birth)) / 86400000);
  document.getElementById("pet-name").innerText = data.pet;
  document.getElementById("pet-age").innerText = "Age: " + days + " days";

  document.getElementById("hunger").innerText = data.hunger;
  document.getElementById("clean").innerText = data.clean;

  const inactiveDays = Math.floor((Date.now() - data.lastSeen) / 86400000);
  if (inactiveDays >= 3) {
    show("screen-dead");
  }
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
  data.hunger -= 10;
  save();
}

function save() {
  data.lastSeen = Date.now();
  localStorage.setItem("pet", JSON.stringify(data));
  updateStats();
}

function resetGame() {
  localStorage.removeItem("pet");
  location.reload();
}

if (!data) show("screen-login");
else if (!data.pet) show("screen-pet");
else show("screen-game");

updateStats();

