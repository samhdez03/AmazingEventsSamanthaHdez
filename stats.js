import * as modulos from "./modulos/modulos.js";

function cero(v){
    if(isNaN(v)){
        return 0;
   }else{
       return v;
   }
}


function stats(cont,datos, titulo){
    datos.map(d=> d.reg = cero((d.assistance/d.capacity*100).toFixed(2)))
    let datosP =  datos.filter(d=> d.reg>0)
    let maxAsistencia = datosP.reduce((max, obj) => obj.reg > max ? obj.reg : max, -Infinity)
    let mayorP = datosP.filter(d => d.reg == maxAsistencia )
    let minAsistencia = datosP.reduce((min, obj) => obj.reg < min ? obj.reg : min, Infinity)
    let menorP = datosP.filter(d => d.reg == minAsistencia )
    let maxCapacity = datos.reduce((max, obj) => obj.capacity > max ? obj.capacity : max, -Infinity)
    let mayorC = datos.filter(d => d.capacity == maxCapacity )
    let contenedor= document.getElementById(cont)
    contenedor.innerHTML=""
    let tabla =  document.createElement("table")
    tabla.className = "table table-bordered rounded-3 overflow-hidden"
    let thead = document.createElement("thead")
    thead.innerHTML = `
               <tr>
                <th colspan="3" class="table-dark border-5">${titulo}</th> 
              </tr>
        `
    tabla.appendChild(thead)
    let tbody = document.createElement("tbody")
    tbody.innerHTML = `
                <tr>
                <td>Events with highest % of assitance</td>
                <td>Events with lowest % of assitance</td>
                <td>Events with larger capacity</td>
              </tr>
              `

    let tstats = document.createElement("tr")
    tstats.className = "text-center"
    tstats.innerHTML = `
                      <td > ${mayorP[0].name} with ${mayorP[0].reg}%</td>
                      <td>${menorP[0].name} with ${menorP[0].reg}% </td>
                      <td> ${mayorC[0].name} with ${mayorC[0].capacity.toLocaleString('es-MX')}</td>
                    </tr>      
              `
    tbody.appendChild(tstats)
    
    tabla.appendChild(tbody)
contenedor.appendChild(tabla)
}


let result=[{}]
function calculos(datos, categ){
    for (let i=0; i<categ.length; i++){
        let sum = datos.filter(d=>d.category == categ[i])
        result[i]= {
            category: categ[i],
            revenues: (sum.reduce((prev, sum) => prev + sum.revenues, 0) / sum.length),
            assistance: (sum.reduce((prev2, sum) => prev2 + sum.reg, 0) / sum.length).toFixed(2)
        }
    }
}

function statsCategory(cont,datos, titulo){
    datos.map(d=> d.assistance? d.revenues = cero((d.assistance*d.price)):d.revenues = cero((d.estimate*d.price)))
    datos.map(d=> d.assistance? d.reg = cero((d.assistance/d.capacity*100)):d.reg = cero((d.estimate/d.capacity*100)))
    let categoriaDatos = datos.map(d=> ({
        category: d.category,
        revenues: d.revenues,
        reg: d.reg
    }))
    let categ = modulos.categorias(categoriaDatos)
    calculos(categoriaDatos,categ)
    let contenedor= document.getElementById(cont)
    contenedor.innerHTML=""
    let tabla =  document.createElement("table")
    tabla.className = "table table-bordered rounded-3 overflow-hidden"
    let thead = document.createElement("thead")
    thead.innerHTML = `
               <tr>
                <th colspan="3" class="table-dark border-5">${titulo}</th> 
              </tr>
        `
    tabla.appendChild(thead)
    console.log(datos.assistance)
    let tbody = document.createElement("tbody")
    if (datos[0].assistance){
        tbody.innerHTML = `
                <tr>
                <td>Categories</td>
                <td>Revenues</td>
                <td>Percentage of assitance</td>
              </tr>
              `

    } else {
        tbody.innerHTML = `
                <tr>
                <td>Categories</td>
                <td>Revenues (estimate)</td>
                <td>Percentage of assitance (estimate)</td>
              </tr>
              `
    }
    

    for(let i=0; i<result.length;i++) {
        let tstats = document.createElement("tr")
        tstats.className = "text-center"
        tstats.innerHTML = `
                <td class="empty">${result[i].category} </td>
                <td>$${result[i].revenues.toLocaleString('es-MX')}  </td>
                <td>${result[i].assistance.toLocaleString('es-MX')} % </td>
              </tr>      
        `
        tbody.appendChild(tstats)

    }
    tabla.appendChild(tbody)
    contenedor.appendChild(tabla)


}

stats('contenedorStats',modulos.datos, 'Events Statistics')
statsCategory('contenedorUpcoming',modulos.datosUpcoming,'Upcoming events statistics by catergory' )
statsCategory('contenedorPast',modulos.datosPast,'Past events statistics by catergory' )
