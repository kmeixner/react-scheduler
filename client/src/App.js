import React, { Component } from 'react';
import BlankCell from './BlankCell';
import './App.css';

class App extends Component {
state = {
    data: null
  };

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
    return (
      <div className="App">
		<div className="grid-container">
		
			<div className="h1 heading">Schedule</div>
			
			<BlankCell className="t1h1" />			
			<div className="t1h2 heading">Monday</div>
			<div className="t1h3 heading">Tuesday</div>
			<div className="t1h4 heading">Wednesday</div>
			<div className="t1h5 heading">Thursday</div>
			<div className="t1h6 heading">Friday</div>
			<BlankCell className="t1h7" />
			
			<div className="r1c1 leftheading">Morning Up stairs</div>
			<div className="r1c2">X</div>
			<div className="r1c3">X</div>
			<div className="r1c4">X</div>
			<div className="r1c5">X</div>
			<div className="r1c6">X</div>
			<BlankCell className="r1c7" />
			
			<div className="r2c1 leftheading">Morning Down tairs</div>
			<div className="r2c2">X</div>
			<div className="r2c3">X</div>
			<div className="r2c4">X</div>
			<div className="r2c5">X</div>
			<div className="r2c6">X</div>
			<BlankCell className="r2c7" />
			
			<div className="r3c1 leftheading">Morning Parking Lot</div>
			<div className="r3c2">X</div>
			<div className="r3c3">X</div>
			<div className="r3c4">X</div>
			<div className="r3c5">X</div>
			<div className="r3c6">X</div>
			<BlankCell className="r3c7" />

			<div className="r4">&nbsp;</div>
			
			<div className="r5c1 leftheading">Lunch A</div>
			<div className="r5c2">X</div>
			<div className="r5c3">X</div>
			<div className="r5c4">X</div>
			<div className="r5c5">X</div>
			<div className="r5c6">X</div>
			<BlankCell className="r5c7" />
			
			<div className="r6c1 leftheading">Lunch B</div>
			<div className="r6c2">X</div>
			<div className="r6c3">X</div>
			<div className="r6c4">X</div>
			<div className="r6c5">X</div>
			<div className="r6c6">X</div>
			<BlankCell className="r6c7" />
			
			<div className="r7c1 leftheading">Lunch C</div>
			<div className="r7c2">X</div>
			<div className="r7c3">X</div>
			<div className="r7c4">X</div>
			<div className="r7c5">X</div>
			<div className="r7c6">X</div>
			<BlankCell className="r7c7" />

			<div className="r8c1 leftheading">Lunch D</div>
			<div className="r8c2">X</div>
			<div className="r8c3">X</div>
			<div className="r8c4">X</div>
			<div className="r8c5">X</div>
			<div className="r8c6">X</div>
			<BlankCell className="r8c7" />

			<div className="r9">&nbsp;</div>

			<div className="r10c1 leftheading">Afternoon Up stairs</div>
			<div className="r10c2">X</div>
			<div className="r10c3">X</div>
			<div className="r10c4">X</div>
			<div className="r10c5">X</div>
			<div className="r10c6">X</div>
			<BlankCell className="r10c7" />
			
			<div className="r11c1 leftheading">Afternoon Down tairs</div>
			<div className="r11c2">X</div>
			<div className="r11c3">X</div>
			<div className="r11c4">X</div>
			<div className="r11c5">X</div>
			<div className="r11c6">X</div>
			<BlankCell className="r11c7" />
			
			<div className="rc1 leftheading">Afternoon Parking Lot</div>
			<div className="r12c2">X</div>
			<div className="r12c3">X</div>
			<div className="r12c4">X</div>
			<div className="r12c5">X</div>
			<div className="r12c6">X</div>
			<BlankCell className="r12c7" />

			<div className="h2 heading">Load</div>
			
			<div className="t2h1 heading">Staff Member</div>
			<div className="t2h2 heading">Monday</div>
			<div className="t2h3 heading">Tuesday</div>
			<div className="t2h4 heading">Wednesday</div>
			<div className="t2h5 heading">Thursday</div>
			<div className="t2h6 heading">Friday</div>
			<div className="t2h7 heading">Totals</div>
			
			<div className="x1c1 leftheading">X1</div>
			<div className="x1c2">Y</div>
			<div className="x1c3">Y</div>
			<div className="x1c4">Y</div>
			<div className="x1c5">Y</div>
			<div className="x1c6">Y</div>
			<div className="x1c7">YY</div>
			
			<div className="x2c1 leftheading">X1</div>
			<div className="x2c2">Y</div>
			<div className="x2c3">Y</div>
			<div className="x2c4">Y</div>
			<div className="x2c5">Y</div>
			<div className="x2c6">Y</div>
			<div className="x2c7">YY</div>

			<div className="x3c1 leftheading">X1</div>
			<div className="x3c2">Y</div>
			<div className="x3c3">Y</div>
			<div className="x3c4">Y</div>
			<div className="x3c5">Y</div>
			<div className="x3c6">Y</div>
			<div className="x3c7">YY</div>

			<div className="x4c1 leftheading">X1</div>
			<div className="x4c2">Y</div>
			<div className="x4c3">Y</div>
			<div className="x4c4">Y</div>
			<div className="x4c5">Y</div>
			<div className="x4c6">Y</div>
			<div className="x4c7">YY</div>

			<div className="x5c1 leftheading">X1</div>
			<div className="x5c2">Y</div>
			<div className="x5c3">Y</div>
			<div className="x5c4">Y</div>
			<div className="x5c5">Y</div>
			<div className="x5c6">Y</div>
			<div className="x5c7">YY</div>

			<div className="x6c1 leftheading">X1</div>
			<div className="x6c2">Y</div>
			<div className="x6c3">Y</div>
			<div className="x6c4">Y</div>
			<div className="x6c5">Y</div>
			<div className="x6c6">Y</div>
			<div className="x6c7">YY</div>

			<div className="x7c1 leftheading">X1</div>
			<div className="x7c2">Y</div>
			<div className="x7c3">Y</div>
			<div className="x7c4">Y</div>
			<div className="x7c5">Y</div>
			<div className="x7c6">Y</div>
			<div className="x7c7">YY</div>			
			
		</div>
      </div>
    );
  }
}

export default App;
