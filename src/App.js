import { useEffect, useState } from 'react'
import Headerbar from './layouts/Headerbar';
import Navbar from './layouts/Navbar';
import './styles/headerbar.css'
import './styles/navbar.css'
import { Switch, Route } from 'react-router-dom'

import Dashboard from './components/Dashboard';
import CreateNew from './components/CreateNew';
import CustomerForm from './components/CustomerForm';
import Users from './components/Users';
import Detail from './components/Detail';

import loginService from './services/login'
import { setToken } from './services/vaccinatedUser';

function App() {

  const [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const result = JSON.parse(loggedUserJSON)
      setLoggedUser(result)
      setToken(result.accessToken)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setLoggedUser(null)
  }

  const handleLogin = () => {
    loginService.login({ email: "root@gmail.com", password: "root" })
    .then(res => {
      setLoggedUser(res)
      window.localStorage.setItem('loggedUser', JSON.stringify(res))
      setToken(res.accessToken)
    })
    .catch(err => {
      console.log("error :", err)
    })
  }

  if(!loggedUser) {
    return(
      <div>
        <button onClick={handleLogin} className="btn">Login</button>
      </div>
    )
  }

  return (
    <div className="App">
      <Headerbar username={loggedUser.user.username} handleLogout={handleLogout} />
      <Navbar />
      <main>
        <Switch>
          <Route path="/new">
            <CreateNew />
          </Route>
          <Route path="/users/:id">
            <Detail />
          </Route>
          <Route path="/customers/create">
            <CustomerForm />
          </Route>
          <Route path="/customers">
            <Users />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
