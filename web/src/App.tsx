import React, { useState } from 'react';
import './App.css';

import Routes from './routes';

function App() {
  return (
    <Routes />
  );
}

export default App;

// JSX: Sintaxe de XML dentro do JavaScript

/* Dica para ganhar produtividade no desenvolvimento em HTML
  * Usar plugin Emmet (que é um plugin padrão do VSCode)
  * Exemplo de uso:
  * Digite: div#app>ul>li*5
  * Isso criará uma div com id=app, e dentro dela uma ul com 5 li
*/