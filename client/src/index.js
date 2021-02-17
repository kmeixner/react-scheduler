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
	console.log('myReducer called, action.type: '+ action.type);
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
								case 'None':case 'X1':case 'X2':case 'X3':case 'X4':case 'X5':case 'X5':case 'X7':
									break;
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
	
	for (var i=1; i<=7; i++) {
		
		let sEmp = 'X'+i; // X1..X7
		
		aInfo[sEmp] = {
			monday:null,
			tuesday:null,
			wednesday:null,
			thursday:null,
			friday:null
		};
		
		aInfo[sEmp]['monday'] 		= getNumShiftsForEmployeeAndDay(state, 'monday', sEmp);
		aInfo[sEmp]['tuesday'] 		= getNumShiftsForEmployeeAndDay(state, 'tuesday', sEmp);
		aInfo[sEmp]['wednesday'] 	= getNumShiftsForEmployeeAndDay(state, 'wednesday', sEmp);		
		aInfo[sEmp]['thursday'] 	= getNumShiftsForEmployeeAndDay(state, 'thursday', sEmp);
		aInfo[sEmp]['friday'] 		= getNumShiftsForEmployeeAndDay(state, 'friday', sEmp);
		aInfo[sEmp]['numWeeklyShifts'] = getNumShiftsForEmployeeAndWeek(sEmp, aInfo);
		aInfo[sEmp]['tooManyWeeklyShifts'] = (aInfo[sEmp]['numWeeklyShifts'] > 7) ? true : false;		
	}
	
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
			<Container />
		</React.StrictMode>
	</Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
