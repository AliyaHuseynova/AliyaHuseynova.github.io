const card = document.querySelector(".card"),
inputPart = card.querySelector(".inputP"),  
textInput = inputPart.querySelector(".text-input"),
inputField = inputPart.querySelector("input");

inputField.addEventListener("keyup", a =>{
    if(a.key == "Enter" && inputField.value != ""){
        RequestForApi(inputField.value);
    }
});


function RequestForApi(city){
    let apiInput =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={cfe89456982a9a680b9ff3d7eadeb61e}`;
   fetch(apiInput).then(response => console.log(response.json()));
}

