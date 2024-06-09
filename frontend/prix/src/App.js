
import './App.css';
import Reports from './components/reports';
import Appointments from './components/appointments';
import Landing from './components/landing';
import Home from './components/home';
import {Route,Routes} from 'react-router-dom'
import Signin1 from './components/signin1';
import Signin2 from './components/signin2';
import Login1 from './components/login1';
import Dochome from './components/dochome';

import Login2 from './components/login2';
function App() {
  return (
    <div className="App">

 <Routes>
 <Route path='/' element = {<Landing/>}/>
  <Route path='/reports' element={<Reports/>}/>
  <Route path='/appointments' element={<Appointments/>}/>
  <Route path='/home' element={<Home/>}/>
  <Route path = '/signin1' element = {<Signin1/>}/>
  <Route path = '/signin2' element = {<Signin2/>}/>
  <Route path='/login1' element={<Login1/>} />
  <Route path='/dochome' element={<Dochome/>} /> 
  <Route path='/login2' element={<Login2/>} /> 
 </Routes>
    </div>
  );
}

export default App;
