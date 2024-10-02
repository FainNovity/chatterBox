import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";

function ChatGround(props){
    const {socket,data,setData,user,port} = props;
    let scrollRef = useRef(null);
        //const [data,setData] = useState([['someone',"Hello, there!!"],['Harsh',"hello, who's there?"],['someone',"some blah blah blah shit is here. "],['Harsh',";lgldflgkj gkjlf kjlj fg klf gflkj f lkfj f lkf lkj g kl gfkjl d"]]);
        
        let formattedData;
         formattedData = data.map(data=><ChatBubble user={user} sender={data[0]} data={data[1]} />);

         socket.on('update',({user,message})=>{
             console.log(message);
             setData([...data,[user,message]]);
         });
         socket.on('joined',(message)=>{
             setData([...data,["",message]]);
         });
         socket.on('exiting',(message)=>{
             setData([...data,["",message]]);
         });

        useEffect(()=>{
            console.log("setting up")
        },[socket]);
        useEffect(()=>{
            fetch(process.env.DB+port).then(res=>res.json()).then(res=>setData(res));
        },[]);

        scrollRef.current?.scrollIntoView({behavior: 'smooth'});

        return (
            <>
            <div style={{height:"80vh",minWidth:"100vw", paddingBottom:"5vmin",position:'relative',overflow:"hidden",overflowY:"auto",background: "rgb(23,23,23,0.5)"}}>
                {formattedData}
                <div style={{marginBottom:"20%",scrollMarginBottom:'20%'}} ref={scrollRef} />
            </div>
            </>
        );
}

export default ChatGround;