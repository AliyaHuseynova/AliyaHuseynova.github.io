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
        alert("Not supported by your browser");
    }
});

function errorFunction(error){
    textInput.innerText = error.message;
    textInput.classList.add("error");
}


function successFuction(position){
    const {latitude, longitude} = position.coordinates;
    apiVar = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cfe89456982a9a680b9ff3d7eadeb61e'  
    fetchData();
}


function RequestForApi(city){
    apiVar =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cfe89456982a9a680b9ff3d7eadeb61e`;
    fetchData();
    }

function fetchData(){
    textInput.innerText = "The results are getting ready...";
    textInput.classList.add("pending");
    fetch(apiVar).then(response => response.json()).then(results => weatherInfo(results));
}

function weatherInfo(information){
    console.log(information);
}