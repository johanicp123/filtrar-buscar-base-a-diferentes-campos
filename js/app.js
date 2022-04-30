//variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor para los resultados


const years = document.createElement('option');
const max = new Date().getFullYear();
const min = max - 10;

for (let i = max; i >= min; i--){
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    document.querySelector('#year').appendChild(option); // agrega las opciones de año al select
}
//generar un objeto con la busqueda 
const datosBusqueda ={
    marca:'',
    year:'',
    minimo:'',
    maximo:'',
    puertas:'',
    transmision:'',
    color:'',
}

//eventos
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos(autos); //muesta los automoviles al cargar 

    //llena las opciones de años
    llenarSelect();
});
//event listener para los selelect de busqueda
marca.addEventListener('input',e=>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('input',e=>{
    datosBusqueda.year = Number(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('input',e=>{
    datosBusqueda.minimo = Number(e.target.value);
    filtrarAuto();
});

maximo.addEventListener('input',e=>{
    datosBusqueda.maximo = Number(e.target.value);
    filtrarAuto();
});

puertas.addEventListener('input',e=>{
    datosBusqueda.puertas = Number(e.target.value);
    filtrarAuto();
});

transmision.addEventListener('input',e=>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('input',e=>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});


//limpiar html
function limpiarHTML(){
    const contenedor = document.querySelector('#resultado');
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}

//funciones
function mostrarAutos(autos){
    limpiarHTML();
    const contenedor = document.querySelector('#resultado');
    //elimina el html previo
    autos.forEach(auto =>{
        const autoHTML = document.createElement('p');
        autoHTML.innerHTML = `
            <p>${auto.marca} ${auto.modelo} - ${auto.year} - ${auto.puertas} Puertas - Transmisión: ${auto.transmision} - Precio: ${auto.precio} - Color: ${auto.color}</p>
        `;
        contenedor.appendChild(autoHTML);
    })
}

function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.appendChild(document.createTextNode('No hay Resultados'));
    document.querySelector('#resultado').appendChild(noResultado);
}


//funcion que filtra en base a la busqueda
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    if (resultado.length){
        mostrarAutos(resultado);
    } else {
       noResultado();
    }
 }
    


function filtrarMarca(auto){
    const {marca}= datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const {year}= datosBusqueda;
    if(year){
        return auto.year === (year);
    }
    return auto;
}


function filtrarMinimo(auto) {
    if(datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}
function filtrarMaximo(auto) {
    if(datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}
function filtrarPuertas(auto) {
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    } 
    return auto;
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    } 
    return  auto;
}