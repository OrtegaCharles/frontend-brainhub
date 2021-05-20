import './App.css';
import User from './components/User';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserForm from './components/UserForm';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={User}/>
            <Route path='/create_user' exact component={UserForm}/>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
