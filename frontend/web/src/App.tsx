import React, {useState} from 'react';
import Header from './Header';
import Home from './pages/home'; //importa a pagina home
import './App.css'
//JSX: Sintaxe de xml dentro do javascript.

function App() {
  // const [counter, setCounter] = useState(0); // o use State sempre irá retornar um array [valor do estado, função para atualizar o valor do estado]
  return (
   <Home/>
  );
  }

export default App;
