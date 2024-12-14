const socket = io();

socket.emit('mensaje', 'Mensaje recibido desde el cliente');

function getMessages() {
    socket.emit('getMessages')
}

getMessages()

socket.on('receiveMessages', messages => {
    renderMessages(messages);
});

function addMessage() {
    const messageData = {
        user: document.getElementById('user').value, message: document.getElementById('message').value,
    }

    socket.emit('addMessage', messageData);
    getMessages()

    document.getElementById('message').value = ""
}

function renderMessages(messages) {
    const messagesContainer = document.getElementById("messagesBox");
    let messagesHTML = '';

    messages.forEach(message => {
        messagesHTML += `
    <div>
      <p>User: ${message.user}</p>
      <p>Message: ${message.message}</p>
    </div>
    `;
    });

    messagesContainer.innerHTML = messagesHTML;
}