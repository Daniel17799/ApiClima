const result=document.querySelector('.result');
const form=document.querySelector('.get-weather');
const nameCity=document.querySelector('#city');
const nameCountry=document.querySelector('#country');
const boton = document.querySelector('#miBoton');

form.addEventListener('submit', (e)=>{
    e.preventDefault();                      //previene la acción del submit 
    
    if(nameCity.value===''||nameCountry===''){
        showError('Ambos campos son obligatorios...');
        return;
    }
    
        
    callAPI(nameCity.value, nameCountry.value);
    
});

//
boton.addEventListener("click", function(evento){
    location.replace('http://127.0.0.1:5500/index.html')
})



function callAPI(city, country){
    const apiId='735f2c19c07c35aca56cd1f9ece83191';
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    fetch(url)
        .then(data=> {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod ==='404'){
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
        })
        .catch(error =>{
            console.log(error);
        })
}

function showWeather(data){
    const{name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;       //Destructurar

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
            <h5>Clima en ${name}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M12 22s8.029-5.56 8-12c0-4.411-3.589-8-8-8S4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22zM8 9h3V6h2v3h3v2h-3v3h-2v-3H8V9z"></path></svg></h5>
            <img src=" https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
            <h2>Temperatura: ${degrees}°C</h2>
            <p>Temperatura Max: ${min}°C</p>
            <p>Temperatura Min: ${max}°C</p> 
        `;

    result.appendChild(content)
}


function showError(message){
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML=message;

    form.appendChild(alert);
    setTimeout(() =>{           //Establece un temporizador que ejecuta una función o una pieza de código específica una vez que expira el temporizador.
        alert.remove();
    },3000)
}


function kelvinToCentigrade(temp){
    return parseInt (temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}


