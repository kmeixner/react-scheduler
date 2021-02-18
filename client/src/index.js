import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// BEGIN REDUX:

// Standard Redux practice, use global constants for action.type labels:
const CHANGE_SHIFT = 'CHANGE_SHIFT'; 

/** 
 *change shift will be dispatched to be called by the select drop-downs when a user changes a shift 
 */
const changeShift = (employee, weekday, shift) => {
  return {
    type: CHANGE_SHIFT,
    employee: employee,
	weekday: weekday,
	shift: shift
  }
};

// Defines Initial app state:
//
// Notes: 
//  - mA, mB, mC represents Morning Up Stairs, Morning Down Stairs, Morning Parking Lot, respectfully
//  - aA, aB, aC represents Afternoon Up Stairs, Afternoon Down Stairs, Afternoon Parking Lot, respectfully
//  - lA, lB, lC, lD represents Lunch A, Lunch B, Lunch C, Lunch D, respectully
//
const DEFAULT_SHIFT_STATE = {
	monday:{mA:'None', mB:'None', mC:'None', lA:'None', lB:'None', lC:'None', lD:'None', aA:'None', aB:'None', aC:'None'},
	tuesday:{mA:'None', mB:'None', mC:'None', lA:'None', lB:'None', lC:'None', lD:'None', aA:'None', aB:'None', aC:'None'},
	wednesday:{mA:'None', mB:'None', mC:'None', lA:'None', lB:'None', lC:'None', lD:'None', aA:'None', aB:'None', aC:'None'},	
	thursday:{mA:'None', mB:'None', mC:'None', lA:'None', lB:'None', lC:'None', lD:'None', aA:'None', aB:'None', aC:'None'},
	friday:{mA:'None', mB:'None', mC:'None', lA:'None', lB:'None', lC:'None', lD:'None', aA:'None', aB:'None', aC:'None'}
};

/** 
 * Reducer handles actions user initiates from UI. 
 * 
 * Currently supported actions:
 *
 * - CHANGE_SHIFT
 *
 * @param object previousState - (default: DEFAULT_SHIFT_STATE) the previous App state
 * @param object action - Redux format object for action, must contain at least action.type
 *
 * @returns object - object containing the new App state.
 */
const myReducer = function (previousState = DEFAULT_SHIFT_STATE, action) {
	
	switch (action.type) {
		
		case CHANGE_SHIFT:
		
			// Change assigned employee for given weekday and shift:
		
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
			console.log('ERR: Recieved unsupported action: '+action.type);
			return previousState;
	}
	
};

// Create store containing app state:
// (a Redux store is a single source of truth for app state)
let store = createStore(myReducer); 

/**
 * mapStateToeProps is used to allow connected components to read state 
 * through their props:
 *
 * @param object state - current App state
 *
 * @returns object - {allShiftInfo: aInfo} where aInfo contains App state 
 */
const mapStateToProps = (state) => {

	let aInfo = [];
	
	/*** Internal Helper functions: ***/

	/**
	 * Returns info about number of shifts scheduled for a  given employee 
	 * for a given weekday in a format similar to the following:
	 *
	 * {
	 * 	numShiftsForDay: 2,
	 * 	tooManyShiftsForDay: false,
	 * 	morningSchedulingConflict: true,
	 * 	afternoonSchedulingConflict: false,
	 * 	consecutiveLunchSlotsScheduled: false
	 * };	 
	 *
	 * @param state - App state
	 * @param weekday - the weekday ('monday'|'tuesday'|'wednesday'|'thursday'|'friday')
	 * @param employee - the employee ('X1'|'X2'...'X7)
	 * 
	 * @returns object - object containing shifts and error flags
	 */
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
		
		if (iNumAfternoonShifts > 1) {
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
	
	/**
	 * Returns the number of shifts scheduled for a given employee for the
	 * entire week.
	 *
	 * @param employee - the employee ('X1'|'X2'...'X7)
	 * @param array aInfo - array containing all shift info where
	 *                      aInfo[employee][weekday]['numShiftsForDay']
	 *                      contains a daily shift total.
	 * 
	 * @returns int - the number of shifts
	 */	
	const getNumShiftsForEmployeeAndWeek = (employee, aInfo) => {
		
		let iNumWeeklyShifts = 0;
		
		iNumWeeklyShifts += aInfo[employee]['monday']['numShiftsForDay'];
		iNumWeeklyShifts += aInfo[employee]['tuesday']['numShiftsForDay'];
		iNumWeeklyShifts += aInfo[employee]['wednesday']['numShiftsForDay'];
		iNumWeeklyShifts += aInfo[employee]['thursday']['numShiftsForDay'];
		iNumWeeklyShifts += aInfo[employee]['friday']['numShiftsForDay'];

		return iNumWeeklyShifts;
	}
	
	/*** Define state information to be passed to props of components ***/
	
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

/**
 * Used to allow connected components to have access to call actions through 
 * their props:
 *
 * @param function dispatch - dispatch is a special function of the Redux store
 * 
 * @returns object - Redux format object. Each field in the object will be
 *                   linked to props in connected components. The value of 
 *                   each field should (normally) be a function that 
 *                   dispatches an action when called.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    submitChangeShift: (employee, weekday, shift) => {
       dispatch(changeShift(employee, weekday, shift))
    }
  }
};

//const Provider = ReactRedux.Provider; // unnecessary, Provider already imported
//const connect = ReactRedux.connect; // unnecessary, connect already imported

// Connects state (mapStateToProps) and actions (mapDispatchToProps) to props of <App> component:
const Container = connect(mapStateToProps,mapDispatchToProps)(App);

// END REDUX (except for <Provider> tag below)

// Display the App:
//
// Notes:
// - we call <Container /> instead of <App /> directly to include the Redux stuff linked via connect() above
// - the Redux <Provider /> contains 'store' which contains the App state (single source of truth for state)

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
