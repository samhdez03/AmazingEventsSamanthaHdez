import * as modulos from "./modulos/modulos.js";

let eventosHome = modulos.datos
let urlParams = new URLSearchParams(window.location.search);
let eventoId = urlParams.get("_id");
let evento=eventosHome.find (p => p._id == eventoId);

let contenedorEventos = document.getElementById("contenedorEventos")
 
function eventoDetails(evento){
  if (evento.hasOwnProperty('assistance')){
    let eventoContenido = `
              <div class="col-md-7 d-flex align-items-center img-container ">
                <img src="${evento.image}" class="img-fluid rounded-start p-2" alt="...">
              </div>
              <div class="col-md-4">
                <div class="card-body">
                  <h3 class="card-title text-center">${evento.name}</h3>
                  <p class="card-text"> <span class="fw-bolder">Name: </span>${evento.name} </p>
                  <p class="card-text"> <span class="fw-bolder">Date: </span>${evento.date}</p>
                  <p class="card-text fw-bolder">Description:  </p>
                  <p class="card-text"> ${evento.description}</p>
                  <p class="card-text"> <span class="fw-bolder">Category: </span>${evento.category} </p>
                  <p class="card-text"> <span class="fw-bolder">Place: </span>${evento.place} </p>
                  <p class="card-text" type="Number"> <span class="fw-bolder">Capacity: </span>${evento.capacity.toLocaleString('es-MX')} </p>
                  <p class="card-text "><span class="fw-bolder">Asistencia: </span>  ${evento.assistance.toLocaleString('es-MX')} </p>                 
                  <p class="card-text"> <span class="fw-bolder">Price: </span>$${evento.price} </p>
                  
                </div>
                `
                contenedorEventos.innerHTML = eventoContenido 
  } else {
    let eventoContenido = `
                <div class="col-md-7 d-flex align-items-center p-2">
                <img src="${evento.image}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-4">
                <div class="card-body">
                  <h3 class="card-title text-center">${evento.name}</h3>
                  <p class="card-text"> <span class="fw-bolder">Name: </span>${evento.name} </p>
                  <p class="card-text"> <span class="fw-bolder">Date: </span>${evento.date}</p>
                  <p class="card-text fw-bolder">Description:  </p>
                  <p class="card-text"> ${evento.description}</p>
                  <p class="card-text"> <span class="fw-bolder">Category: </span>${evento.category} </p>
                  <p class="card-text"> <span class="fw-bolder">Place: </span>${evento.place} </p>
                  <p class="card-text" type="Number"> <span class="fw-bolder">Capacity: </span>${evento.capacity.toLocaleString('es-MX')} </p>
                  <p class="card-text "><span class="fw-bolder">Asistencia estimada: </span> ${evento.estimate.toLocaleString('es-MX')} </p>                 
                  <p class="card-text"> <span class="fw-bolder">Price: </span>$${evento.price} </p>
                  
                </div>
                `
                contenedorEventos.innerHTML = eventoContenido 
    
  }
    
}

eventoDetails(evento)