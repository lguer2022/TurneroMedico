
const turnosContainer = document.getElementById("turnosContainer");
const detalleContainer = document.getElementById("detalleContainer");
let indiceSeleccionado;

function createTarjeta(turno,index) {
  const nuevaTarjeta = document.createElement("div");
  nuevaTarjeta.classList = "tarjeta";
  nuevaTarjeta.innerHTML = `
    <h3>${turno.cliente}</h3>
    <p>Email: ${turno.email}</p>
    <p>Teléfono: ${turno.telefono}</p>
    <p>Síntomas: ${turno.sintomas}</p>
    <p>Fecha de Termino: ${turno.fecha_terminado}</p>
    <p>Comentario 1: ${turno.comentario}</p>
    <p>Comentario 2: ${turno.comentario2}</p>
  `;
  nuevaTarjeta.addEventListener("click", ()=> actualizarDetalle(index))
  turnosContainer.appendChild(nuevaTarjeta);
}



function actualizarTarjetas() {
  turnosContainer.innerHTML = "";
  turnos.forEach((turno,i) => {
    createTarjeta(turno,i);
  });
}

function actualizarDetalle(index){
  if(indiceSeleccionado !== undefined) turnosContainer.children[indiceSeleccionado].classList.toggle("seleccionado",false);
  clienteElement.innerText = turnos[index].cliente;
  telefonoElement.innerText = turnos[index].telefono;
  sintomasElement.innerText = turnos[index].sintomas;
  detalleContainer.classList.toggle("escondido",false);
  indiceSeleccionado = index;
  turnosContainer.children[indiceSeleccionado].classList.toggle("seleccionado",true);
}

finalizar.addEventListener("click",()=> marcarTerminado(indiceSeleccionado))

// Llama a la función para mostrar las tarjetas al cargar la página
actualizarTarjetas();

