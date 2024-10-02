import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Main from './components/mainUI/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {io} from "socket.io-client";
import Box from './components/portHandler/Box';

const socket = io(process.env.SERVER);
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App socket ={socket} />} />
        </Routes>
    </BrowserRouter>, document.getElementById('root'));
