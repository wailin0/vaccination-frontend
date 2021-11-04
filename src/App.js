import { Switch, Route, Redirect } from 'react-router-dom'
import Landing from './components/Landing';
import Admin from './Admin'
import DetailQR from './components/DetailQR';
import Login from './components/Login';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/landing">
          <Landing />
        </Route>
        <Route path="/users/:id">
          <DetailQR />
          </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Redirect to="/landing" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
