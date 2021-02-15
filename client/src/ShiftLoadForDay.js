import React from 'react';

class ShiftLoadForDay extends React.Component {

  constructor(props) {
    super(props);
  }
	
  render() {
    return <div>{this.props.dailyload}</div>;
  }
}
ShiftLoadForDay.defaultProps = {dailyload:0};

export default ShiftLoadForDay;