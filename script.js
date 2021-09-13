const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const api_key='&appid=1d4a547d504c27285eed70c946512068';
var temp,temp_min,temp_max,temp_feels_like;

async function getWeatherDataFromApi(cityValue){
    try{
    const response = await fetch(api_url+cityValue+api_key);
    var data = await response.json();
    document.getElementById('weatherInfo').innerHTML = apiToHTML (data);
    }
    catch (error){
        document.getElementById('weatherInfo').innerHTML = `<div class="alert alert-dark" role="alert">` + error.message + `</div>`;
    }
}
function apiToHTML (data){
    temp= data.main.temp;
    temp_max=data.main.temp_max;
    temp_min=data.main.temp_min;
    temp_feels_like= data.main.feels_like;
    document.getElementById('convertValue').style.visibility = 'visible';
    return `        
    <div class="row">
        <div class="col-12"></div>
    </div>
    <div class="row">
        <div class="col-6"><h1 id='temp' class="bigFont">`+ temperatureConversion(temp) +`</h1></div>
        <div class="col-6">
        <div class="row">
            <div class="col-12 text-center">
                `+ data.weather[0].main +`
            </div>
        </div>
        <div class="row">
            <div id='temp_max' class="col-12">
            &#x2191; `+ temperatureConversion(temp_max) +`
            </div>
        </div>
        <div class="row">
            <div id='temp_min' class="col-12">
            &#x2193; `+ temperatureConversion(temp_min) +`
            </div>
        </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12"><img src="openWeatherMap-icons/`+ data.weather[0].icon +`.png"></div>
    </div>
    <div class="row">
        <div class="col-6">
        <h1 id='temp_feels_like' class="bigFont">`+ temperatureConversion(temp_feels_like) +`</h1>
        <small class="text-muted">FEELS LIKE</small>
        </div>
        <div class="col-6">
        <h1 id="" class="bigFont">`+ data.main.humidity +`%</h1>
        <small class="text-muted">HUMIDITY</small>
        </div>
    </div>`
}
function temperatureToCelsius(tempInKelvin){
    return Math.round(tempInKelvin -273.15);
}
function temperatureToFahrenheit(tempInKelvin){
    return Math.round((tempInKelvin-273.15)*1.8)+32;
}
function temperatureConversion(tempInKelvin){
    if(document.getElementById('convertValue').value =='f') var temp = temperatureToCelsius(tempInKelvin) + "&deg;C";
    else var temp = temperatureToFahrenheit(tempInKelvin) + "&deg;F";
    return temp
}
function convertTemperature(tempSystem){
    if(document.getElementById('convertValue').innerText=="Convert to Fahrenheit") {
        document.getElementById('convertValue').innerText="Convert to Celsius";
        document.getElementById('convertValue').value="c"
    } else{ 
    document.getElementById('convertValue').innerText="Convert to Fahrenheit";
    document.getElementById('convertValue').value="f"
    }
    document.getElementById('temp_feels_like').innerHTML = temperatureConversion(temp_feels_like,tempSystem);
    document.getElementById('temp').innerHTML = temperatureConversion(temp,tempSystem);
    document.getElementById('temp_max').innerHTML = "&#x2191;"+ temperatureConversion(temp_max,tempSystem);
    document.getElementById('temp_min').innerHTML = "&#x2193;"+ temperatureConversion(temp_min,tempSystem);
}