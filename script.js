const socket = io()
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name1 = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name1)

socket.on('user-connected', name1 => {
  appendMessage(`${name1} connected`)
})

socket.on('chat-message', obj => {
  appendMessage(`${obj.name1}:${obj.message}`)
})


socket.on('user-disconnected', name1 => {
  appendMessage(`${name1} disconnected`)
})


//appending message
function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}

// sending form message
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})