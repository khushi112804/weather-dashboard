async function searchCity(){

const city = document.getElementById("city").value;
const apiKey="aaf5a944983235268ed1569d5de2bed2";

const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const res=await fetch(url);
const data=await res.json();
document.getElementById("cityTitle").innerText=data.name;
if(data.cod==200){
document.getElementById("weather").innerText=
data.main.temp + "°C • " + data.weather[0].main;
}
function toggleTheme(){
document.body.classList.toggle("dark");
}
}