import './App.css';
import { LoginPage } from './components/Login';
import { PrivateRoute } from './components/PrivateRoute';
import TodoList from './components/TodoList';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            <Router>
              <div>
                <PrivateRoute exact path="/" component={TodoList} />
                <Route path="/login" component={LoginPage} />
              </div>
            </Router>
          </div>
        </div>
      </div>
  );
}

export default App;
