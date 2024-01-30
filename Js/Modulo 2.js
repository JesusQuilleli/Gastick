//Array General de Datos
var Array1 = []

var Save = localStorage.getItem('Registro-Gastos')
        if(Save !== null){
            Array1 = JSON.parse(Save)}

            document.addEventListener("DOMContentLoaded", function(){

                Mostrar()
                MostrarTable()
                Notify()
                Notify2()
            })
//Funcion para Registrar Categorias ya Guardadas y Agregarles Monto,Fecha y Descripcion.
function Registrar()
{

var Descripcion = document.getElementById('desp').value
var Monto = document.getElementById('monto').value
var Fecha = document.getElementById('fecha').value
var Categoria = document.getElementById('Categorias').value
const Array1 = JSON.parse(localStorage.getItem('Registro-Gastos')) || [];

    var FechaIngresada = new Date(document.getElementById('fecha').value)
    var FechaActual = new Date();
       
        if(FechaIngresada > FechaActual){
            alert("No se permiten Fechas Futuras.")
            return
        }

if(!Descripcion.trim() || !Monto || !Fecha ){
    alert("Error. No deje los campos vacios, Intente nuevamente.")
return}

if(Monto < 0){
    alert("Dato Invalido no Ingrese numeros Negativos")
return}

if(!Categoria){
    alert("Seleccione una Categoria.")
return}


Array1.push({Categoria:Categoria,Descripcion:Descripcion,Monto:Monto,Fecha:Fecha}) 
      localStorage.setItem('Registro-Gastos',JSON.stringify(Array1))      

document.getElementById('desp').value = ""
document.getElementById('monto').value = ""
document.getElementById('fecha').value = ""
document.getElementById('Categorias').value = ""
                
                    createTable()
        }
