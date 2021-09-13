const socket = io()
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name1 = prompt('What is your name?')
appendMessage('','You','center-c')
socket.emit('new-user', name1)

socket.on('user-connected', name1 => {
  appendMessage('',name1,'center-c')
})

socket.on('chat-message', obj => {
  appendMessage(obj.message,obj.name1,'left')
})


socket.on('user-disconnected', name1 => {
  appendMessage('',name1,'center-d')
})


//appending message
function appendMessage(message,name1,pos) {
  const mess_cont = document.getElementById('message-container')
  if(pos == 'left'){
    mess_cont.innerHTML += `<div class="message-left"> <div class="message-left-name">${name1}</div> <div class="message-left-message">${message}</div> </div>`
  }
  else if(pos == 'right'){
    mess_cont.innerHTML += `<div class="message-right"> <div class="message-right-name">${name1}</div> <div class="message-right-message">${message}</div> </div>`
  }
  else if(pos == 'center-c'){
    mess_cont.innerHTML += `<div class="user-joined">${name1} connected</div>`
  }
  else if(pos == 'center-d'){
    mess_cont.innerHTML += `<div class="user-joined">${name1} disconnected</div>`
  }
}

// sending form message
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(message,"You","right")
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})