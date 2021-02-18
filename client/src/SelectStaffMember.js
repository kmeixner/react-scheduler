import React, { Component } from 'react'
import Select from 'react-select';

const options = [
  { value: 'None', label: 'None' },
  { value: 'X1', label: 'X1' },
  { value: 'X2', label: 'X2' },
  { value: 'X3', label: 'X3' },
  { value: 'X4', label: 'X4' },
  { value: 'X5', label: 'X5' },
  { value: 'X6', label: 'X6' },  
  { value: 'X7', label: 'X7' }
]

/**
 * <SelectStaffMember /> creates a select drop-down of available employees.
 * When the user selects and employee (or 'None') a callback will be called:
 *
 * Required props:
 *
 * @param string weekday - the weekday ('monday'|'tuesday'|'wednesday'|'thursday'|'friday')
 * @param string shift - the shift ('mA'|'mB'|'mC'|'lA'|'lB'|'lC'|'lD'|'aA'|'aB'|'aC' 
 * 		representing the 3 morning, 4 lunch and 3 afternoon shift types) 
 * @param function callback: - function to be called when user selects an 
 * 		employee (or 'None') for a shift. The function format must be 
 *      callback(employee, weekday, shift)
 */
class SelectStaffMember extends React.Component {

  constructor(props) {
    super(props);
    this.state = {employee: 'None'};
  }
  
  handleChange = (event) => {
	this.setState({employee: event.value});
	this.props.callback(event.value, this.props.weekday, this.props.shift);	
  }
	
  render() {
	const selectedValue = "None";
    return <Select 
				options={options} 
				defaultValue={{ label: 'None', value: 'None' }} 
				onChange={this.handleChange.bind(this)} 				
			/>;
  }
}

export default SelectStaffMember;