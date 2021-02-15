import React, { Component } from 'react'
import Select from 'react-select';

const options = [
  { value: 'X1', label: 'X1' },
  { value: 'X2', label: 'X2' },
  { value: 'X3', label: 'X3' },
  { value: 'X4', label: 'X4' },
  { value: 'X5', label: 'X5' },
  { value: 'X6', label: 'X6' },  
  { value: 'X7', label: 'X7' }
]

class SelectStaffMember extends React.Component {

  constructor(props) {
    super(props);
  }
	
  render() {
    return <Select options={options} />;
  }
}

export default SelectStaffMember;