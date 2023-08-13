import logo from './logo.svg';
import './App.css';
import { Router, Link } from '@reach/router';
import AllTrucks from './views/AllTrucks';
import OneTruck from './views/OneTruck';
import NewTruck from './views/NewTruck';
import EditTruck from './views/EditTruck';
import NavBar from './components/NavBar';

function App() {
  
  return (
    <div className="container">
      <NavBar/>
      <Router>
        <AllTrucks path="/"/>
        <OneTruck path="/truck/:id"/>
        <NewTruck path="/truck/new"/>
        <EditTruck path="/truck/:id/edit"/>
      </Router>
    </div>
  );
}

export default App;
