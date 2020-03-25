/**
 * Browser layout
 */

import Navbar from './_nav';
import Header from './_header';
import OpponentList from './_opponents';
import EnterUserName from './_user-name';
import Footer from './_footer';
import { html, render } from 'lit-html';
import { byTag } from '../_declarations';

const NavBarTitle = 'Movie Trivia';

const InitialHeader = 'Lobby';

const FooterTitle = 'FooterText';


const App = new AppController();

function AppController () {

    this.navBar;

    this.header;

    this.main;

    this.footer;

    this.loadNavbar = ( navBar ) => render( navBar, this.navBar );

    this.loadHeader = ( header ) => render( header, this.header );

    this.loadMain = ( main ) => render( main, this.main );

    this.loadFooter = ( footer ) => render( footer, this.footer );

    this.initialize = function () {

        this.navBar = byTag( 'nav' )[ 0 ];

        this.header = byTag( 'header' )[ 0 ];

        this.main = byTag( 'main' )[ 0 ];

        this.footer = byTag( 'footer' )[ 0 ];

        loadComponents();
    };
}

function loadComponents () {

    const navBar = new Navbar( App, NavBarTitle );

    const header = new Header( App, InitialHeader );

    const opponents = new OpponentList( App );

    const footer = new Footer( App, FooterTitle );

    const checkUser = localStorage.getItem( 'user_id' ) ?? null;

    App.loadNavbar( navBar );

    App.loadHeader( header );

    checkUser
        ? App.loadMain( opponents )
        : App.loadMain( EnterUserName() );

    App.loadFooter( footer, FooterTitle );
}

export default App;