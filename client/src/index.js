import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const defaultShiftState = {
  X1: [],
  X2: [],
  X3: [],
  X4: [],
  X5: [],
  X6: [],
  X7: [],
};

const myReducer = function (state = defaultShiftState, action) {
  switch (action.type) {
    case "ADD_SHIFT":
      return state; // TO DO: handle changes here
    case "REMOVE_SHIFT":
      return state; // TO DO: handle changes here
    case "CHANGE_SHIFT":
      return state; // TO DO: handle changes here
    default:
      return state;
  }
};

let store = createStore(myReducer);

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
