import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
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

const mapStateToProps = (state) => {

	let aInfo = [];

	const getNumShiftsForEmployeeAndDay = (state, weekday, employee) => {
		
		let iTotalNumShifts = 0;
		
		let iNumMorningShifts = 0;
		let iNumLunchShifts = 0;
		let iNumAfternoonShifts = 0;
		
		let bTooManyShiftsForDay = false;
		let bMorningSchedulingConflict = false;
		let bAfternoonSchedulingConflict = false;
		let bConsecutiveLunchSlotsScheduled = false;
		
		// Determine Shift Totals:
		
		if (employee == state[weekday]['mA']){
			iTotalNumShifts++;
			iNumMorningShifts++;
		}
		
		if (employee == state[weekday]['mB']) {
			iTotalNumShifts++;
			iNumMorningShifts++;
		}
		
		if (employee == state[weekday]['mC']) {
			iTotalNumShifts++;
			iNumMorningShifts++;
		}
		
		if (employee == state[weekday]['lA']){
			iTotalNumShifts++;
			iNumLunchShifts++;
		}

		if (employee == state[weekday]['lB']){
			iTotalNumShifts++;
			iNumLunchShifts++;
		}

		if (employee == state[weekday]['lC']){
			iTotalNumShifts++;
			iNumLunchShifts++;
		}

		if (employee == state[weekday]['lD']){
			iTotalNumShifts++;
			iNumLunchShifts++;
		}

		if (employee == state[weekday]['aA']){
			iTotalNumShifts++;
			iNumAfternoonShifts++;
		}

		if (employee == state[weekday]['aB']){
			iTotalNumShifts++;
			iNumAfternoonShifts++;
		}

		if (employee == state[weekday]['aC']){
			iTotalNumShifts++;
			iNumAfternoonShifts++;
		}
		
		// Check rules aren't broken:
		
		if (iTotalNumShifts > 2) {
			bTooManyShiftsForDay = true;
		}
		
		if (iNumMorningShifts > 1) {
			bMorningSchedulingConflict = true;
		}
		
		if (iNumMorningShifts > 1) {
			bAfternoonSchedulingConflict = true;
		}

		if (iNumLunchShifts > 1) { // disallow consequtive lunch slots
			
			if (
				employee == state[weekday]['lA'] && employee == state[weekday]['lB']
				||
				employee == state[weekday]['lB'] && employee == state[weekday]['lC']
				||
				employee == state[weekday]['lC'] && employee == state[weekday]['lD']
			   )
			 {
				 bConsecutiveLunchSlotsScheduled = true;
			 }
			
		}
		
		return {
			numShiftsForDay: iTotalNumShifts,
			tooManyShiftsForDay: bTooManyShiftsForDay,
			morningSchedulingConflict: bMorningSchedulingConflict,
			afternoonSchedulingConflict: bAfternoonSchedulingConflict,
			consecutiveLunchSlotsScheduled: bConsecutiveLunchSlotsScheduled
		};

	}
	
	const getNumShiftsForEmployeeAndWeek = (employee, aInfo) => {
		
		let iNumWeeklyShifts = 0;
		
		iNumWeeklyShifts += aInfo[employee]['monday']['numShiftsForDay'];
		iNumWeeklyShifts += aInfo[employee]['tuesday']['numShiftsForDay'];
		iNumWeeklyShifts += aInfo[employee]['wednesday']['numShiftsForDay'];
		iNumWeeklyShifts += aInfo[employee]['thursday']['numShiftsForDay'];
		iNumWeeklyShifts += aInfo[employee]['friday']['numShiftsForDay'];

		return iNumWeeklyShifts;
	}
	
	aInfo['X1']['monday'] 		= getNumShiftsForEmployeeAndDay(state, 'X1', 'monday');
	aInfo['X1']['tuesday'] 		= getNumShiftsForEmployeeAndDay(state, 'X1', 'tueday');
	aInfo['X1']['wednesday'] 	= getNumShiftsForEmployeeAndDay(state, 'X1', 'wednesday');		
	aInfo['X1']['thursday'] 	= getNumShiftsForEmployeeAndDay(state, 'X1', 'thursday');
	aInfo['X1']['friday'] 		= getNumShiftsForEmployeeAndDay(state, 'X1', 'friday');
	aInfo['X1']['numWeeklyShifts'] = getNumShiftsForEmployeeAndWeek('X1', aInfo);
	aInfo['X1']['tooManyWeeklyShifts'] = (aInfo['X1']['numWeeklyShifts'] > 7) ? true : false;
	
	aInfo['X2']['monday'] 		= getNumShiftsForEmployeeAndDay(state, 'X2', 'monday');
	aInfo['X2']['tuesday'] 		= getNumShiftsForEmployeeAndDay(state, 'X2', 'tueday');
	aInfo['X2']['wednesday'] 	= getNumShiftsForEmployeeAndDay(state, 'X2', 'wednesday');		
	aInfo['X2']['thursday'] 	= getNumShiftsForEmployeeAndDay(state, 'X2', 'thursday');
	aInfo['X2']['friday'] 		= getNumShiftsForEmployeeAndDay(state, 'X2', 'friday');
	aInfo['X2']['numWeeklyShifts'] = getNumShiftsForEmployeeAndWeek('X2', aInfo);
	aInfo['X2']['tooManyWeeklyShifts'] = (aInfo['X2']['numWeeklyShifts'] > 7) ? true : false;	
	
	aInfo['X3']['monday'] 		= getNumShiftsForEmployeeAndDay(state, 'X3', 'monday');
	aInfo['X3']['tuesday'] 		= getNumShiftsForEmployeeAndDay(state, 'X3', 'tueday');
	aInfo['X3']['wednesday'] 	= getNumShiftsForEmployeeAndDay(state, 'X3', 'wednesday');		
	aInfo['X3']['thursday'] 	= getNumShiftsForEmployeeAndDay(state, 'X3', 'thursday');
	aInfo['X3']['friday'] 		= getNumShiftsForEmployeeAndDay(state, 'X3', 'friday');
	aInfo['X3']['numWeeklyShifts'] = getNumShiftsForEmployeeAndWeek('X3', aInfo);
	aInfo['X3']['tooManyWeeklyShifts'] = (aInfo['X3']['numWeeklyShifts'] > 7) ? true : false;	
	
	aInfo['X4']['monday'] 		= getNumShiftsForEmployeeAndDay(state, 'X4', 'monday');
	aInfo['X4']['tuesday'] 		= getNumShiftsForEmployeeAndDay(state, 'X4', 'tueday');
	aInfo['X4']['wednesday'] 	= getNumShiftsForEmployeeAndDay(state, 'X4', 'wednesday');		
	aInfo['X4']['thursday'] 	= getNumShiftsForEmployeeAndDay(state, 'X4', 'thursday');
	aInfo['X4']['friday'] 		= getNumShiftsForEmployeeAndDay(state, 'X4', 'friday');
	aInfo['X4']['numWeeklyShifts'] = getNumShiftsForEmployeeAndWeek('X4', aInfo);
	aInfo['X4']['tooManyWeeklyShifts'] = (aInfo['X4']['numWeeklyShifts'] > 7) ? true : false;	
	
	aInfo['X5']['monday'] 		= getNumShiftsForEmployeeAndDay(state, 'X5', 'monday');
	aInfo['X5']['tuesday'] 		= getNumShiftsForEmployeeAndDay(state, 'X5', 'tueday');
	aInfo['X5']['wednesday'] 	= getNumShiftsForEmployeeAndDay(state, 'X5', 'wednesday');		
	aInfo['X5']['thursday'] 	= getNumShiftsForEmployeeAndDay(state, 'X5', 'thursday');
	aInfo['X5']['friday'] 		= getNumShiftsForEmployeeAndDay(state, 'X5', 'friday');
	aInfo['X5']['numWeeklyShifts'] = getNumShiftsForEmployeeAndWeek('X5', aInfo);
	aInfo['X5']['tooManyWeeklyShifts'] = (aInfo['X5']['numWeeklyShifts'] > 7) ? true : false;	
	
	aInfo['X6']['monday'] 		= getNumShiftsForEmployeeAndDay(state, 'X6', 'monday');
	aInfo['X6']['tuesday'] 		= getNumShiftsForEmployeeAndDay(state, 'X6', 'tueday');
	aInfo['X6']['wednesday'] 	= getNumShiftsForEmployeeAndDay(state, 'X6', 'wednesday');		
	aInfo['X6']['thursday'] 	= getNumShiftsForEmployeeAndDay(state, 'X6', 'thursday');
	aInfo['X6']['friday'] 		= getNumShiftsForEmployeeAndDay(state, 'X6', 'friday');
	aInfo['X6']['numWeeklyShifts'] = getNumShiftsForEmployeeAndWeek('X6', aInfo);
	aInfo['X6']['tooManyWeeklyShifts'] = (aInfo['X6']['numWeeklyShifts'] > 7) ? true : false;	
	
	aInfo['X7']['monday'] 		= getNumShiftsForEmployeeAndDay(state, 'X7', 'monday');
	aInfo['X7']['tuesday'] 		= getNumShiftsForEmployeeAndDay(state, 'X7', 'tueday');
	aInfo['X7']['wednesday'] 	= getNumShiftsForEmployeeAndDay(state, 'X7', 'wednesday');		
	aInfo['X7']['thursday'] 	= getNumShiftsForEmployeeAndDay(state, 'X7', 'thursday');
	aInfo['X7']['friday'] 		= getNumShiftsForEmployeeAndDay(state, 'X7', 'friday');
	aInfo['X7']['numWeeklyShifts'] = getNumShiftsForEmployeeAndWeek('X7', aInfo);
	aInfo['X7']['tooManyWeeklyShifts'] = (aInfo['X7']['numWeeklyShifts'] > 7) ? true : false;	
	
	return {allShiftInfo: aInfo};
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitChangeShift: (employee, weekday, shift) => {
       dispatch(changeShift(employee, weekday, shift))
    }
  }
};

//const Provider = ReactRedux.Provider; // unnecessary , Provider already imported
//const connect = ReactRedux.connect; // unnecessary , connect already imported

const Container = connect(mapStateToProps,mapDispatchToProps)(App);

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
