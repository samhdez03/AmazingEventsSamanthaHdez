import * as modulos from "./modulos/modulos.js";

let datos = modulos.datosPast;
let categorias = modulos.categorias(datos);
modulos.Tarjetas('contenedorTarjetas',datos)
modulos.pintarCategorias(categorias)

document.getElementById("checkboxContainer").addEventListener('change', e =>{
  
  let texto = document.getElementById("entradaBusqueda").value.toLowerCase()
          let datos3 = []
          modulos.filterData(datos)
          let datos2 = modulos.filterData(datos)
          if (texto.length == 0) {
              datos3 = datos2
          } else {
              datos3 = datos2.filter(d => d.name.toLowerCase().includes(texto)||d.description.toLowerCase().includes(texto))
          }
          modulos.Tarjetas('contenedorTarjetas',datos3)

  })

entradaBusqueda.addEventListener("keyup", e=>{
    let eventosF = []
    let texto= modulos.textoBusqueda.value.toLowerCase()
    let datos2 = modulos.filterData(datos)
    if(datos2.length>0){
    eventosF= modulos.filtroBuscar(datos2, texto)
  } else {
    eventosF= modulos.filtroBuscar(datos, texto)
  }
    return modulos.Tarjetas('contenedorTarjetas',eventosF)
  }
  ) 
