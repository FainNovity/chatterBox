import { useEffect, useState } from "react";
import Main from "../mainUI/Main";

function Box(props){
    const {socket,func} = props;
    let [isValid, setIsValid] = useState("");
    useEffect(()=>{
      socket.on("session",(username)=>{
        window.localStorage.setItem('user',username);
        //console.log(socket);
        socket.on("people",(clients)=>{
          console.log(clients);
          func(<Main user ={window.localStorage.getItem('user')} port = {window.localStorage.getItem('port')} clients= {clients} socket={socket} />);
        });
      });
      
    },[]);
    return (
        <>
        
<main style={{width: "clamp(60vmin,100%,40vmax)"}} class="form-sign m-auto my-5 py-4 px-2 border border-1 border-dark rounded-3">
      <form class={isValid+" d-grid gap-4"} onSubmit={async (e)=>{
        window.localStorage.setItem('user',e.target[0].value);
        window.localStorage.setItem('port',e.target[1].value);
        e.preventDefault();
        socket.auth = {username: e.target[0].value,port: e.target[1].value};
        socket.connect();
      }} action="./main">
    <h1 class="h3 mb-3 fw-normal fw-bolder text-warning"> <span class="bi bi-door-closed text-dark"></span> Port handler</h1>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" minLength={3} maxLength={20} placeholder="name@example.com" required />
      <label for="floatingInput">Username</label>
      <div class="invalid-feedback"> Please, Enter valid length of username </div>
      <div class="valid-feedback"> valid username ✔️ </div>
    </div>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" minLength={6} maxLength={6} placeholder="name@example.com" required />
      <label for="floatingInput">Port</label>
      <div class="invalid-feedback"> Please, Enter valid port of length 6 </div>
      <div class="valid-feedback"> valid port ✔️ </div>
    </div>
    <hr class="border-1 text-dark opacity-100 mx-3" />
    <button class="btn btn-primary w-50 py-2" type="submit" onClick={()=>setIsValid("was-validated")}> <span class="bi bi-door-open-fill text"></span> get in</button>

  </form>

</main>
        </>
    );
}
export default Box;