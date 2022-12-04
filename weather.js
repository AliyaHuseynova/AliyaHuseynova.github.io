const card = document.querySelector(".card"),
inputPart = card.querySelector(".inputP"),  
textInput = inputPart.querySelector(".text-input"),
inputField = inputPart.querySelector("input"),
loc = inputPart.querySelector("button");
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
});

function successFuction(position){
    const {latitude, longitude} = position.coords;
    apiVar = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cfe89456982a9a680b9ff3d7eadeb61e'  
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

function weatherInfo(information){
    textInput.classList.replace("pending", "error");
    if(information.message == "city not found"){
        textInput.innerHTML = `${inputField.value} is not a valid city name`;
    }
    else{
        const city = information.name;
        const country = information.sys.country;
        const {description, id, main} = information.weather[0];
        const {feels_like, humidity, temp, temp_max, temp_min} = information.main;

//div span
         card.querySelector(".temp").innerText = temp;
         card.querySelector(".max-temp").innerText = temp_max;
         card.querySelector(".min-temp").innerText = temp_min;
         //i dont know why but API shows as if temp_max = temp_min
         
         card.querySelector(".feels-like").innerText = feels_like;


         card.querySelector(".description .condition").innerText = description;
         card.querySelector(".location span").innerText = `${city}, ${country}` ;
        // // card.querySelector(".temperature .number").innerText = temp;
        // // card.querySelector(".temperature .number").innerText = temp;

        textInput.classList.add("ready");
        card.classList.add("active");
        console.log(information);
    }
}