//Array General de Datos
var saveSt = []
  //Para validar que no me sobreescriba en LocalStorage Datos Ingresados.
    var guardado = localStorage.getItem('Datos')
        if(guardado !== null){
            saveSt = JSON.parse(guardado)
        }
//Comando que Ejecuta Indefinidamente las Siguientes Funciones llamadas
        document.addEventListener("DOMContentLoaded", function(){

           Notify()
           Notify2()
           Mostrar()
        })
        //Funcion para Registrar Categorias y Guardarlas en LocalStorage.  
        function register() {
            var categoriaText = document.getElementById('Cat').value;
            var descriptionText = document.getElementById('Desc').value;
            const saveSt = JSON.parse(localStorage.getItem('Datos')) || [];
          
            if (!categoriaText.trim()){
              alert("Es Obligatorio Ingresar una Categoria.");
              return;
            }
          
            const catRepeat = saveSt.find(
              (categoria) =>
                categoria.Categoria.toLowerCase() === categoriaText.toLowerCase()
            );
          
            if (catRepeat !== undefined) {
              alert("Ya existe esta categoría.");
              return;
            } 
            saveSt.push({ Categoria: categoriaText, Descripcion: descriptionText });
          
            localStorage.setItem('Datos', JSON.stringify(saveSt));
          
            document.getElementById('Cat').value = '';
            document.getElementById('Desc').value = '';
            tabla.innerHTML = '';
            createTable();
          }
        //Funcion para Modificar Elementos De LocalStorage y Enviarlos nuevamente Modificados.
          function Modificar(index) {

            const saveSt = JSON.parse(localStorage.getItem('Datos')) || [];

                console.log(saveSt)

            var nombre = prompt("Categoría",saveSt[index].Categoria);
            if (!nombre.trim()) {
              alert("Este campo es Obligatorio. No lo deje vacío.");
              return;
            }

            const catRepeat2 = saveSt.find(
              (categoria) =>
                categoria.Categoria.toLowerCase() === nombre.toLowerCase() &&
                saveSt.indexOf(categoria) !== index
            );
          
            if (catRepeat2 !== undefined) {
              alert("Ya existe esta categoría.");
              return;
            }

            var desc = prompt("Descripción",saveSt[index].Descripcion);

            const catRepeat = saveSt.find(
                (categoria) =>
                  categoria.Categoria.toLowerCase() === nombre.toLowerCase() && categoria.Descripcion.toLowerCase() === desc.toLowerCase()
              );

              if (catRepeat !== undefined) {
                alert("Ya existe esta categoría.");
                return;
              }


            saveSt[index] = {
                Categoria: nombre,
                Descripcion: desc
            };
            
            console.log(saveSt)
          
            alert("Su categoría ha sido modificada.");
          
            localStorage.setItem('Datos', JSON.stringify(saveSt));
            tabla.innerHTML = '';
            createTable();
          }
//Funcion para Eliminar Elementos de LocalStorage y Guardarlos Nuevamente.
function Delete(index) {
    if (confirm("¿Seguro que desea eliminar alguna categoría?")) {
      const data = JSON.parse(localStorage.getItem('Datos'));
      data.splice(index, 1);
      alert("Eliminado");
      localStorage.setItem('Datos', JSON.stringify(data));
      createTable();
    } else {
      alert("Conservado");
      createTable();
    }
  }
  //Funcion para Mostrar los Elementos Guardados en LocalStorage, Crear los Botones y asignarles las Funcionalidades a los Botones.
  function Mostrar() {
    const data = JSON.parse(localStorage.getItem('Datos'));

    const tablaContainer = document.getElementById('tabla');
    tablaContainer.innerHTML = '';
  
    const table = document.createElement('table');
    const titulo = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const th3 = document.createElement('th');

    th3.setAttribute('colspan', '2');
  
    th1.textContent = 'Categoría';
    th2.textContent = 'Descripción';
    th3.textContent = 'Opciones';
  
    titulo.appendChild(th1);
    titulo.appendChild(th2);
    titulo.appendChild(th3);
    table.appendChild(titulo);
  
  
    for (let i = 0; i < data.length; i++) {
      const category = data[i];
  
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
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

      td3.appendChild(botonModificar)
      td4.appendChild(botonEliminar)
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);

      table.appendChild(tr);
    }
    tablaContainer.appendChild(table);
  }
//Funcion para Crear la Tabla y Reescribirla las veces necesarias, Esta es Usada en las Otras Funciones.  
  function createTable() {

    const data = JSON.parse(localStorage.getItem('Datos'));
    const tablaContainer = document.getElementById('tabla');
    tablaContainer.innerHTML = '';
  
    const table = document.createElement('table');
    const titulo = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const th3 = document.createElement('th');

    th3.setAttribute('colspan', '2');
  
    th1.textContent = 'Categoría';
    th2.textContent = 'Descripción';
    th3.textContent = 'Opciones';
  
    titulo.appendChild(th1);
    titulo.appendChild(th2);
    titulo.appendChild(th3);
    table.appendChild(titulo);
  
    for (let i = 0; i < data.length; i++) {
      const category = data[i];
  
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
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

      td3.appendChild(botonModificar)
      td4.appendChild(botonEliminar)

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
  
      table.appendChild(tr);
    }
  
    tablaContainer.appendChild(table);
  }
//Funcion para Notificar que Llegaste al Maximos de los Caracteres.
function Notify()
{

    const input = document.getElementById('Desc')
    const mensaje = document.getElementById('mensaje')

    input.addEventListener("input",function(){

        const inputValue = input.value;
        const Chars = 30 - inputValue.length

            if(Chars <= 0){
                mensaje.classList.remove('hidden');
            }
            else{
                mensaje.classList.add('hidden');
            }

    })

}
//Funcion para Notificar que Llegaste al Maximos de los Caracteres.
function Notify2()
{

    const input = document.getElementById('Cat')
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
//Funcion para deslizar el menu lateral.
window.addEventListener('scroll', function() {
  var sidebar = document.querySelector('.cont-menu');
  sidebar.style.top = window.pageYOffset + 'px';
});