//Funcion para Mostrar las Categorias ya guardadas en Pantalla.
function Mostrar(){

var Date = JSON.parse(localStorage.getItem('Datos'))

    const Select = document.getElementById("Categorias")

for(var i in Date){

    const option = document.createElement("option")

    var Op = Date[i].Categoria

    option.textContent = Op

    Select.appendChild(option)

}
}
//Funcion para Mostrar la Tabla de los 
function MostrarTable() {
    const data = JSON.parse(localStorage.getItem('Registro-Gastos'));
    const bs = "Bs."

    const tablaContainer = document.getElementById('tabla');
    tablaContainer.innerHTML = '';
  
    const table = document.createElement('table');
    table.classList.add('tablet-two')
    const titulo = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const thMonto = document.createElement('th');
    const thFecha = document.createElement('th');
    const th3 = document.createElement('th');

    th3.setAttribute('colspan', '2');
  
    th1.textContent = 'Categoría';
    th2.textContent = 'Descripción';
    thMonto.textContent = 'Monto'
    thFecha.textContent = 'Fecha'
    th3.textContent = 'Opciones';
  
    titulo.appendChild(th1);
    titulo.appendChild(th2);
    titulo.appendChild(thMonto);
    titulo.appendChild(thFecha);
    titulo.appendChild(th3);
    table.appendChild(titulo);

    for (let i = 0; i < data.length; i++) {
      const category = data[i];
  
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      const tdMonto = document.createElement('td')
      const tdFecha = document.createElement('td')
      const td3 = document.createElement('td');
      const td4 = document.createElement('td')

      const botonModificar = document.createElement('button');
      botonModificar.innerText = 'Modificar';
      botonModificar.addEventListener('click', () => Modificar(i));
      botonModificar.classList.add('boton-modificar');
      const botonEliminar = document.createElement('button');
      botonEliminar.innerText = 'Eliminar';
      botonEliminar.addEventListener('click', () => Delete(i));
      botonEliminar.classList.add('boton-eliminar');
  
      td1.textContent = category.Categoria;
      td2.textContent = category.Descripcion;
      tdMonto.textContent = bs + category.Monto;
      tdFecha.textContent = category.Fecha;

      td3.appendChild(botonModificar)
      td4.appendChild(botonEliminar)
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(tdMonto);
      tr.appendChild(tdFecha);
      tr.appendChild(td3);
      tr.appendChild(td4);
  
      table.appendChild(tr);

    }
    tablaContainer.appendChild(table)
  }
  
  function createTable() {

    const bs = "Bs."
    const data = JSON.parse(localStorage.getItem('Registro-Gastos'));
    const tablaContainer = document.getElementById('tabla');
    tablaContainer.innerHTML = '';
  
    const table = document.createElement('table');
    table.classList.add('tablet-two')
    const titulo = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const thMonto = document.createElement('th');
    const thFecha = document.createElement('th');
    const th3 = document.createElement('th');

    th3.setAttribute('colspan', '2');
  
    th1.textContent = 'Categoría';
    th2.textContent = 'Descripción';
    thMonto.textContent = 'Monto'
    thFecha.textContent = 'Fecha'
    th3.textContent = 'Opciones';
  
    titulo.appendChild(th1);
    titulo.appendChild(th2);
    titulo.appendChild(thMonto);
    titulo.appendChild(thFecha);
    titulo.appendChild(th3);
    table.appendChild(titulo);
  
    for (let i = 0; i < data.length; i++) {
      const category = data[i];
  
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      const tdMonto = document.createElement('td')
      const tdFecha = document.createElement('td')
      const td3 = document.createElement('td');
      const td4 = document.createElement('td');

      const botonModificar = document.createElement('button');
      botonModificar.innerText = 'Modificar';
      botonModificar.classList.add('boton-modificar')
      botonModificar.addEventListener('click', () => Modificar(i));
      const botonEliminar = document.createElement('button');
      botonEliminar.innerText = 'Eliminar';
      botonEliminar.classList.add('boton-eliminar')
      botonEliminar.addEventListener('click', () => Delete(i));
  
      td1.textContent = category.Categoria;
      td2.textContent = category.Descripcion;
      tdMonto.textContent = bs + category.Monto;
      tdFecha.textContent = category.Fecha;

      td3.appendChild(botonModificar)
      td4.appendChild(botonEliminar)

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(tdMonto)
      tr.appendChild(tdFecha)
      tr.appendChild(td3);
      tr.appendChild(td4);
  
      table.appendChild(tr);
    }
  
    tablaContainer.appendChild(table);
  }

  function Modificar(index) {

    const saveSt = JSON.parse(localStorage.getItem('Registro-Gastos')) || [];

        console.log(saveSt)
    var nom = document.getElementById('Categorias').value
    if(!nom){
      alert("Debe Seleccionar la Categoria, para Modificar su Informacion.")
    return}

    var desc = prompt("Ingrese nueva Descripción",saveSt[index].Descripcion);
    if (!desc.trim()) {
      alert("Campo Invalido, Ingrese Informacion.");
      return;
    }

    var mont = prompt("Ingrese nuevo Monto",saveSt[index].Monto);

    if (!desc.trim()) {
      alert("Error. No puede dejar el campo en blanco.");
      return;
    }

    var fecha = prompt("Ingrese nueva Fecha en Formato: AAAA-MM-DD",saveSt[index].Fecha);
    if (!fecha.trim()) {
      alert("Error. Campo Invalido, Intente nuevamente.");
      return;
    }
    var parsefech = Date.parse(fecha)
    var FechaIngresada = new Date(fecha)
    var FechaActual = new Date()

    if(isNaN(parsefech)){
      alert("El Formato es Invalido.")
    return;}

      if (FechaIngresada > FechaActual){
          alert("No se permiten Fechas Futuras.")
      return;}

    saveSt[index] = {
        Categoria: nom,
        Descripcion: desc,
        Monto: mont,
        Fecha: fecha
    };
    
    console.log(saveSt)
  
    alert("Su categoría ha sido modificada.");
  
    localStorage.setItem('Registro-Gastos', JSON.stringify(saveSt));
       createTable();
  }

function Delete(index) {
if (confirm("¿Seguro que desea eliminar alguna categoría?")) {
const data = JSON.parse(localStorage.getItem('Registro-Gastos'));
data.splice(index, 1);
alert("Eliminado");
localStorage.setItem('Registro-Gastos', JSON.stringify(data));
createTable();
} else {
alert("Conservado");
createTable();
}
}

function Notify()
{

    const input = document.getElementById('monto')

    input.addEventListener("input",function(){

        const inputValue = input.value;
        const Chars = 12

            if(inputValue > Chars){
                input.value = inputValue.slice(0,Chars)
            }

    })

}

function Notify2()
{

    const input = document.getElementById('desp')
    const mensaje = document.getElementById('mensaje2')

    input.addEventListener("input",function(){

        const inputValue = input.value;
        const Chars = 20 - inputValue.length

            if(Chars <= 0){
                mensaje.classList.remove('hidden2');
            }
            else{
                mensaje.classList.add('hidden2');
            }

    })

}

window.onload = function() {
  var tabla = document.getElementById('tabla');
  var tbody = document.getElementById('tbody');
  var formulario = document.getElementById('formulario');

  formulario.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    var fila = document.createElement('tr');
    var celda1 = document.createElement('td');
    var celda2 = document.createElement('td');

    celda1.textContent = dato1;
    celda2.textContent = dato2;

    fila.appendChild(celda1);
    fila.appendChild(celda2);

    tbody.appendChild(fila);

    // Desplazamiento suave hacia la tabla
    tabla.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });
};

window.addEventListener('scroll', function() {
  var sidebar = document.querySelector('.cont-menu');
  sidebar.style.top = window.pageYOffset + 'px';
});