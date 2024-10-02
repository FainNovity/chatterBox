import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {io} from "socket.io-client";

const socket = io(process.env.REACT_APP_SERVER);
console.log(socket);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App socket ={socket} />} />
        </Routes>
    </BrowserRouter>
);
