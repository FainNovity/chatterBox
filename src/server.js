const http = require('http');
const socketIo = require('socket.io');  
require('dotenv').config();

const httpServer = http.createServer();
const io = new socketIo.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET','POST']
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

socket.emit('session',socket.username);
socket.join(socket.port);


fetch("http://localhost:9009/"+socket.port);

socket.on('chat',async ({user,message,port})=>{
    
    await fetch("http://localhost:9009/"+port,{
        method:'PATCH',
        body:new URLSearchParams({chat:[user,message]})
    });
    socket.to(port).emit("update",{user:user,message:message});
});
socket.on('newUser',(username)=>{
    socket.in(socket.port).fetchSockets().then((data)=>{
        socket.emit('people',data.map(roomClient=>roomClient.username+ " joined conversation."));
    });
    fetch("http://localhost:9009/"+socket.port,{
        method:'PATCH',
        body:new URLSearchParams({chat:["",username+" joined conversation."]})
    });
    
    socket.broadcast.to(socket.port).emit("joined",username+" joined convorsation");
});
socket.on('exitUser',async (username)=>{
    socket.broadcast.to(socket.port).emit("exiting",username+" left convorsation");
    if(await socket.in(socket.port).fetchSockets().length-1==0){
        await fetch("http://localhost:9009/"+socket.port,{
            method:'DELETE'
        });
    }
});
});

httpServer.listen(process.env.PORT || 8008,()=>{console.log("running");
});

/*
const mongoose = require('mongoose');
const port = require('./dataSchema');
mongoose.connect("mongodb+srv://23010101189:6gwbfJbStcA1ltMp@cluster-1.x5viu.mongodb.net/chatter").then(()=>{
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const JWT = require(webtoken'); 
    const cors = require('cors');
    const express = require('express');
    const app= express();

    
    app.use(cors({
        origin : "http://localhost:3000",
        credentials:true
    }));    
    app.use(cookieParser());
    app.use(bodyParser.urlencoded());
    function token(port,pass){
        return JWT.sign({port:port,pass:pass},"unique");
    }
    console.log("connected to db");
    
    app.get("/",(req,res)=>{
        res.send("It works!");
    });
    app.get("/getAll",async (req,res)=>{
        res.send(await port.find());
    });
    app.get('/server', (req,res)=>{
        port.findOne({port:req.cookies.jwt}).then(obj=>{
            console.log(obj);
             if(obj.chat!=null)
                res.send.stringify(obj.chat));
            else
                res.send.stringify(""));

        });
    });
    app.get('/updateChat', (req,res)=>{
        port.findOne({port:req.cookies.jwt}).then(obj=>{
             if(obj.chat!=null)
                res.send.stringify(obj.chat));
            else
                res.send.stringify(""));

        });
    });
    app.post('/addNew',async (req,res)=>{
        let jwt = await token(req.body.port,req.body.pass);
        let obj = new port({port:jwt,chat:[['admin','port started']]});
        await obj.save();
        res.cookie('jwt',jwt,{httpOnly:true});
        res.send.stringify('success'));
    });
    app.patch('/server',async (req,res)=>{
        let obj = await port.findOne({port:req.cookies.jwt});
        if(obj.chat.length>50)
            obj.chat = obj.chat.slice(obj.chat.length-49,obj.chat.length);
            obj.chat.push([req.params.sender,req.params.message]);
        await port.updateOne({port:obj.port},{...obj});
        res.send("updated successfully");
    });
    app.patch('/:server',async (req,res)=>{
        let obj = port.findOne({port:req.params.port});
        if(obj!=null)
            res.send(false);
        res.send("updated successfully");
    });

    app.listen(8008,()=>console.log('started at 8008 (if not changed)'));
});

*/
