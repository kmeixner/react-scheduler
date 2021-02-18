import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays the number of shifts scheduled for an employee for a weekday.
 *
 * If there are any error flags detected in the data, the number of shifts 
 * will be displayed with className="error" format (ie: bold and red) and 
 * will include an HTML title tag so that hovering the mouse over the number 
 * for a couple of sections will display a caption with the error message(s)
 * to the user.
 *
 * Required props:
 * 
 * @param object data - the daily shift info for the employee, which must 
 * 		contain at least the info similar to the following:
 *
 * 		{
 *			numShiftsForDay: 2,
 *			tooManyShiftsForDay: false,   
 *			morningSchedulingConflict: true,
 *			afternoonSchedulingConflict: false,
 *			consecutiveLunchSlotsScheduled: false
 *		} 
 */
class ShiftLoadForDay extends React.Component {

	constructor(props) {
		super(props);
	}
  
	render() {
		
		let bHasErrors = false;
		let sErrorMessages = "";
		
		if (this.props.data.morningSchedulingConflict) {
			bHasErrors = true;
			sErrorMessages = ", Morning scheduling conflict";
		}
		
		if (this.props.data.afternoonSchedulingConflict) {
			bHasErrors = true;
			sErrorMessages += ", Afternoon scheduling conflict";
		}		
		
		if (this.props.data.tooManyShiftsForDay) {
			bHasErrors = true;
			sErrorMessages += ", Too many daily shifts scheduled";
		}
		
		if (this.props.data.consecutiveLunchSlotsScheduled) {
			bHasErrors = true;
			sErrorMessages += ", Consecutive Lunches scheduled";
		}

		if (!bHasErrors) {
			return <div>{this.props.data.numShiftsForDay}</div>;
		}
		else {
			sErrorMessages = sErrorMessages.substr(2); // remove ', '
			return <div className="error" title={sErrorMessages}>{this.props.data.numShiftsForDay}</div>;			
		}
	}
}
ShiftLoadForDay.propTypes = { 
	data: PropTypes.object.isRequired,
}

export default ShiftLoadForDay;