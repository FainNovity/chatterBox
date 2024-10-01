function Navbar(props){
    let {socket, user, port} = props;
    return (
        <>
          <nav class="navbar navbar-expand-lg navbar-light relative-top text-bg-dark">
            <div class="container">
                <a class="navbar-brand text-light fw-bold" href="#"><span class="mx-2 bi bi-boombox"></span>ChatterBox</a>
                
                <div>
                    <ul class="navbar-nav me-auto mt-2 mt-lg-0 float-right">
                        <li class="nav-item">
                            <a style={{maxWidth: "15ch"}} class="nav-link active badge text-bg-primary fs-6 text-wrap text-break" aria-current="page">Hey, {user || "user"}!
                                </a >
                        </li>
                        <li class="nav-item">
                            <a class="nav-link badge text-bg-warning m-1" >Port : {port || 0}</a>
                        </li>
                        <button class="nav-item bg-transparent text-white border-primary rounded-2 border-2 fw-bold" onClick={()=>{
                            socket.emit("exitUser",user);
                            window.localStorage.removeItem('user');
                            window.location.replace('../');

                        }}>
                            <span class="bi bi-door-open fs-4 text-danger"> </span>leave chat
                        </button>
                    </ul>
                </div>
                    
            </div>
          </nav>
            
        </>
    );
}
export default Navbar;