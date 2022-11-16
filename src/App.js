import './App.css';
import { useState } from 'react'

function Display(props) {
  // Can call hooks here
  return (
    <p id={props.displayID}>{props.display}</p>
  )
}

function Button(props) {
  // Can call hooks here
  return (
    <button
      id={props.buttonID}
      onClick={() => props.action(props.symbol,
        props.state.inInput,
        props.state.setInInput,
        props.state.isFresh,
        props.state.setIsFresh)}
    >
      {props.symbol}
    </button>
  )
}

function App() {

  function appendDigit(num, state, setState, fresh, setFresh) {
    if (!fresh) {
      state = '0';
      setFresh(true);
    }
    // Initial state
    if (state === '0') {
      setState(num);
    }
    // Careful of things like -0000
    else if (state === '-' && num === '0') {
      return;
    }
    // No real limitations on when adding more digits is allowed
    else {
      setState(state + num);
    }
    return;
  }

  function appendSymbol(symbol, state, setState) {
    // Don't add operator to initial state
    if (state === '0') {
      return;
    }
    // Is the last char a digit?
    else if (/[0-9.]/.test(state.at(-1))) {
      setState(state + symbol);
    }
    // Last char must be an operator: * / - +
    // Overwrite the existing symbol if the previous char is a digit
    // (This allows for the next number to be a negative)
    else if (/[0-9.]/.test(state.at(-2))) {
      setState(state.substring(0, state.length - 1).concat(symbol));
    }
    // Check for last two chars being operators
    else if (/[*/+-]/.test(state.at(-2))) {
      setState(state.substring(0, state.length - 2).concat(symbol));
    }
    return;
  }

  function appendMinus(minus, state, setState) {
    // Should be able to start with a negative number
    if (state === '0') {
      setState(minus);
      return;
    }
    else if (/[0-9.]/.test(state.at(-1))) {
      setState(state + minus);
    }
    // Must be a symbol: * / - +
    // If it's * / + AND previous was a digit, append a minus
    else if (/[0-9.]/.test(state.at(-2)) &&
      state.at(-1) !== '-') {
      setState(state + minus);
    }
    // Last char must be a - so do nothing
    return;
  }

  function appendDecimal(decimal, state, setState, fresh, setFresh) {
    if (!fresh) {
      state = '0';
      setFresh(true);
    }
    // Get the entire last number
    let number = state.match(/[0-9.]+$/g);
    if (number) {
      // Check it doesn't already have a decimal
      if (! /\./g.test(number[0])) {
        setState(state + decimal);
      }
    }
    // The number is a symbol
    else {
      setState(state + '0' + decimal);
    }
    return;
  }

  function calculate(symbol, state, setState, fresh, setFresh) {
    console.log(state, "The state handed to calculate");
    function multiplyReducer(prev, currentValue, i, array) {
      if (array[i - 1] === '*') {
        const newValue = prev[prev.length - 2] * currentValue;
        const newArray = prev.slice(0, prev.length - 2);
        return newArray.concat(newValue);
      }
      else {
        return prev.concat(currentValue);
      }
    }

    function divideReducer(prev, currentValue, i, array) {
      if (array[i - 1] === '/') {
        const newValue = prev[prev.length - 2] / currentValue;
        const newArray = prev.slice(0, prev.length - 2);
        return newArray.concat(newValue);
      }
      else {
        return prev.concat(currentValue);
      }
    }

    setState(state
      .match(/-?[0-9.]+|[*/+]/g)  // Split string into array
      .map((el) => parseFloat(el) ? parseFloat(el) : el)  // convert to numbers
      .reduce(multiplyReducer, []) // do mulitplication
      .reduce(divideReducer, []) // do division
      .reduce((prev, cur) => (cur === '+') ? prev : prev + cur) // add everything else
      .toString() // back to string
    );
    setFresh(false);
    return;
  }

  function clear(symbol, state, setState) {
    setState('0');
    return;
  }

  // The only state we need...
  const [input, setInput] = useState('0');
  const [fresh, setFresh] = useState(true);
  const stateStuff = {
    inInput: input,
    setInInput: setInput,
    isFresh: fresh,
    setIsFresh: setFresh,
  }

  // Can call hooks here
  console.log(input, "The input before render");

  return (
    <div className='App'>
      <div className='Container'>
        <Display displayID='display' display={input} />
        <Button state={stateStuff} buttonID='zero' symbol='0' action={appendDigit} />
        <Button state={stateStuff} buttonID='one' symbol='1' action={appendDigit} />
        <Button state={stateStuff} buttonID='two' symbol='2' action={appendDigit} />
        <Button state={stateStuff} buttonID='three' symbol='3' action={appendDigit} />
        <Button state={stateStuff} buttonID='four' symbol='4' action={appendDigit} />
        <Button state={stateStuff} buttonID='five' symbol='5' action={appendDigit} />
        <Button state={stateStuff} buttonID='six' symbol='6' action={appendDigit} />
        <Button state={stateStuff} buttonID='seven' symbol='7' action={appendDigit} />
        <Button state={stateStuff} buttonID='eight' symbol='8' action={appendDigit} />
        <Button state={stateStuff} buttonID='nine' symbol='9' action={appendDigit} />
        <Button state={stateStuff} buttonID='decimal' symbol='.' action={appendDecimal} />
        <Button state={stateStuff} buttonID='add' symbol='+' action={appendSymbol} />
        <Button state={stateStuff} buttonID='multiply' symbol='*' action={appendSymbol} />
        <Button state={stateStuff} buttonID='divide' symbol='/' action={appendSymbol} />
        <Button state={stateStuff} buttonID='subtract' symbol='-' action={appendMinus} />
        <Button state={stateStuff} buttonID='equals' symbol='=' action={calculate} />
        <Button state={stateStuff} buttonID='clear' symbol='AC' action={clear} />
      </div>
    </div>
  );
}

export default App;
