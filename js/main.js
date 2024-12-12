const baseUrl = "https://api.weatherapi.com/v1";
const searchInput = document.querySelector("header input[type=search]")
const searchBtn = document.querySelector("header .search button");
const today = document.querySelector(".today .day")
const todayDate = document.querySelector(".today .date")
const locationSearch = document.querySelector(".today .location")
const todayTemp = document.querySelector(".today .temp")
const todayConditionImg = document.querySelector(".today img")
const todayCondition = document.querySelector(".today .condition")
const todayRainChance = document.querySelector(".moreTodayInfo .rain span")
const todayWindSpeed = document.querySelector(".moreTodayInfo .windSpeed span")
const todayWindDir = document.querySelector(".moreTodayInfo .windDir span")
const tomorrow = document.querySelector(".tomorrow .day")
const tomorrowConditionImg = document.querySelector(".tomorrow img")
const tomorrowTemp = document.querySelector(".tomorrow .temp")
const tomorrowTempMini = document.querySelector(".tomorrow .tempSmall")
const tomorrowCondition = document.querySelector(".tomorrow .condition")
const dayAfterTomorrow = document.querySelector(".dayAfterTomorrow .day")
const dayAfterTomorrowConditionImg = document.querySelector(".dayAfterTomorrow img")
const dayAfterTomorrowTemp = document.querySelector(".dayAfterTomorrow .temp")
const dayAfterTomorrowTempMini = document.querySelector(".dayAfterTomorrow .tempSmall")
const dayAfterTomorrowCondition = document.querySelector(".dayAfterTomorrow .condition")
const alertNameCountry = document.querySelector("div.alert");



async function fetchWeather(city) {
  try {
    const request = await fetch(baseUrl + `/forecast.json?key=b6b8827d6b644e0d99c213457242806&q=${city}&days=3&wind100mph=yes&wind100kph=yes&aqi=yes`);
    if(request.status == 200){
      let response = await request.json();
      alertNameCountry.classList.replace("d-block","d-none")
      return response;
    }
    throw new Error("Plesae Enter a Valid Location")
    
  } catch (error) {
    alertNameCountry.innerHTML = error.message;
    alertNameCountry.classList.replace("d-none", "d-block")
    return null;
  }  
}

async function showAllData(city="Egypt") {
  // show 3 days date
  showDateData()
  
  // call api
  let obj = await fetchWeather(city);

  // if api return error close function
  if(obj == null) return;

  // show 3 days weather data
  showWeatherData(obj);
}

function getDay(nextDay=0){
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let date = new Date();
  date.setDate(date.getDate() + nextDay)
  return daysOfWeek[date.getDay()];
}

function getDate(nextDay=0){
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let date = new Date();
  date.setDate(date.getDate() + nextDay)  
  return date.toString().split(' ')[2].concat(date.toString().split(' ')[1]);
}

function showDateData(){
  today.innerHTML =  getDay();
  todayDate.innerHTML = getDate();
  tomorrow.innerHTML = getDay(1);
  dayAfterTomorrow.innerHTML = getDay(2);
}

function showWeatherData(obj){
  locationSearch.innerHTML = `${obj.location.name} <br> ${obj.location.country}, ${obj.location.region}` 
  todayTemp.innerHTML = `${obj.current.temp_c }&degC`;
  todayConditionImg.setAttribute('src',`https:${obj.current.condition.icon}`);
  todayCondition.innerHTML = `${obj.current.condition.text}`
  todayRainChance.innerHTML = `${obj.forecast.forecastday[0].day.daily_chance_of_rain}%`;
  todayWindSpeed.innerHTML = `${obj.current.wind_kph}km/h`;
  todayWindDir.innerHTML = `${obj.current.wind_dir}`;
  tomorrowConditionImg.setAttribute('src', `https:${obj.forecast.forecastday[1].day.condition.icon}`);
  tomorrowTemp.innerHTML = `${obj.forecast.forecastday[1].day.maxtemp_c}&degC`;
  tomorrowTempMini.innerHTML = `${obj.forecast.forecastday[1].day.mintemp_c}&degC`;
  tomorrowCondition.innerHTML = `${obj.forecast.forecastday[1].day.condition.text}`
  dayAfterTomorrowConditionImg.setAttribute('src', `https:${obj.forecast.forecastday[2].day.condition.icon}`);
  dayAfterTomorrowTemp.innerHTML = `${obj.forecast.forecastday[2].day.maxtemp_c}&degC`;
  dayAfterTomorrowTempMini.innerHTML = `${obj.forecast.forecastday[2].day.mintemp_c}&degC`;
  dayAfterTomorrowCondition.innerHTML = `${obj.forecast.forecastday[2].day.condition.text}`
}

searchInput.addEventListener('input', function(){
  showAllData(`${searchInput.value}`)
})

searchBtn.addEventListener('click', function(){
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        alertNameCountry.classList.replace("d-block","d-none")
        showAllData(`${latitude},${longitude}`)
        
      });
    }
  } catch (error) {
    alertNameCountry.innerHTML = "Sorry, something went wrong so can't find your location.";
    alertNameCountry.classList.replace("d-none", "d-block")
  }
  
});

// call the function that show data in egypt by default
showAllData()