/**
 * Browser layout
 */
import { html } from 'lit-html';
import NavBar from './_nav';
import Header from './_header'
import InnerMain from './_main';
import GetUserName from '../services/username.service.mjs';

const App = ( navBar, header, innerMain ) => {

    const
        checkUserId = localStorage.getItem( 'user_id' ),
        userNameExists = !( checkUserId ?? null )

    return html`
        <div>${GetUserName( userNameExists ) }</div>
        <nav class="box-shadow-2">${navBar }</nav>
        <header>${header }</header>
        <main>${innerMain }</main>
        <footer>
            <h3>footer</h3>
        </footer>
`}

export default App( NavBar, Header, InnerMain );