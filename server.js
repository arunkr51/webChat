const io=require("socket.io")(8000,{
    cors:"http://127.0.0.1:5500/index.html"          //cors: cross origin resource sharing
})

const users={}
io.on("connect",socket=>{

    socket.on("user-joined",(name)=>{
        users[socket.id]=name
        socket.broadcast.emit("new-user-joined",name)
    })
    
    socket.on("disconnect",()=>{
        socket.broadcast.emit("user-left",users[socket.id])
        delete users[socket.id]
    })

    socket.on("send", (message)=>{
        socket.broadcast.emit("receive",{message: message, name: users[socket.id]})
    })

})