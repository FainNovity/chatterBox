function Footer(props){
    const {socket,user,data,setData,port} = props;
    return (
        <>
        <div class="sticky-bottom mx-4">
            <form onSubmit={(e)=>{
                e.preventDefault();
                console.log(e.target[0].value);
                socket.emit("chat",{user:user,message:e.target[0].value,port:port});
                setData([...data,[user,e.target[0].value]]);
                e.target[0].value = "";
            }}>
            <div class="input-group mt-2">
                <input
                    type="text"
                    name="search"
                    id="search"
                    class="form-control"
                    placeholder="placeholder"
                    aria-describedby="searchBtn"
                    required
                />
                <button class="input-group-text bi bi-send-fill" id="searchBtn"></button>
            </div>
            </form>
            
        </div>
        </>
    );
}
export default Footer;