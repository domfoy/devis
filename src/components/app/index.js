import Form from '../form';
import './App.css';

function App(props) {
  return (
    <article className="App">
      <Form data={props.data}/>
    </article>
  );
}

export default App;
