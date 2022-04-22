import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Entries from './components/Entries';
import NewEntries from './components/NewEntries';
import EditEntries from './components/EditEntries';
import DeleteEntries from './components/DeleteEntries';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' exact element={<Entries/>}/>
        <Route path='/new' element={<NewEntries/>}/>
        <Route path='/edit/' element={<EditEntries/>}>
          <Route path=':id' element={<EditEntries/>}/>
        </Route>
        <Route path='/delete' element={<DeleteEntries/>}/>
      </Routes>
    </Router>
  );
}

export default App;