let respuesta = await fetch("https://aulamindhub.github.io/amazing-api/events.json");
export let datosOriginal = await respuesta.json();
export let currentDate = datosOriginal.currentDate;
export let datos = datosOriginal.events;
export let datosPast =  datos.filter(d=>currentDate>d.date)
export let datosUpcoming =  datos.filter(d=>currentDate<d.date)
export let textoBusqueda =  document.getElementById("entradaBusqueda")
export let datos2 = []
export let datos3 = []

export function categorias(datos){
    let cat = datos.map(d => d.category)
    let categorias = [... new Set (cat.sort())]
    return categorias}

export function Tarjetas(cont,eventos){
    let contenedor= document.getElementById(cont)
    contenedor.innerHTML=""
    if (eventos.length>0){
    for(let i=0; i<eventos.length;i++) {
        let tarjeta= document.createElement('div')
        tarjeta.className = 'card cardEvent'
        tarjeta.innerHTML = `
                    <img src=${eventos[i].image} class="card-img-top h-50" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title">${eventos[i].name} </h5>
                        <p class="card-text m-3">${eventos[i].description}</p>
                        <div class="d-flex justify-content-between align-items-center m-1">
                            <p >$ ${eventos[i].price}</p>
                            <a href="./details.html?_id=${eventos[i]._id}" class="btn btn-dark">Details</a>
                        </div>

                    </div>
        `
        contenedor.appendChild(tarjeta)
    } }else {
      contenedor.className = "container-fluid d-flex flex-wrap justify-content-center h-100"
      contenedor.innerHTML = `
      <div id="noEsta" class=" p-3 h-100">
      <h1> Lo sentimos, el criterio de su búsqueda no coincide con ninguno de nuestros eventos</h1>
      </div>`
  }

}

export function pintarCategorias(categorias){
    let contenedor= document.getElementById('checkboxContainer')
    for (let i=0; i<categorias.length; i++){
      let tarjeta= document.createElement('div')
      tarjeta.className = 'form-check form-check-inline'
      tarjeta.innerHTML = `
                  <input class="form-check-input" type="checkbox" id="${categorias[i]}" value="${categorias[i]}"}>
                  <label class="form-check-label" for="${categorias[i]}">${categorias[i]}</label>
      `
      contenedor.appendChild(tarjeta)
      
    } 
  }

export function filterData(datos) {
    let categoriasFiltradas = Array.from(document.querySelectorAll('.form-check-input:checked'))
                              .map(checkbox =>checkbox.value);
    if (categoriasFiltradas.length == 0) {
        datos2 = datos
    } else {
        datos2 = datos.filter(d => categoriasFiltradas.includes(d.category))
        
    }
    return datos2
}

export function filtroBuscar(datos, busqueda){
    let eventosF = datos.filter(e=>e.name.toLowerCase().includes(busqueda)||e.description.toLowerCase().includes(busqueda))
    return eventosF
  }

