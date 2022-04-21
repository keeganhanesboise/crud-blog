import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Entries from './components/Entries';
import NewEntries from './components/NewEntries';
import EditEntries from './components/EditEntries';
import DeleteEntries from './components/DeleteEntries';

function App() {
  return (
    <Router>
      <div className='App'>
        <h1>Keegan's Blog</h1>
      </div>
      <Routes>
        <Route path='/' exact element={<Entries/>}/>
        <Route path='/new' element={<NewEntries/>}/>
        <Route path='/edit/:id' element={<EditEntries/>}/>
        <Route path='/delete' element={<DeleteEntries/>}/>
      </Routes>
    </Router>
  );
}

export default App;