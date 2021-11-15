import logo from './logo.svg';
import './App.css';
import AuthProvider from './Home/Context/AuthProvider';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Home/Pages/Login/Login';
import Register from './Home/Pages/Login/Register/Register';
import Home from './Home/Pages/Home/Home';
import Allpackages from './Home/Pages/Home/All PAckages/Allpackages';
import AddService from './Home/Pages/Add Service/AddService';
import PrivateRoute from './Home/Pages/Home/PrivateRoute/PrivateRoute';
import purchase from './Home/Pages/Home/Home Service/Purchase/purchase';
import Purchase from './Home/Pages/Home/Home Service/Purchase/purchase';
import Dashboard from './Home/Pages/Home/Dashboard/Dashboard';
import Error from './Home/Error/Error';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/explore">
              <Allpackages></Allpackages>
            </Route>
            <Route path="/dashboard">
              <Dashboard></Dashboard>
            </Route>


            <PrivateRoute path="/homeservice/:pd">
              <Purchase></Purchase>
            </PrivateRoute>


            <Route path="/addservice">
              <AddService></AddService>
            </Route>
            <Route path="*">
              <Error></Error>
            </Route>

          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
