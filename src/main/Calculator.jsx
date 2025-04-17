import React, { Component } from "react";
import "./Calculator.css";
import Buttons from "../components/Buttons";
import Display from "../components/Display";

const inicialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
  result: 0,
};

export default class Calculator extends Component {
  state = { ...inicialState };
  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory = () => {
    this.setState({ ...inicialState });
  };

  setOperation = (operation) => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;
      const values = [...this.state.values];
      try {
        if (isNaN(values[0]) || !isFinite(values[0])) {
          this.clearMemory()
        return
        }
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
        values[1] = 0;
      } catch (e) {
        values[0] = this.state.values[0];        
      }
      values[1] = 0;
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  };

  addDigit = (n) => {
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });
    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values]; // Clonando o array, ou, peguando o que ja tem e colocando o novo valor
      values[i] = newValue; // Colocando o novo valor no array
      this.setState({ values });
      console.log(values);
    }
  };

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
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

// import React, { Component } from "react";
// import "./Calculator.css";
// import Buttons from "../components/Buttons";
// import Display from "../components/Display";

// // Estado inicial da calculadora
// const inicialState = {
//   displayValue: "0", // Valor exibido no display
//   clearDisplay: false, // Indica se o display deve ser limpo antes do próximo número
//   operation: null, // Armazena a operação atual (+, -, *, /, etc.)
//   values: [0, 0], // Armazena os valores a serem operados
//   current: 0, // Indica qual valor (0 ou 1) está sendo editado no momento
// };

// export default class Calculator extends Component {
//   // Inicia o estado da calculadora com o estado inicial definido
//   state = { ...inicialState };

//   // Método para limpar todos os dados e redefinir o estado
//   clearMemory = () => {
//     this.setState({ ...inicialState });
//   };

//   // Define ou aplica a operação matemática
//   setOperation = (operation) => {
//     if (this.state.current === 0) {
//       // Se for o primeiro valor, apenas define a operação e prepara o próximo valor
//       this.setState({
//         operation,
//         current: 1,
//         clearDisplay: true, // Limpa o display para inserir o segundo número
//       });
//     } else {
//       // Se já temos dois valores, realiza o cálculo
//       this.setState((prevState) => {
//         const { values, operation: currentOperation } = prevState; // Recupera o estado anterior
//         const updatedValues = [...values]; // Clona o array para evitar mutações diretas

//         // Realiza o cálculo baseado na operação atual
//         switch (currentOperation) {
//           case "+":
//             updatedValues[0] = updatedValues[0] + updatedValues[1];
//             break;
//           case "-":
//             updatedValues[0] = updatedValues[0] - updatedValues[1];
//             break;
//           case "*":
//             updatedValues[0] = updatedValues[0] * updatedValues[1];
//             break;
//           case "/":
//             updatedValues[0] =
//               updatedValues[1] !== 0 ? updatedValues[0] / updatedValues[1] : 0; // Evita divisão por zero
//             break;
//           default:
//             break;
//         }

//         updatedValues[1] = 0; // Reseta o segundo valor para 0

//         return {
//           values: updatedValues, // Atualiza os valores
//           displayValue: updatedValues[0], // Exibe o resultado no display
//           operation: operation === "=" ? null : operation, // Define a próxima operação, ou encerra se for "="
//           current: operation === "=" ? 0 : 1, // Retorna para o primeiro valor, se "=" foi pressionado
//           clearDisplay: operation !== "=", // Limpa o display, se necessário
//         };
//       });
//     }
//   };

//   // Adiciona dígitos ao número atual
//   addDigit = (n) => {
//     // Evita múltiplos pontos decimais
//     if (n === "." && this.state.displayValue.includes(".")) {
//       return;
//     }

//     const clearDisplay =
//       this.state.displayValue === "0" || this.state.clearDisplay; // Limpa o display se necessário
//     const currentValue = clearDisplay ? "" : this.state.displayValue; // Determina o valor atual
//     const displayValue = currentValue + n; // Adiciona o dígito ao número exibido

//     this.setState({ displayValue, clearDisplay: false }); // Atualiza o valor exibido no display

//     if (n !== ".") {
//       // Atualiza o valor no array de valores
//       const i = this.state.current; // Índice do valor atual
//       const newValue = parseFloat(displayValue); // Converte o valor exibido em número
//       const values = [...this.state.values]; // Clona o array de valores
//       values[i] = newValue; // Atualiza o valor atual
//       this.setState({ values }); // Salva os valores no estado
//     }
//   };

//   // Renderiza a interface da calculadora
//   render() {
//     return (
//       <div className="calculator">
//         {/* Componente para exibir o valor atual no display */}
//         <Display value={this.state.displayValue} />
//         {/* Botões da calculadora */}
//         <Buttons label="AC" click={this.clearMemory} triple />
//         <Buttons label="/" click={() => this.setOperation("/")} operation />
//         <Buttons label="7" click={() => this.addDigit("7")} />
//         <Buttons label="8" click={() => this.addDigit("8")} />
//         <Buttons label="9" click={() => this.addDigit("9")} />
//         <Buttons label="*" click={() => this.setOperation("*")} operation />
//         <Buttons label="4" click={() => this.addDigit("4")} />
//         <Buttons label="5" click={() => this.addDigit("5")} />
//         <Buttons label="6" click={() => this.addDigit("6")} />
//         <Buttons label="-" click={() => this.setOperation("-")} operation />
//         <Buttons label="1" click={() => this.addDigit("1")} />
//         <Buttons label="2" click={() => this.addDigit("2")} />
//         <Buttons label="3" click={() => this.addDigit("3")} />
//         <Buttons label="+" click={() => this.setOperation("+")} operation />
//         <Buttons label="0" click={() => this.addDigit("0")} double />
//         <Buttons label="." click={() => this.addDigit(".")} />
//         <Buttons label="=" click={() => this.setOperation("=")} operation />
//       </div>
//     );
//   }
// }

