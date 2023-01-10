// 01 establecemos la comunicacion del lado del cliente

const socket = io.connect()

// 03_ armamos la funcion render
function render(data) {
    const html = data.map(item => {
        return (`<div> <strong>${item.author}</strong>: <em>${item.text}</em> </div>`)
    }).join(' ')

    document.getElementById('message').innerHTML = html
    console.log('Enviando info');
}

// 04_ Funcion que se ejecuta al clickear en el botón enviar

function addMessage() {
    const authorName = document.getElementById('author').value
    const textMsn = document.getElementById('text').value

    const mensaje = {
        author: authorName,
        text: textMsn
    }

    document.getElementById('text').value = ''
    // enviamos la data al server
    socket.emit('new-message', mensaje)

    return false // esto es para que no se refresque los inputs
}

// 05_ Funcion para alerta de mensajes
function alertMsj(data) {
    console.log(data);
    document.getElementById('nameMsj').innerHTML = `
            <div class="toast align-items-center text-bg-primary border-0 fade show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <font style="vertical-align: inherit;">
                            <font style="vertical-align: inherit;" id="nameMsj">
                                Nuevo mensaje de:  ${data[data.length - 1].author}
                            </font>
                        </font>
                    </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerca"></button>
                </div>
            </div>`
}


// 02_ eventos para enviar (emit) y recibir (on) mensajes

socket.on('message', data => {
    render(data)
    alertMsj(data)
})