const http = require('http');
const socketIo = require('socket.io');  

const httpServer = http.createServer();
require('dotenv').config();
console.log(process.env.DB," ",process.env.MAIN);
const io = new socketIo.Server(httpServer, {
    cors: {
        origin: [process.env.DB,process.env.MAIN]
    }
})

io.use(async (socket,next)=>{
    const {username, port} = socket.handshake.auth;
    if(!username)
        return next(new Error("Invalid username"));

    socket.username = username;
    socket.port = port;
    console.log("i'm ",username," and i'm new here in ",port);
    next();
});
io.on("connection",socket=>{
    console.log("connection made");
    
    socket.emit('session',socket.username);
    socket.join(socket.port);
    socket.in(socket.port).fetchSockets().then((data)=>{
        socket.emit('people',data.map(roomClient=>roomClient.username+ " joined conversation."));
    });

socket.on('chat',async ({user,message,port})=>{
    
    await fetch(process.env.DB+'/'+port,{
        method:'PATCH',
        body:new URLSearchParams({chat:[user,message]})
    });
    socket.to(port).emit("update",{user:user,message:message});
});
socket.on('newUser',(username)=>{
    fetch(process.env.DB+'/'+socket.port,{
        method:'PATCH',
        body:new URLSearchParams({chat:["",username+" joined conversation."]})
    });
    
    socket.broadcast.to(socket.port).emit("joined",username+" joined convorsation");
});
socket.on('exitUser',async (username)=>{
    socket.broadcast.to(socket.port).emit("exiting",username+" left convorsation");
    if(await socket.in(socket.port).fetchSockets().length-1==0){
        await fetch(process.env.DB+'/'+socket.port,{
            method:'DELETE'
        });
    }
});
});

httpServer.listen(8008,()=>{console.log("running");
});
