// Funcion para Ingresar Fechas, Guardar las que coincidan y enviarlas a LocalStorage.
function Reports() {
  var Registros = [];
  var DatosCoincided = [];
  var Cont = JSON.parse(localStorage.getItem('Registro-Gastos'));
  const Fecha1 = new Date(document.getElementById("Fech").value);
  const Fecha2 = new Date(document.getElementById("Fech2").value);

  var FechaIngresada = new Date(document.getElementById('Fech').value)
  var FechaActual = new Date();

  if(Fecha2 < Fecha1){
    alert("La Fecha Final, no puede ser Anterior a la Fecha Inicial.")
  return}

  if (FechaIngresada > FechaActual) {
    alert("No se permiten Fechas Futuras.")
    return
  }

  var FechaIngresada2 = new Date(document.getElementById('Fech2').value)
  var FechaActual2 = new Date();

  if (FechaIngresada2 > FechaActual2) {
    alert("No se permiten Fechas Futuras.")
    return
  }

  for (var i in Cont) {
    var DatesCat = Cont[i].Categoria;
    var Dates = new Date(Cont[i].Fecha);
    var Dates2 = parseInt(Cont[i].Monto);
    Registros.push({ Categoria: DatesCat, Fecha: Dates, Monto: Dates2 });
  }

  function Obtener(Fecha1, Fecha2) {
    var FechasCoincididas = [];
    for (var fecha = new Date(Fecha1); fecha <= Fecha2; fecha.setDate(fecha.getDate() + 1)) {
      FechasCoincididas.push({ Fecha: new Date(fecha) });
    }
    return FechasCoincididas;
  }

  var FechasCoincididas = Obtener(Fecha1, Fecha2);

  for (var k = 0; k < FechasCoincididas.length; k++) {
    for (var l = 0; l < Registros.length; l++) {
      if (FechasCoincididas[k].Fecha.toDateString() === Registros[l].Fecha.toDateString()) {
        DatosCoincided.push({ Categoria: Registros[l].Categoria, Monto: Registros[l].Monto });
      }
    }
  }

  localStorage.setItem('Reportes', JSON.stringify(DatosCoincided));

  console.log(DatosCoincided);

  createTable()
}

//Funcion para Crear la tabla y Hacer los Montos y sacar los porcentajes.
function createTable() {

  teibol2.textContent = ""
  teibolMonto.textContent = ""

  const bs = 'Bs.';
  const data = JSON.parse(localStorage.getItem('Reportes'));

  if (data.length === 0) {
    alert("No hay Registros para Mostrar.")
    return
  }

  var categories = {}; // Objeto para almacenar el monto total de cada categoría

  // Calcula el monto total de cada categoría
  for (var i in data) {
    var category = data[i].Categoria;
    var amount = data[i].Monto;

    if (category in categories) {
      categories[category] += amount;
    } else {
      categories[category] = amount;
    }
  }

  var totalGeneral = 0; // Monto total general de todas las categorías

  // Calcula el monto total general
  for (var j = 0; j < data.length; j++) {
    totalGeneral += parseInt(data[j].Monto);
  }

  const table = document.createElement('table');

  const titulo = document.createElement('tr');
  const thCat = document.createElement('th');
  const thMonto = document.createElement('th');
  const thPorcentaje = document.createElement('th');
  

  thCat.textContent = 'Categorías';
  thMonto.textContent = 'Monto';
  thPorcentaje.textContent = '%';
 

  titulo.appendChild(thCat);
  titulo.appendChild(thMonto);
  titulo.appendChild(thPorcentaje);
  table.appendChild(titulo);


  for (var category in categories) {
    var amount = categories[category];
    var porcentaje = (amount / totalGeneral) * 100;

    const tr = document.createElement('tr');
    const tdCat = document.createElement('td');
    const tdMonto = document.createElement('td');
    const tdPorcentaje = document.createElement('td');

    tdCat.textContent = category;
    tdMonto.textContent = bs + amount;
    tdPorcentaje.textContent = porcentaje.toFixed(2) + '%';
  
    tr.appendChild(tdCat);
    tr.appendChild(tdMonto);
    tr.appendChild(tdPorcentaje);

    table.appendChild(tr);
  }

  const tablaContainer = document.getElementById('teibol2');
  tablaContainer.classList.add('table-generated');
  tablaContainer.appendChild(table);

  const tableTotal = document.createElement('table');

  table.classList.add('tablet-two');

  const tituloTotal = document.createElement('tr');
  const thMontototal = document.createElement('th');
  thMontototal.textContent = 'Monto Total'
  tituloTotal.appendChild(thMontototal);

  const tdTotal = document.createElement('td');
  tdTotal.textContent = bs + totalGeneral

  tableTotal.appendChild(tituloTotal)
  tableTotal.appendChild(tdTotal)

  const tablaContainer2 = document.getElementById('teibolMonto')
  tablaContainer2.appendChild(tableTotal)
}
//Funcion para mover el menu lateral.
window.addEventListener('scroll', function () {
  var sidebar = document.querySelector('.cont-menu');
  sidebar.style.top = window.pageYOffset + 'px';
});
