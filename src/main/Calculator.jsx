import React, { Component } from 'react'
import './Calculator.css';
import Buttons from '../components/Buttons';
import Display from '../components/Display';

const inicialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
  result: 0,
}

export default class Calculator extends Component {
  state = { ...inicialState }
  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory = () => {
    this.setState({ ...inicialState })
    
  }
  setOperation = (operation) => {
    console.log(operation)    
  }
  addDigit = (n) => {
    if (n === '.' && this.state.displayValue.includes('.')) {
      return
    }    
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });
    if(n !== "."){
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values]; // Clonando o array, ou, peguando o que ja tem e colocando o novo valor
      values[i] = newValue; // Colocando o novo valor no array
      this.setState({ values });
      console.log(values)
    }
  }



  render() {

    return (
      <div className='calculator'>
        <Display value={this.state.displayValue}/>
        <Buttons label="AC" click={this.clearMemory} triple/>
        <Buttons label="/" click={this.setOperation} operation/>
        <Buttons label="7" click={this.addDigit}/>
        <Buttons label="8" click={this.addDigit}/>
        <Buttons label="9" click={this.addDigit}/>
        <Buttons label="*" click={this.setOperation} operation/>
        <Buttons label="4" click={this.addDigit}/>
        <Buttons label="5" click={this.addDigit}/>
        <Buttons label="6" click={this.addDigit}/>
        <Buttons label="-" click={this.setOperation} operation/>
        <Buttons label="1" click={this.addDigit}/>
        <Buttons label="2" click={this.addDigit}/>
        <Buttons label="3" click={this.addDigit}/>
        <Buttons label="+" click={this.setOperation} operation/>
        <Buttons label="0" click={this.addDigit} double/>
        <Buttons label="." click={this.addDigit}/>
        <Buttons label="=" click={this.setOperation} operation/>

       
      </div>
    )
  }
}
