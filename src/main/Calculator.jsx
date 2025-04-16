import React, { Component } from 'react'
import './Calculator.css';
import Buttons from '../components/Buttons';

export default class Calculator extends Component {
  render() {
    return (
      <div className='calculator'>
        <Buttons label="AC"/>
        <Buttons label="/"/>
        <Buttons label="7"/>
        <Buttons label="8"/>
        <Buttons label="9"/>
        <Buttons label="X"/>
        <Buttons label="4"/>
        <Buttons label="5"/>
        <Buttons label="6"/>
        <Buttons label="-"/>
        <Buttons label="1"/>
        <Buttons label="2"/>
        <Buttons label="3"/>
        <Buttons label="+"/>
        <Buttons label="0"/>
        <Buttons label="."/>
        <Buttons label="="/>

       
      </div>
    )
  }
}
