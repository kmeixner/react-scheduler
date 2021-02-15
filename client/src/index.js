import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// BEGIN REDUX:

const CHANGE_SHIFT = 'CHANGE_SHIFT';

const changeShift = (employee, weekday, shift) => {
  return {
    type: CHANGE_SHIFT,
    employee: employee,
	weekday: weekday,
	shift: shift
  }
};

const defaultShiftState = {
	monday:{mA:'None', mB:'None', mC:'None', lA:'None', lB:'None', lC:'None', lD:'None', aA:'None', aB:'None', aC:'None'},
	tuesday:{mA:'None', mB:'None', mC:'None', lA:'None', lB:'None', lC:'None', lD:'None', aA:'None', aB:'None', aC:'None'},
	wednesday:{mA:'None', mB:'None', mC:'None', lA:'None', lB:'None', lC:'None', lD:'None', aA:'None', aB:'None', aC:'None'},	
	thursday:{mA:'None', mB:'None', mC:'None', lA:'None', lB:'None', lC:'None', lD:'None', aA:'None', aB:'None', aC:'None'},
	friday:{mA:'None', mB:'None', mC:'None', lA:'None', lB:'None', lC:'None', lD:'None', aA:'None', aB:'None', aC:'None'}
};

const myReducer = function (previousState = defaultShiftState, action) {
	switch (action.type) {
		case CHANGE_SHIFT:
			// *!* don't alter original previousState object since states must be immuntable in Redux *!*:
			const oNewShiftState = Object.assign({}, previousState); // make copy of previousState
	  
			const weekday = action.weekday;
			const shift = action.shift;
			const employee = action.employee;

			// Sanity checks for valid data:
			switch (weekday) {
				case 'monday':case 'tuesday':case 'wednesday':case 'thursday':case 'friday':
					switch (action.shift) {
						case 'mA':case 'mB':case 'mC':case 'lA':case 'lB':case 'lC':case 'lD':case 'aA':case 'aB':case 'aC':
							switch (action.employee) {
								case 'None':case 'x1':case 'x2':case 'x3':case 'x4':case 'x5':case 'x5':case 'x7':
								default:
									console.log('ERR: Recieved unsupported employee: '+action.employee);
									return previousState; // error unsupported employee
							}
							break;
						default:
							console.log('ERR: Recieved unsupported shift: '+action.shift);
							return previousState; // error unsupported shift
					}
					break;
				default:
					console.log('ERR: Recieved unsupported weekday: '+action.weekday);
					return previousState; // error unsupported weekday
			}
	  
			// Change Shift Assignment:
			oNewShiftState[action.weekday][action.shift] = action.employee;
	  		return oNewShiftState; 
		default:
			return previousState; // error unsupported action
	}
};

let store = createStore(myReducer);

// END REDUX (except for <Provider> tag below)

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
