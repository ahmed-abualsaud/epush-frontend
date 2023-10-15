import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/index.css';
import App from './App';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { Config } from './config/Config'

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: Config.get("REACT_APP_PUSHER_APP_KEY"),
  cluster: Config.get("REACT_APP_PUSHER_APP_CLUSTER"),
  forceTLS: false,
  wsHost: Config.get("REACT_APP_PUSHER_HOST"),
  wsPort: Config.get("REACT_APP_PUSHER_PORT"),
  wssPort: Config.get("REACT_APP_PUSHER_SECURED_PORT"),
  disableStats: false,
});

// Make the Echo instance available globally
window.echo = echo;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
