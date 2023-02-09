import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';
import { createSocket } from './API/socket';

const socket = createSocket();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App socket={socket} />
    </BrowserRouter>
  </React.StrictMode>,
);
