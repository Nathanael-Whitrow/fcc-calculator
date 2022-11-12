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
        <Button numberID="zero" symbol="0" />
        <Button buttonID="equals" symbol='=' />
        <Button buttonID="add" symbol='+' />
      </div>
    </div>
  );
}

export default App;
