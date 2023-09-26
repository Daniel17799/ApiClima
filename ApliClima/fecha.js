const mostrarFecha=document.querySelector('.fecha');



let fecha= new Date();
fecha = fecha.toDateString();
console.log(fecha);



const fechaCrear = document.createElement('div');
    fechaCrear.innerHTML =`
    <h4>${fecha}</h4>`
    


mostrarFecha.appendChild(fechaCrear);


