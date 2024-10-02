const mongoose = require('mongoose');
const port = require('./dataSchema');
require('dotenv').config();
console.log(process.env.MONGO);

mongoose.connect(process.env.MONGO).then(()=>{
    const express = require('express');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const app = express();

    app.use(cors({
        origin:[process.env.SERVER,process.env.MAIN]
    }));
    app.use(bodyParser.urlencoded());

    app.get('/:port',async (req,res)=>{
        let data = await port.findOne({port:req.params.port});
        if(data==null)
        {
             data = port({port:req.params.port,chat:[["","port created succesfully"]]});
            await data.save();
            res.send(data.chat);
        }
        else
        res.send(data.chat);
    });
    app.post('/:port',async (req,res)=>{
            let data = port({port:req.params.port,chat:[["","port created succesfully"]]});
            await data.save();
        
        res.send("added/updated successfully");
    });
    app.patch('/:port',async (req,res)=>{
        let data = await port.findOne({port:req.params.port});
        data.chat.push(req.body.chat.split(','));
        await port.updateOne({port:req.params.port},{chat:data.chat});
        res.send("updated succesfully !");
    });
    app.delete('/:port',async (req,res)=>{
        await port.deleteOne({port:req.params.port});
    });


    app.listen(9009,()=>console.log("Runniing on 9009"));
});