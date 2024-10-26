import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from './App';
import './css/index.css';

ReactDOM.render(
  <Router> {/* Wrap the App with Router */}
    <App />
  </Router>,
  document.getElementById('root')
);
