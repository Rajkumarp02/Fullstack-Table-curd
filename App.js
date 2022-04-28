import {BrowserRouter as Routes,Route,Router} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import {createBrowserHistory} from 'history';
import Add2 from './Add2';

function App() {
  //const history=createBrowserHistory();
  return (
     <div class="container-fluid" >
      <Add2></Add2>
    {/* <ToastContainer position='top-center'/>
    <div>
    <Router history={history}>
    <Routes>
     <Route  path="/" component={Home} />
     <Route path="/addStudent" component={Add2} />
     <Route path="/update/:id" component={Add2} />
     </Routes>
     </Router> 
     </div>*/}
     </div>
    
  );
          
}

export default App;
