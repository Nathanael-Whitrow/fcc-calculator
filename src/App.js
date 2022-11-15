import './App.css';
import { useState } from 'react'

function Display(props) {
  return (
    <p id={props.displayID}>{props.display}</p>
  )
}

function Button(props) {
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

  // The only state we need...
  const [input, setInput] = useState('0');
  const [fresh, setFresh] = useState(true);

  function appendDigit(num) {
    if (fresh) {
      clear();
      setFresh(false);
    }
    // Initial state
    if (input === '0') {
      setInput(num);
    }
    // Careful of things like -0000
    else if (input === '-' && num === '0') {
      return;
    }
    // No real limitations on when adding more digits is allowed
    else {
      setInput(input + num);
    }
    return;
  }

  function appendSymbol(symbol) {
    // Don't add operator to initial state
    if (input === '0') {
      return;
    }
    // Is the last char a digit?
    else if (/[0-9.]/.test(input.at(-1))) {
      setInput(input + symbol);
    }
    // Last char must be an operator: * / - +
    // Overwrite the existing symbol if the previous char is a digit
    // (This allows for the next number to be a negative)
    else if (/[0-9.]/.test(input.at(-2))) {
      setInput(input.substring(0, input.length - 1).concat(symbol));
    }
    // Check for last two chars being operators
    else if (/[*/+-]/.test(input.at(-2))) {
      setInput(input.substring(0, input.length - 2).concat(symbol));
    }
    return;
  }

  function appendMinus(minus) {
    // Should be able to start with a negative number
    if (input === '0') {
      setInput(minus);
      return;
    }
    else if (/[0-9.]/.test(input.at(-1))) {
      setInput(input + minus);
    }
    // Must be a symbol: * / - +
    // If it's * / + AND previous was a digit, append a minus
    else if (/[0-9.]/.test(input.at(-2)) &&
      input.at(-1) !== '-') {
      setInput(input + minus);
    }
    // Last char must be a - so do nothing
    return;
  }

  function appendDecimal(decimal) {
    // existing state and what's been clicked:
    // What's been clicked? decimal
    // Existing state?
    // only minus sign
    // last digit is a zero
    // last char is a symbol...


    let number = input.match(/[0-9.]+$/g);
    if (number) {
      // Check it doesn't already have a decimal
      if (! /\./g.test(number[0])) {
        setInput(input + decimal);
      }
    }
    // It's a symbol
    else {
      setInput(input + '0' + decimal);
    }
    return;
  }

  function calculate(symbol) {
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

    setInput(input
      .match(/-?[0-9.]+|[*/+]/g)  // Split string into array
      .map((el) => parseFloat(el) ? parseFloat(el) : el)  // convert to numbers
      .reduce(multiplyReducer, []) // do mulitplication
      .reduce(divideReducer, []) // do division
      .reduce((prev, cur) => (cur === '+') ? prev : prev + cur) // add everything else
      .toString() // back to string
    );
    setFresh(true);
    return;
  }

  function clear(symbol) {
    setInput('0');
    return;
  }

  return (
    <div className='App'>
      <div className='Container'>
        <Display displayID='display' display={input} />
        <Button buttonID='zero' symbol='0' action={appendDigit} />
        <Button buttonID='one' symbol='1' action={appendDigit} />
        <Button buttonID='two' symbol='2' action={appendDigit} />
        <Button buttonID='three' symbol='3' action={appendDigit} />
        <Button buttonID='four' symbol='4' action={appendDigit} />
        <Button buttonID='five' symbol='5' action={appendDigit} />
        <Button buttonID='six' symbol='6' action={appendDigit} />
        <Button buttonID='seven' symbol='7' action={appendDigit} />
        <Button buttonID='eight' symbol='8' action={appendDigit} />
        <Button buttonID='nine' symbol='9' action={appendDigit} />
        <Button buttonID='decimal' symbol='.' action={appendDecimal} />
        <Button buttonID='add' symbol='+' action={appendSymbol} />
        <Button buttonID='multiply' symbol='*' action={appendSymbol} />
        <Button buttonID='divide' symbol='/' action={appendSymbol} />
        <Button buttonID='subtract' symbol='-' action={appendMinus} />
        <Button buttonID='equals' symbol='=' action={calculate} />
        <Button buttonID='clear' symbol='AC' action={clear} />
      </div>
    </div>
  );
}

export default App;
