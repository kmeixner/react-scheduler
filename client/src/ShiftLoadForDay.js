import React from 'react';

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

export default ShiftLoadForDay;