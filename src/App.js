import sample from "./data/sample.json";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello world</p>
        <ul>
          {sample.map((item, index) => (
            <li key={index}>{JSON.stringify(item.name)}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
