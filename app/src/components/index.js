/**
 * Browser layout
 */
import { html } from 'lit-html';
import NavBar from './_nav';
import Header from './_header'
import InnerMain from './_main';

const App = ( navBar, header, innerMain ) =>
    html`
        <nav class="box-shadow-2">${navBar }</nav>
        <header>${header }</header>
        <main>${innerMain }</main>
        <footer>
            <h3>footer</h3>
        </footer>
`

export default App( NavBar, Header, InnerMain );