import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import AddTravelDestination from './components/AddTravelDestination';
import AllTravelDestination from './components/AllTravelDestination';
import Navbar from './components/Navbar';

function App() {
  return <>
  
  <BrowserRouter>
  <Navbar/>
  <Routes>
  <Route path='/add-travel' element={<AddTravelDestination/>}/>
        <Route path='/add-travel/:id' element={<AddTravelDestination/>}/>
        <Route path='/all-travel' element={<AllTravelDestination/>}/>
        

        <Route path='*' element={<Navigate to={'/all-travel'}/>}/>
  </Routes>
  </BrowserRouter>
  </>
}

export default App;
