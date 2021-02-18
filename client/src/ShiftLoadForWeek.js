import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays the weekly number of shifts for an employee. 
 *
 * If there are more than 7 weekly shifts then the number of shifts 
 * will be displayed with className="error" format (ie: bold and red) and 
 * will include an HTML title tag so that hovering the mouse over the number 
 * for a couple of sections will display a caption with the error message
 * to the user.
 *
 * Required props:
 * 
 * @param int weeklyload - the number of shifts to display.
 */
class ShiftLoadForWeek extends React.Component {

  constructor(props) {
    super(props);
  }
	
  render() {
	if (this.props.weeklyload <=7) {
		return <div>{this.props.weeklyload}</div>;
	}
	else {
		return <div className="error" title="Too many weekly shifts scheduled.">{this.props.weeklyload}</div>;		
	}
  }
}
ShiftLoadForWeek.propTypes = { 
	weeklyload: PropTypes.number.isRequired,
}

export default ShiftLoadForWeek;