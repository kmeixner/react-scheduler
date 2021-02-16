import React, { Component } from 'react';
import SelectStaffMember from './SelectStaffMember';
import ShiftLoadForDay from './ShiftLoadForDay';
import ShiftLoadForWeek from './ShiftLoadForWeek';
import './App.css';

class App extends Component {
//state = {
//    data: null
//  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
	console.log(this.props);
    return (
      <div className="App">
		<div className="grid-container">
		
			<div className="h1 heading">Schedule</div>
			
			<div className="t1h1">&nbsp;</div>		
			<div className="t1h2 heading">Monday</div>
			<div className="t1h3 heading">Tuesday</div>
			<div className="t1h4 heading">Wednesday</div>
			<div className="t1h5 heading">Thursday</div>
			<div className="t1h6 heading">Friday</div>
			<div className="t1h7">&nbsp;</div>
			
			<div className="r1c1 leftheading">Morning Up stairs</div>
			<SelectStaffMember className="r1c2" />
			<SelectStaffMember className="r1c3" />
			<SelectStaffMember className="r1c4" />
			<SelectStaffMember className="r1c5" />
			<SelectStaffMember className="r1c6" />
			<div className="r1c7">&nbsp;</div>
			
			<div className="r2c1 leftheading">Morning Down tairs</div>
			<SelectStaffMember className="r2c2" />
			<SelectStaffMember className="r2c3" />
			<SelectStaffMember className="r2c4" />
			<SelectStaffMember className="r2c5" />
			<SelectStaffMember className="r2c6" />
			<div className="r2c7">&nbsp;</div>
			
			<div className="r3c1 leftheading">Morning Parking Lot</div>
			<SelectStaffMember className="r3c2" />
			<SelectStaffMember className="r3c3" />
			<SelectStaffMember className="r3c4" />
			<SelectStaffMember className="r3c5" />
			<SelectStaffMember className="r3c6" />
			<div className="r3c7">&nbsp;</div>

			<div className="r4">&nbsp;</div>
			
			<div className="r5c1 leftheading">Lunch A</div>
			<SelectStaffMember className="r5c2" />
			<SelectStaffMember className="r5c3" />
			<SelectStaffMember className="r5c4" />
			<SelectStaffMember className="r5c5" />
			<SelectStaffMember className="r5c6" />
			<div className="r5c7">&nbsp;</div>
			
			<div className="r6c1 leftheading">Lunch B</div>
			<SelectStaffMember className="r6c2" />
			<SelectStaffMember className="r6c3" />
			<SelectStaffMember className="r6c4" />
			<SelectStaffMember className="r6c5" />
			<SelectStaffMember className="r6c6" />
			<div className="r6c7">&nbsp;</div>
			
			<div className="r7c1 leftheading">Lunch C</div>
			<SelectStaffMember className="r7c2" />
			<SelectStaffMember className="r7c3" />
			<SelectStaffMember className="r7c4" />
			<SelectStaffMember className="r7c5" />
			<SelectStaffMember className="r7c6" />
			<div className="r7c7">&nbsp;</div>

			<div className="r8c1 leftheading">Lunch D</div>
			<SelectStaffMember className="r8c2" />
			<SelectStaffMember className="r8c3" />
			<SelectStaffMember className="r8c4" />
			<SelectStaffMember className="r8c5" />
			<SelectStaffMember className="r8c6" />
			<div className="r8c7">&nbsp;</div>

			<div className="r9">&nbsp;</div>

			<div className="r10c1 leftheading">Afternoon Up stairs</div>
			<SelectStaffMember className="r10c2" />
			<SelectStaffMember className="r10c3" />
			<SelectStaffMember className="r10c4" />
			<SelectStaffMember className="r10c5" />
			<SelectStaffMember className="r10c6" />
			<div className="r10c7">&nbsp;</div>
			
			<div className="r11c1 leftheading">Afternoon Down tairs</div>
			<SelectStaffMember className="r11c2" />
			<SelectStaffMember className="r11c3" />
			<SelectStaffMember className="r11c4" />
			<SelectStaffMember className="r11c5" />
			<SelectStaffMember className="r11c6" />
			<div className="r11c7">&nbsp;</div>
			
			<div className="rc1 leftheading">Afternoon Parking Lot</div>
			<SelectStaffMember className="r12c2" />
			<SelectStaffMember className="r12c3" />
			<SelectStaffMember className="r12c4" />
			<SelectStaffMember className="r12c5" />
			<SelectStaffMember className="r12c6" />
			<div className="r12c7">&nbsp;</div>

			<div className="h2 heading">Load</div>
			
			<div className="t2h1 heading">Staff Member</div>
			<div className="t2h2 heading">Monday</div>
			<div className="t2h3 heading">Tuesday</div>
			<div className="t2h4 heading">Wednesday</div>
			<div className="t2h5 heading">Thursday</div>
			<div className="t2h6 heading">Friday</div>
			<div className="t2h7 heading">Totals</div>
			
			<div className="x1c1 leftheading">X1</div>
			<ShiftLoadForDay className="x1c2" dailyload={this.props.allShiftInfo['X1']['monday'].numShiftsForDay} />
			<ShiftLoadForDay className="x1c3" dailyload={this.props.allShiftInfo['X1']['tuesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x1c4" dailyload={this.props.allShiftInfo['X1']['wednesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x1c5" dailyload={this.props.allShiftInfo['X1']['thursday'].numShiftsForDay} />
			<ShiftLoadForDay className="x1c6" dailyload={this.props.allShiftInfo['X1']['friday'].numShiftsForDay} />
			<ShiftLoadForWeek className="x1c7" weeklyload={this.props.allShiftInfo['X1'].numWeeklyShifts} />
			
			<div className="x2c1 leftheading">X2</div>
			<ShiftLoadForDay className="x2c2" dailyload={this.props.allShiftInfo['X2']['monday'].numShiftsForDay} />
			<ShiftLoadForDay className="x2c3" dailyload={this.props.allShiftInfo['X2']['tuesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x2c4" dailyload={this.props.allShiftInfo['X2']['wednesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x2c5" dailyload={this.props.allShiftInfo['X2']['thursday'].numShiftsForDay} />
			<ShiftLoadForDay className="x2c6" dailyload={this.props.allShiftInfo['X2']['friday'].numShiftsForDay} />
			<ShiftLoadForWeek className="x2c7" weeklyload={this.props.allShiftInfo['X2'].numWeeklyShifts} />

			<div className="x3c1 leftheading">X3</div>
			<ShiftLoadForDay className="x3c2" dailyload={this.props.allShiftInfo['X3']['monday'].numShiftsForDay} />
			<ShiftLoadForDay className="x3c3" dailyload={this.props.allShiftInfo['X3']['tuesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x3c4" dailyload={this.props.allShiftInfo['X3']['wednesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x3c5" dailyload={this.props.allShiftInfo['X3']['thursday'].numShiftsForDay} />
			<ShiftLoadForDay className="x3c6" dailyload={this.props.allShiftInfo['X3']['friday'].numShiftsForDay} />
			<ShiftLoadForWeek className="x3c7" weeklyload={this.props.allShiftInfo['X3'].numWeeklyShifts} />

			<div className="x4c1 leftheading">X4</div>
			<ShiftLoadForDay className="x4c2" dailyload={this.props.allShiftInfo['X4']['monday'].numShiftsForDay} />
			<ShiftLoadForDay className="x4c3" dailyload={this.props.allShiftInfo['X4']['tuesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x4c4" dailyload={this.props.allShiftInfo['X4']['wednesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x4c5" dailyload={this.props.allShiftInfo['X4']['thursday'].numShiftsForDay} />
			<ShiftLoadForDay className="x4c6" dailyload={this.props.allShiftInfo['X4']['friday'].numShiftsForDay} />
			<ShiftLoadForWeek className="x4c7" weeklyload={this.props.allShiftInfo['X4'].numWeeklyShifts} />

			<div className="x5c1 leftheading">X5</div>
			<ShiftLoadForDay className="x5c2" dailyload={this.props.allShiftInfo['X5']['monday'].numShiftsForDay} />
			<ShiftLoadForDay className="x5c3" dailyload={this.props.allShiftInfo['X5']['tuesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x5c4" dailyload={this.props.allShiftInfo['X5']['wednesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x5c5" dailyload={this.props.allShiftInfo['X5']['thursday'].numShiftsForDay} />
			<ShiftLoadForDay className="x5c6" dailyload={this.props.allShiftInfo['X5']['friday'].numShiftsForDay} />
			<ShiftLoadForWeek className="x5c7" weeklyload={this.props.allShiftInfo['X5'].numWeeklyShifts} />

			<div className="x6c1 leftheading">X6</div>
			<ShiftLoadForDay className="x6c2" dailyload={this.props.allShiftInfo['X6']['monday'].numShiftsForDay} />
			<ShiftLoadForDay className="x6c3" dailyload={this.props.allShiftInfo['X6']['tuesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x6c4" dailyload={this.props.allShiftInfo['X6']['wednesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x6c5" dailyload={this.props.allShiftInfo['X6']['thursday'].numShiftsForDay} />
			<ShiftLoadForDay className="x6c6" dailyload={this.props.allShiftInfo['X6']['friday'].numShiftsForDay} />
			<ShiftLoadForWeek className="x6c7" weeklyload={this.props.allShiftInfo['X6'].numWeeklyShifts} />

			<div className="x7c1 leftheading">X7</div>
			<ShiftLoadForDay className="x7c2" dailyload={this.props.allShiftInfo['X7']['monday'].numShiftsForDay} />
			<ShiftLoadForDay className="x7c3" dailyload={this.props.allShiftInfo['X7']['tuesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x7c4" dailyload={this.props.allShiftInfo['X7']['wednesday'].numShiftsForDay} />
			<ShiftLoadForDay className="x7c5" dailyload={this.props.allShiftInfo['X7']['thursday'].numShiftsForDay} />
			<ShiftLoadForDay className="x7c6" dailyload={this.props.allShiftInfo['X7']['friday'].numShiftsForDay} />
			<ShiftLoadForWeek className="x7c7" weeklyload={this.props.allShiftInfo['X7'].numWeeklyShifts} />
			
		</div>
      </div>
    );
  }
}

export default App;
