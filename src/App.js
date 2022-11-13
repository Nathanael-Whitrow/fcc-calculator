import './App.css';
import { useState } from 'react'

function Display(props) {
  return (
    <p id={props.displayID}>{props.display}</p>
  )
}

function Button(props) {
  return (
    <button id={props.buttonID} onClick={props.action} >{props.symbol}</button>
  )
}

function App() {

  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");

  return (
    <div className="App">
      <div className="Container">
        <Display displayID="output" display={output} />
        <Display displayID="display" display={input} />
        <Button buttonID="zero" symbol="0" />
        <Button buttonID="one" symbol="1" />
        <Button buttonID="two" symbol="2" />
        <Button buttonID="three" symbol="3" />
        <Button buttonID="four" symbol="4" />
        <Button buttonID="five" symbol="5" />
        <Button buttonID="six" symbol="6" />
        <Button buttonID="seven" symbol="7" />
        <Button buttonID="eight" symbol="8" />
        <Button buttonID="nine" symbol="9" />
        <Button buttonID="equals" symbol='=' />
        <Button buttonID="add" symbol='+' />
        <Button buttonID="subtract" symbol='-' />
        <Button buttonID="multiply" symbol='*' />
        <Button buttonID="divide" symbol='/' />
        <Button buttonID="decimal" symbol='.' />
        <Button buttonID="clear" symbol="AC" action={() => { setInput('0'); setOutput(''); }} />
      </div>
    </div>
  );
}

export default App;
