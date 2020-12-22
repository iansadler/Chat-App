import {Route, Switch /*, Link*/} from 'react-router-dom'
import Login from './routes/login'
import Home from './routes/home'

const App = () => (
  <div>
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  </div>
)

export default App
