import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Cadastro from './pages/CreatePoint'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  /* No codigo abaixo esta utilizando o BrowserRouter, Switch, Route para fazer a troca das rotas da nossa aplicação
  o uso do exact={true} é para garantir que a rota só tenha o / */
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} component= {App} />
        <Route path='/cadastro' component= {Cadastro} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
