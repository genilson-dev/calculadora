import React, { Component } from "react";
import "./Calculator.css";
import Buttons from "../components/Buttons";
import Display from "../components/Display";

// Estado inicial da calculadora
const inicialState = {
  displayValue: "0",    // Valor exibido no display
  clearDisplay: false,  // Indica se o display deve ser limpo
  operation: null,      // Operação atual (+, -, *, /)
  values: [0, 0],       // Array com os dois valores para operação
  current: 0,           // Índice do valor atual sendo editado (0 ou 1)
};

export default class Calculator extends Component {
  state = { ...inicialState };

  constructor(props) {
    super(props);
    // Bind dos métodos para garantir o contexto correto do this
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  // Limpa a memória da calculadora, resetando para o estado inicial
  clearMemory = () => {
    this.setState({ ...inicialState });
  };

  // Gerencia as operações matemáticas
  setOperation = (operation) => {
    if (this.state.current === 0) {
      // Primeiro número: apenas armazena a operação
      this.setState({ 
        operation, 
        current: 1, 
        clearDisplay: true 
      });
    } else {
      // Segundo número: realiza o cálculo
      const equals = operation === "=";
      const currentOperation = this.state.operation;
      const values = [...this.state.values];

      try {
        // Verifica se o primeiro valor é válido
        if (isNaN(values[0]) || !isFinite(values[0])) {
          this.clearMemory();
          return;
        }

        // Realiza a operação matemática
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
        values[1] = 0;

        this.setState({
          displayValue: values[0],
          operation: equals ? null : operation,
          current: equals ? 0 : 1,
          clearDisplay: !equals,
          values,
        });
      } catch (e) {
        // Em caso de erro, mantém o primeiro valor
        values[0] = this.state.values[0];
        this.setState({ values });
      }
    }
  };

  // Adiciona dígitos ao número atual
  addDigit = (n) => {
    // Impede múltiplos pontos decimais
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    // Determina se deve limpar o display
    const clearDisplay = this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;

    this.setState({ 
      displayValue, 
      clearDisplay: false 
    });

    // Atualiza o valor no array de valores (exceto para ponto decimal)
    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  };

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        {/* Botões da calculadora */}
        <Buttons label="AC" click={this.clearMemory} triple />
        <Buttons label="/" click={this.setOperation} operation />
        <Buttons label="7" click={this.addDigit} />
        <Buttons label="8" click={this.addDigit} />
        <Buttons label="9" click={this.addDigit} />
        <Buttons label="*" click={this.setOperation} operation />
        <Buttons label="4" click={this.addDigit} />
        <Buttons label="5" click={this.addDigit} />
        <Buttons label="6" click={this.addDigit} />
        <Buttons label="-" click={this.setOperation} operation />
        <Buttons label="1" click={this.addDigit} />
        <Buttons label="2" click={this.addDigit} />
        <Buttons label="3" click={this.addDigit} />
        <Buttons label="+" click={this.setOperation} operation />
        <Buttons label="0" click={this.addDigit} double />
        <Buttons label="." click={this.addDigit} />
        <Buttons label="=" click={this.setOperation} operation />
      </div>
    );
  }
}

