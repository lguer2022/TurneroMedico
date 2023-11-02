const turnocontainer = document.getElementById("turnocontainer");

let turnos = [];

// Función para generar un ID único
function generarID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

const clienteElement = document.getElementById("cliente");
const telefonoElement = document.getElementById("telefono");
const mailElement = document.getElementById("mail");
const sintomasElement = document.getElementById("sintomas");

// Agregar un event listener al botón de "Reservar turno" para enviar los datos a Sheets
const reservarButton = document.getElementById("reservar");
reservarButton.addEventListener("click", enviarDatosASheets);

// Función para enviar los datos a la hoja de cálculo
async function enviarDatosASheets() {
  const cliente = clienteElement.value;
  const telefono = telefonoElement.value;
  const mail = mailElement.value;
  const sintomas = sintomasElement.value;

  // Generar un ID único para este turno
  const id = generarID();

  // Crear un objeto que contenga los datos y el ID
  const nuevoTurno = {
    id,
    cliente,
    telefono,
    mail,
    sintomas,
  };

  // Llamar a la función editTurno para enviar los datos a la hoja de cálculo
  const res = await editTurnonuevo(nuevoTurno); // Asumiendo que editTurno se encarga de enviar los datos a la hoja

  if (res.status === 200) {
    // Limpiar los campos del formulario
    clienteElement.value = "";
    telefonoElement.value = "";
    mailElement.value = "";
    sintomasElement.value = "";

    // Agregar el nuevo turno a la matriz de turnos
    turnos.push(nuevoTurno);

    // Aquí puedes realizar cualquier otra acción necesaria después de la reserva exitosa
  }
}

// Función para actualizar los datos de un turno existente
async function actualizarTurno(i) {
  const updateTurno = turnos[i];
  updateTurno.cliente = clienteElement.value;
  updateTurno.telefono = telefonoElement.value;
  updateTurno.mail = mailElement.value;
  updateTurno.sintomas = sintomasElement.value;

  const res = await editTurnonuevo(updateTurno.id, updateTurno);
  if (res.status === 200) {
    // Actualizar la matriz de turnos con los datos actualizados
    turnos[i] = updateTurno;

    // Limpiar los campos del formulario
    clienteElement.value = "";
    telefonoElement.value = "";
    mailElement.value = "";
    sintomasElement.value = "";

    // Aquí puedes realizar cualquier otra acción necesaria después de la actualización exitosa
  }
}
