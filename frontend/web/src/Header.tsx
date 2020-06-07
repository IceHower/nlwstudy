import React from 'react';

interface HeaderProps { //É a forma para definir a tipagem de um objeto
    title: string;
}
//No codigo abaixo definimos  definimos uma constante que recebe uma função e uma propriedade vindo la do app.tsx e retorna em html o title da propriedade
const Header: React.FC<HeaderProps> = (props) => {
    return(
        <header>
            <h1>{props.title}</h1>
        </header>
    );
}

export default Header;