import Form from '../form';
import './App.css';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontSize: 24
  }
});

function App(props) {
  return (
    <article className="App">
      <ThemeProvider theme={theme}>
        <Form data={props.data}/>
      </ThemeProvider>
    </article>
  );
}

export default App;
