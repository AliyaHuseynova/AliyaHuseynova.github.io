const card = document.querySelector(".card");
const inputPart = card.querySelector(".inputP");
const textInput = inputPart.querySelector(".text-input");
const inputField = inputPart.querySelector("input");
const loc = inputPart.querySelector("button");
let apiVar;


inputField.addEventListener("keyup", a =>{
    if(a.key == "Enter" && inputField.value != ""){
        RequestForApi(inputField.value);
    }
});

loc.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(successFuction, errorFunction);
    }else{
        alert("ERROR: Not supported by your browser");
    }
})

function successFuction(position){
    const {latitude, longitude} = position.coords;
    apiVar = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cfe89456982a9a680b9ff3d7eadeb61e';
    fetchData();
}
    
function errorFunction(error){
    textInput.innerText = error.message;
    textInput.classList.add("error");
}

function RequestForApi(city){
    apiVar =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cfe89456982a9a680b9ff3d7eadeb61e`;
    fetchData();
    }  


function fetchData(){
    textInput.innerText = "The results are getting ready...";
    textInput.classList.add("pending");
    fetch(apiVar).then(response => response.json()).then(result => weatherInfo(result));
}


function getDirection(nmbr) {
    const drc = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return drc[Math.round(nmbr / 45 % 8)];
}

function weatherInfo(information){
    textInput.classList.replace("pending", "error");
    if(information.message == "city not found"){
        textInput.innerHTML = `${inputField.value} is not a valid city name`;
    }
     else{
         
        const city = information.name;
        const countryname = information.sys.country;
        const {description, id, main} = information.weather[0];
        const {feels_like, humidity, pressure, temp, temp_max, temp_min} = information.main;
        const {deg, speed} = information.wind;


         card.querySelector(".temp").innerText = parseInt(temp - 273) + " °C";
         card.querySelector(".max-temp").innerText = parseInt(temp_max - 273) + " °C";
         card.querySelector(".min-temp").innerText = parseInt(temp_min - 273) + " °C";
         //i dont know why but API shows as if temp_max = temp_min
         card.querySelector(".feels-like").innerText = parseInt(feels_like - 273) + " °C";
         card.querySelector(".description .descr").innerText = main;
         card.querySelector(".description .condition").innerText = description;
         card.querySelector(".location").innerText = `${city}, ${countryname}`;
         card.querySelector(".humidity").innerText = humidity + " %";
         card.querySelector(".pressure").innerText = pressure + " hPa";
         card.querySelector(".speed").innerText = speed + "m/s";
         card.querySelector(".wind-degree").innerText = deg + " °C";
         card.querySelector(".direction").innerText = getDirection(deg);

        textInput.classList.add("ready");
        card.classList.add("active");
        console.log(information);
    }
};