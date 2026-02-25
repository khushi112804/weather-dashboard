// Dark mode
function toggleTheme(){
  document.body.classList.toggle("dark");
}

// MAIN SEARCH
async function searchCity(){

const city=document.getElementById("city").value;
const apiKey="aaf5a944983235268ed1569d5de2bed2";

const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const res=await fetch(url);
const data=await res.json();

if(data.cod==200){

document.getElementById("cityTitle").innerText=data.name;

// WEATHER
document.getElementById("weather").innerText=
data.main.temp+"°C • "+data.weather[0].main;

// AQI
const lat=data.coord.lat;
const lon=data.coord.lon;

const aqiUrl=
`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

const aqiRes=await fetch(aqiUrl);
const aqiData=await aqiRes.json();

const aqi=aqiData.list[0].main.aqi;

document.getElementById("aqiValue").innerText="AQI: "+aqi;

let status="";
if(aqi==1) status="Good";
else if(aqi==2) status="Fair";
else if(aqi==3) status="Moderate";
else if(aqi==4) status="Poor";
else status="Very Poor";

document.getElementById("aqiStatus").innerText=status;

// AQI color
const card=document.getElementById("aqiCard");

if(aqi<=2) card.style.background="#d1fae5";
else if(aqi==3) card.style.background="#fef3c7";
else card.style.background="#fee2e2";

// MAP
document.getElementById("map").src =
`https://maps.google.com/maps?q=${lat},${lon}&z=12&output=embed`;

}
}

// SAVE FAVORITES
function saveCity(){

const city=document.getElementById("cityTitle").innerText;

let fav=JSON.parse(localStorage.getItem("favCities"))||[];

if(!fav.includes(city)){
fav.push(city);
localStorage.setItem("favCities",JSON.stringify(fav));
renderFavorites();
}
}

// RENDER FAVORITES
function renderFavorites(){

const fav=JSON.parse(localStorage.getItem("favCities"))||[];
const container=document.getElementById("favorites");

container.innerHTML="";
document.getElementById("weather").innerText="Loading...";
document.getElementById("aqiValue").innerText="Loading...";
fav.forEach(city=>{
const btn=document.createElement("button");
btn.innerText=city;

btn.onclick=()=>{
document.getElementById("city").value=city;
searchCity();
};

container.appendChild(btn);
});
}

// LOAD favorites on start
renderFavorites();
