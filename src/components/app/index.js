import Form from '../form';
import './App.css';

function App(props) {
  return (
    <article className="App">
      <Form data={props.data}/>
      <form
        action="/wp-admin/admin-ajax.php?action=devis_send_quote_mail"
        method="POST"
      >
        <label for="fname">First name:</label>
        <input type="text" id="fname" name="fname"></input>
        <input type="submit" value="Submit"></input>
      </form>
    </article>
  );
}

export default App;
