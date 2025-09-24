const socket=io("http://localhost:8000")

const name=prompt("Enter Your Name to join the chat: ")
socket.emit("user-joined",name)

const first=document.querySelector(".first")
const input=document.querySelector("#message")

function generateMessage(msg,side){
    let div=document.createElement('div')
    div.classList.add('alert')
    if(side=="left"){
        div.classList.add("alert-success")
        div.classList.add("left")
    }
    else if(side=="right"){
        div.classList.add("alert-secondary")
        div.classList.add("right")
    }
    else{
        div.classList.add("alert-light")
        div.classList.add("center")
    }
    div.innerHTML=msg
    first.appendChild(div)
}


socket.on("new-user-joined",name=>{
    if(name)
        generateMessage(`${name} joined the chat`, 'center')
})

socket.on("user-left",name=>{
    if(name)
        generateMessage(`${name} left the chat`, 'center')
})

socket.on("receive", data=>{
    generateMessage(`${data.name} : ${data.message}`, `left`)
})

function postData(){
    if(input.value!==""){
        generateMessage(`${input.value} : You`,"right")

        socket.emit("send", input.value)
        input.value = ""
    }
}