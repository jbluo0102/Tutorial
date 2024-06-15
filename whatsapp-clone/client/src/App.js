import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [id, setId] = useLocalStorage("id");

  return (
    <div className="App">
      {id ? <Dashboard id={id} /> : <Login onIdSubmit={setId} />}
    </div>
  );
}

export default App;
