import React from 'react';

class ShiftLoadForWeek extends React.Component {

  constructor(props) {
    super(props);
  }
	
  render() {
    return <div>{this.props.weeklyload}</div>;
  }
}
ShiftLoadForWeek.defaultProps = {weeklyload:0};

export default ShiftLoadForWeek;