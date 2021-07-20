import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { OnlinePage } from './pages/OnlinePage';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/online" component={OnlinePage} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
