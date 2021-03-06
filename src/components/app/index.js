import Form from '../form';

import data from './data';
import './App.css';

// const useStyles = makeStyles((theme) => ({
//   button: {
//     display: 'flex',
//     marginTop: theme.spacing(2),
//   }
// }));


function App() {
  return (
    <article className="App">
      <Form data={data}/>
    </article>
  );
}

export default App;
