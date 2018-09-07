import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import sampleData from './testData/item-data.json';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App catalog={sampleData}/>, document.getElementById('root'));
registerServiceWorker();
