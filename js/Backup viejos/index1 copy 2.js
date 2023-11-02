document.addEventListener('DOMContentLoaded', function () {
  // Obtén una referencia al botón de reserva por su ID
  const reservarBtn = document.getElementById('reservar');

  // Agrega un evento de clic al botón de reserva
  reservarBtn.addEventListener('click', function () {
    // Obtén los valores de los campos de entrada
    const cliente = document.getElementById('cliente').value;
    const telefono = document.getElementById('telefono').value;
    const mail = document.getElementById('mail').value;
    const sintomas = document.getElementById('sintomas').value;

    // Crea un objeto de turno con los valores
    const nuevoTurno = {
      cliente: cliente,
      telefono: telefono,
      email: mail,
      sintomas: sintomas,
    };

    // Llama a la función para agregar el nuevo turno a la hoja de cálculo
    agregarTurnoALaHojaDeCalculo(nuevoTurno);
  });
});

async function agregarTurnoALaHojaDeCalculo(turno) {
  try {
    // Obten el token de acceso de auth.js
    const token = await obtenerTokenDeAcceso();

    // Verifica si se obtuvo el token
    if (!token) {
      console.error('No se pudo obtener el token de acceso.');
      return;
    }

    // Crea un arreglo de valores para la fila que se va a agregar
    const valoresFila = [
      turno.cliente,
      turno.telefono,
      turno.email,
      turno.sintomas,
    ];

    // Llama a la API de Google Sheets para agregar la nueva fila
    const response = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET,
      range: hoja,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      values: [valoresFila],
    });

    // Verifica si la operación fue exitosa
    if (response.status === 200) {
      console.log('Turno agregado exitosamente a la hoja de cálculo.');
      // Aquí puedes realizar cualquier otra acción necesaria después de agregar el turno
    } else {
      console.error('Error al agregar el turno a la hoja de cálculo.');
    }
  } catch (error) {
    console.error('Error al agregar el turno: ', error);
  }
}

async function obtenerTokenDeAcceso() {
  // La lógica para obtener el token de acceso ya está definida en auth.js,
  // así que simplemente llamamos a la función handleAuthClick de auth.js
  // para obtener el token de acceso y autorizar al usuario si es necesario.
  try {
    await handleAuthClick();
    // Espera a que handleAuthClick obtenga el token antes de continuar
    return gapi.client.getToken();
  } catch (error) {
    console.error('Error al obtener el token de acceso: ', error);
    return null;
  }
}
