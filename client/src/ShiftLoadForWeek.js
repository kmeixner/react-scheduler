import React from 'react';

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

export default ShiftLoadForWeek;