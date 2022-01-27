import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GameContextProvider from 'context/game-context';
import CardContextProvider from 'context/card-context';
import StopWatchContextProvider from 'context/timer-context';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <CardContextProvider>
      <StopWatchContextProvider>
        <GameContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GameContextProvider>
      </StopWatchContextProvider>
    </CardContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
