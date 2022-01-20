import React from 'react';
import ReactDOM from 'react-dom';
import './global-styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GameContextProvider from 'context/game-context';
import CardContextProvider from 'context/card-context';

ReactDOM.render(
  <React.StrictMode>
    <CardContextProvider>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </CardContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
