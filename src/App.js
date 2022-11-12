import './App.css';

function Display(props) {
  return (
    <p id={props.displayID}>Display</p>
  )
}

function Button(props) {
  return (
    <button id={props.buttonID} >{props.symbol}</button>
  )
}

function App() {
  return (
    <div className="App">
      <div className="Container">
        <Display displayID="display" />
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
      </div>
    </div>
  );
}

export default App;
