import './App.css';
import { useState } from 'react'

function Display(props) {
  return (
    <p id={props.displayID}>{props.display}</p>
  )
}

function DigitButton(props) {
  return (
    <button
      id={props.buttonID}
      onClick={() => props.action(props.symbol)}
    >
      {props.symbol}
    </button>
  )
}

function ActionButton(props) {
  return (
    <button
      id={props.buttonID}
      onClick={() => props.action(props.symbol)}
    >
      {props.symbol}
    </button>
  )
}

function App() {

  const [input, setInput] = useState('0');

  function appendDigit(num) {
    if (input === '0') {
      setInput(num);
    }
    else {
      setInput(input + num);
    }
    return;
  }

  function appendSymbol(symbol) {
    if (input === '0') {
      return;
    }
    else if (/[0-9]/.test(input.at(-1))) {
      setInput(input + symbol);
    }
    // Must be a symbol: * / - +
    // Overwrite the existing symbol if the previous char is a number
    else if (/[0-9]/.test(input.at(-2))) {
      setInput(input.substring(0, input.length - 1).concat(symbol));
    }
    return;
  }

  function appendMinus(minus) {
    if (input === '0') {
      return;
    }
    else if (/[0-9]/.test(input.at(-1))) {
      setInput(input + minus);
    }
    // Must be a symbol: * / - +
    // If it's * / + AND previous was a digit, append a minus
    else if (/[0-9]/.test(input.at(-2)) &&
      input.at(-1) !== '-') {
      setInput(input + minus);
    }
    // Last char must be a - so do nothing
    return;
  }

  function appendDecimal(decimal) {
    // Get the last number
    let number = input.match(/[0-9.]+$/g);
    if (number) {
      if (! /\./g.test(...number)) {
        setInput(input + decimal);
      }
      return;
    }
    return;
  }

  function calculate(symbol) {
    // Split string into components
    const stringParts = input.match(/-?[0-9.]+|[*/+]/g);
    const numberParts = stringParts.map(
      (el) => parseFloat(el) ? parseFloat(el) : el
    );

    // Loop over parts with a reducer?
    function multiplyReducer(prev, currentValue, i, array) {
      if (array[i - 1] === '*') {
        const newValue = prev[i - 2] * currentValue;
        const newArray = prev.slice(0, i - 2);
        return newArray.concat(newValue);
      }
      else {
        return prev.concat(currentValue);
      }
    }

    function divideReducer(prev, currentValue, i, array) {
      if (array[i - 1] === '/') {
        const newValue = prev[i - 2] / currentValue;
        const newArray = prev.slice(0, i - 2);
        return newArray.concat(newValue);
      }
      else {
        return prev.concat(currentValue);
      }
    }

    function addReducer(prev, currentValue) {
      return (currentValue === '+') ? prev : prev + currentValue;
    }

    const multiplied = numberParts.reduce(multiplyReducer, []);
    const divided = multiplied.reduce(divideReducer, []);
    const added = divided.reduce(addReducer);
    setInput(added.toString());
    return;
  }

  return (
    <div className='App'>
      <div className='Container'>
        <Display displayID='display' display={input} />
        <DigitButton buttonID='zero' symbol='0' action={appendDigit} />
        <DigitButton buttonID='one' symbol='1' action={appendDigit} />
        <DigitButton buttonID='two' symbol='2' action={appendDigit} />
        <DigitButton buttonID='three' symbol='3' action={appendDigit} />
        <DigitButton buttonID='four' symbol='4' action={appendDigit} />
        <DigitButton buttonID='five' symbol='5' action={appendDigit} />
        <DigitButton buttonID='six' symbol='6' action={appendDigit} />
        <DigitButton buttonID='seven' symbol='7' action={appendDigit} />
        <DigitButton buttonID='eight' symbol='8' action={appendDigit} />
        <DigitButton buttonID='nine' symbol='9' action={appendDigit} />

        <ActionButton buttonID='decimal' symbol='.' action={appendDecimal} />

        <ActionButton buttonID='add' symbol='+' action={appendSymbol} />
        <ActionButton buttonID='multiply' symbol='*' action={appendSymbol} />
        <ActionButton buttonID='divide' symbol='/' action={appendSymbol} />

        <ActionButton buttonID='subtract' symbol='-' action={appendMinus} />

        <ActionButton buttonID='equals' symbol='=' action={calculate} />
        <ActionButton buttonID='clear' symbol='AC' action={() => setInput('0')} />
      </div>
    </div>
  );
}

export default App;
