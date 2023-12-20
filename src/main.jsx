import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // import your Redux store
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap your App component in a Provider component */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);