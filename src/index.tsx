import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GameContextProvider from 'context/game-context';
import CardContextProvider from 'context/card-context';
import ModalContextProvider from 'context/modal.context';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
 <React.StrictMode>
  <CardContextProvider>
   <GameContextProvider>
    <ModalContextProvider>
     <BrowserRouter>
      <App />
     </BrowserRouter>
    </ModalContextProvider>
   </GameContextProvider>
  </CardContextProvider>
 </React.StrictMode>,
 document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
