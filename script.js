/* script.js */
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const errorText = document.getElementById("error");
const weatherBox = document.getElementById("weatherBox");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const icon = document.getElementById("icon");

async function getWeather(city) {
  try {
    const api = `https://api.weatherapi.com/v1/current.json?key=5f54c9b8c5384e71a59140325251802&q=${city}&lang=pt`; // chave pública de teste

    const res = await fetch(api);
    const data = await res.json();

    if (data.error) {
      errorText.textContent = "Cidade não encontrada!";
      weatherBox.classList.add("hidden");
      return;
    }

    errorText.textContent = "";
    weatherBox.classList.remove("hidden");

    cityName.textContent = data.location.name + " - " + data.location.region;
    temp.textContent = data.current.temp_c + "°C";
    desc.textContent = data.current.condition.text;
    icon.src = "https:" + data.current.condition.icon;
  } catch {
    errorText.textContent = "Erro ao buscar clima.";
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});
