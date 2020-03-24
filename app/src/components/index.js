/**
 * Browser layout
 */
import { html } from 'lit-html';
import NavBar from './_nav';
import Header from './_header'
import InnerMain from './_main';
import GetUserName from './_username-overlay';
import { byTag } from '../_declarations';

const App = ( navBar, header, innerMain ) => {

    const
        main = byTag( 'main' )[ 0 ],

        checkUserId = localStorage.getItem( 'user_id' ),
        userNameExists = !( checkUserId ?? null );

    console.log( 'main: ', main );

    return html`
        <div>${GetUserName( userNameExists ) }</div>
        <nav class="box-shadow-2">${navBar }</nav>
        <header>${header }</header>
        <main></main>
        <footer>
            <h3>footer</h3>
        </footer>
`}

export default App( NavBar, Header, InnerMain );