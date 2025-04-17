import React, { Component } from 'react'
import './Calculator.css';
import Buttons from '../components/Buttons';
import Display from '../components/Display';

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory = () => {
    console.log('clearMemory')
    
  }
  setOperation = (operation) => {
    console.log(operation)    
  }
  addDigit = (n) => {
    console.log(n)    
  }



  render() {

    return (
      <div className='calculator'>
        <Display value={555}/>
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
