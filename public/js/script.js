const socket = io()
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const send_audio = document.getElementById("send-audio")
const receive_audio = document.getElementById("receive-audio")

messageInput.focus()
if(localStorage.getItem('name1')){
  var name1 = localStorage.getItem('name1')
}
else{
  var name1 = prompt('What is your name?')
  localStorage.setItem('name1',name1)
}

appendMessage('','You','center-c')
socket.emit('new-user', name1)

socket.on('user-connected', name1 => {
  appendMessage('',name1,'center-c')
  receive_audio.play();
})

socket.on('chat-message', obj => {
  appendMessage(obj.message,obj.name1,'left')
  receive_audio.play();
})


socket.on('user-disconnected', name1 => {
  appendMessage('',name1,'center-d')
  receive_audio.play()
})


//appending message
function appendMessage(message,name1,pos) {
  const mess_cont = document.getElementById('message-container')
  if(pos == 'left'){
    mess_cont.innerHTML += `<div class="message message-left"> <div class="message-left-name">${name1}</div> <div class="message-left-message">${message}</div> </div>`
  }
  else if(pos == 'right'){
    mess_cont.innerHTML += `<div class="message message-right"> <div class="message-right-name">${name1}</div> <div class="message-right-message">${message}</div> </div>`
  }
  else if(pos == 'center-c'){
    mess_cont.innerHTML += `<div class="message user-joined">${name1} joined</div>`
  }
  else if(pos == 'center-d'){
    mess_cont.innerHTML += `<div class="message user-joined">${name1} left</div>`
  }
  scrollbottom()
}

//scroll bottom
function scrollbottom(){
    messageContainer.scrollTop += 100
}

// sending form message
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(message,"You","right")
  socket.emit('send-chat-message', message)
  send_audio.play()
  scrollbottom()
  messageInput.value = ''
})