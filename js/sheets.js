const hoja = "Turnos";
let turnos;

async function getTurnos() {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET,
      range: hoja + "!A:H",
    });
  } catch (err) {
    document.getElementById("content").innerText = err.message;
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById("content").innerText = "No values found.";
    return;
  }

  turnos = [];
  range.values.forEach((fila) => {
    if (isNaN(parseInt(fila[0])) || fila[5] !== undefined) return;
    const nuevoTurno = {
      id: fila[0],
      cliente: fila[1],
      email: fila[2],
      telefono: fila[3],
      sintomas: fila[4],
      fecha_terminado: fila[5],
      comentario: fila[6],
      comentario2: fila[7]
    };
    turnos.push(nuevoTurno);
  });
}

async function editTurno(id, contenido) {
  const update = [
    contenido.id,
    contenido.cliente,
    contenido.email,
    contenido.telefono,
    contenido.sintomas,
    new Date().toISOString(),
    contenido.comentario,
    contenido.comentario2
  ]
  const filaAEditar = parseInt(id)+1;
  response = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET,
    range: `${hoja}!A${filaAEditar}:H${filaAEditar}`,
    values: [update],
    valueInputOption:"USER_ENTERED"
  });
  return response;
}



async function editTurnonuevo(id, contenido) {
  const update = [
    contenido.id,
    contenido.cliente,
    contenido.email,
    contenido.telefono,
    contenido.sintomas,
    contenido.date,
    contenido.comentario,
    contenido.comentario2
  ]
  const filaAEditar = parseInt(id)+1;
  response = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET,
    range: `${hoja}!A${filaAEditar}:H${filaAEditar}`,
    values: [update],
    valueInputOption:"USER_ENTERED"
  });
  return response;
}