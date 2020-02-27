const $weather = document.getElementById('weather')
const $incidents = document.getElementById('incidents')
$incidents.addEventListener('click', redirectIssues)
$weather.addEventListener('click', getWeather)

function getWeather(event){
    window.open("http://www.meteofrance.com/previsions-meteo-france/vitrolles-en-luberon/84240");
}

function redirectIssues(event){
    window.location.href = "/personnel/incidents"
}