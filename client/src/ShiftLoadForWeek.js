import React from 'react';

class ShiftLoadForWeek extends React.Component {

  constructor(props) {
    super(props);
    this.state = {weeklyload: 0};	
  }
	
  render() {
    return <div>{this.state.weeklyload}</div>;
  }
}

export default ShiftLoadForWeek;