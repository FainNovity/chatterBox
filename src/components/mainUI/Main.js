import { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatGround from "./ChatGround";
import Footer from "./Footer";
import Navbar from "./Navbar";
function Main(props){
    const {socket,clients,user,port} = props;
const [data,setData] = useState(clients.map(data=>["",data]));
    useEffect(()=>{
        socket.emit("newUser",user);
      },[]);
    //   window.BeforeUnloadEvent = ()=>{
    //     socket.emit("exitUser",user);
    //   };
    return (
        <>
           <div class="" style={{height:'100lvh',width:'100lvw',background:'rgb(50,50,50,1)'}}>
                <Navbar user={user || 'User'} socket={socket} port={port || '000000'} />
                 <ChatGround data = {data} port = {port} user = {user} setData = {setData} socket={socket} /> 
                <Footer port = {port} data={data} setData ={setData} user ={user} socket={socket} />
           </div>
        </>
    );
}
export default Main;