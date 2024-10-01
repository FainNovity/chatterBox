import logo from './logo.svg';
import './App.css';
import Box from './components/portHandler/Box';
import { useEffect, useState } from 'react';

function App(props) {
  const { socket } = props;
  const [cuurentApp,setCurrentApp] = useState(<h1>rendering</h1>);
  useEffect(()=>{
    setCurrentApp(<Box socket={socket} func={setCurrentApp} />);

  },[]);
  return (
   <>
   <div class='' style={{height:'100vh',width:'100vw',position:'absolute'}}>
    {cuurentApp}
   </div>
   </>
  );
}

export default App;
