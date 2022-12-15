
//CURRENT DATE AND TIME//

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById ('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth()
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM';

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' +(minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`;

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

//END OF DATE AND TIME// 

//OPEN WEATHER API FOR CURRENT LOCATION WEATHER//
const API_KEY ='e998301ef612bdf80b092d061576a6ab'; 

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let {latitude, longitude } = success.coords;
 const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutley&units=metric&appid=${API_KEY}`

        console.log(url)

        fetch(url).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

//START OF FAKE DATA TEST//

function getFakeWeatherData(){
 
    let json =                  
    {
      "lat": 33.44,
      "lon": -94.04,
      "timezone": "America/Chicago",
      "timezone_offset": -21600,
      "current": {
        "dt": 1618317040,
        "sunrise": 1618282134,
        "sunset": 1618333901,
        "temp": 284.07,
        "feels_like": 282.84,
        "pressure": 1019,
        "humidity": 62,
        "dew_point": 277.08,
        "uvi": 0.89,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 6,
        "wind_deg": 300,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
          }
        ],
        "rain": {
          "1h": 0.21
        }
      },
        "daily": [
        {
          "dt": 1618308000,
          "sunrise": 1618282134,
          "sunset": 1618333901,
          "moonrise": 1618284960,
          "moonset": 1618339740,
          "moon_phase": 0.04,
          "temp": {
            "day": 279.79,
            "min": 275.09,
            "max": 284.07,
            "night": 275.09,
            "eve": 279.21,
            "morn": 278.49
          },
          "feels_like": {
            "day": 277.59,
            "night": 276.27,
            "eve": 276.49,
            "morn": 276.27
          },
          "pressure": 1020,
          "humidity": 81,
          "dew_point": 276.77,
          "wind_speed": 3.06,
          "wind_deg": 294,
          "weather": [
            {
              "id": 500,
              "main": "Rain",
              "description": "light rain",
              "icon": "10d"
            }
          ],
          "clouds": 56,
          "pop": 0.2,
          "rain": 0.62,
          "uvi": 1.93
        }],
        "alerts": [
        {
          "sender_name": "NWS Tulsa",
          "event": "Heat Advisory",
          "start": 1597341600,
          "end": 1597366800,
          "description": "...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible.",
          "tags": [
            "Extreme temperature value"
            ]
        }
      ]
    }             
    
    return showWeatherData(json)
}

//END OF FAKE DATA TEST//

//Current weather 

function showWeatherData (data) {
    let {humidity, pressure, wind_speed, sunrise, sunset,} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N' + data.lon+'E'

//live location weather items//
    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
       <div>Humidity</div>
       <div>${humidity}</div>
    </div>
    <div class="weather-item">
       <div>Pressure</div>
       <div>${pressure}</div>
    </div>
    <div class="weather-item">
       <div>Wind Speed</div>
       <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
       <div>Sunrise</div>
       <div>${moment(sunrise * 1000).format('HH:mm a')}</div> 
    </div>
    <div class="weather-item">
       <div>Sunset</div>
       <div>${moment(sunset * 1000).format('HH:mm a')}</div>
    </div>
    
    `;

//Future 5 day and Current Location Forecast//

    let otherDayForecast = ''
    data.daily.forEach((day, idx) => {
      if(idx == 0){
        currentTempEl.innerHTML = `
        <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
        <div class="other">
            <div class="day">${moment(day.dt*1000).format('ddd')}</div>
            <div class="temp">Night - ${day.temp.night}&#176; C</div>
            <div class="temp">Day - ${day.temp.day}&#176; C</div>
        </div>`


      }else{
        otherDayForecast += `
        <div class="weather-forecast-item">
                <div class="day">${moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>`

      }
    })

    weatherForecastEl.innerHTML = otherDayForecast;

}


