import './App.css';

function Display() {
  return (
    <p>Display</p>
  )
}

function Number() {
  return (
    <button>number button</button>
  )
}

function ActionButton() {
  return (
    <button>Action button</button>
  )
}

function App() {
  return (
    <div className="App">
      <div className="Container">
        <Display />
        <Number />
        <ActionButton />
      </div>
    </div>
  );
}

export default App;
