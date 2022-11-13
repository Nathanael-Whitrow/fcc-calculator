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
      onClick={props.action}
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
        <ActionButton buttonID='equals' symbol='=' />
        <ActionButton buttonID='add' symbol='+' />
        <ActionButton buttonID='subtract' symbol='-' />
        <ActionButton buttonID='multiply' symbol='*' />
        <ActionButton buttonID='divide' symbol='/' />
        <ActionButton buttonID='decimal' symbol='.' />
        <ActionButton buttonID='clear' symbol='AC' action={() => setInput('0')} />
      </div>
    </div>
  );
}

export default App;
