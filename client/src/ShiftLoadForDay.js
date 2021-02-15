import React from 'react';

class ShiftLoadForDay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {dailyload: 0};
  }
	
  render() {
    return <div>{this.state.dailyload}</div>;
  }
}

export default ShiftLoadForDay;