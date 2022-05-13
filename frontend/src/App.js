import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import SearchPage from './Components/SearchPage';
import LandingPage from './Components/LandingPage';
import AdminLogin from './Components/AdminLoginPage';
import AdminDashBoard from './Components/AdminDashBoard';
import AdminAddFilght from './Components/AdminAddFilght';
import BookPage from './Components/BookPage';
import SuccessPage from './Components/SuccessPage';
import UserBookings from './Components/UserBookings';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Switch>
        
          <Route exact path ='/'>
            <LandingPage/>
          </Route>

          <Route exact path = '/signup'>
            <SignupPage />
          </Route>

          <Route exact path = '/login'>
            <LoginPage />
          </Route>

          <Route exact path = '/search'>
            <SearchPage />
          </Route>

          <Route exact path = "/adminlogin">
            <AdminLogin />
          </Route>

          <Route exact path ="/admindashboard">
            <AdminDashBoard />
          </Route>

          <Route exact path = "/addflight">
            <AdminAddFilght />  
          </Route>

          <Route exact path = "/booking">
            <BookPage />
          </Route>

          <Route exact path = "/success">
            <SuccessPage />
          </Route>

          <Route exact path = "/mybookings">
            <UserBookings />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
