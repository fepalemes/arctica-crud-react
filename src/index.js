import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Editar from './components/Editar';
import Adicionar from './components/Adicionar';
import Visualizar from './components/Visualizar';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/editar/:id' component={Editar} />
        <Route path='/adicionar' component={Adicionar} />
        <Route path='/visualizar/:id' component={Visualizar} />
      </div>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();