/**
 * Browser layout
 */

import Navbar from './_nav';
import Header from './_header';
import OpponentList from './_opponents';
import EnterUserName from './_user-name';
import Footer from './_footer';
import { html, render } from 'lit-html';
import { byTag } from '../utils/web-tools';

const NavBarTitle = 'Movie Trivia';
const InitialHeader = 'Lobby';
const FooterTitle = 'FooterText';

const App = new AppController();

function AppController () {

    this.navBarContainer; // container from the app frame
    this.navBarComponent; // component to render in container

    this.headerContainer; // container from the app frame
    this.headerComponent; // component to render in container

    this.mainContainer; // container from the app frame
    this.mainComponent; // component to render in container

    this.footerContainer; // container from the app frame
    this.footerComponent; // component to render in container

    /** RENDER METHODS */
    this.renderNavbar = () => render( this.navBarComponent, this.navBarContainer );
    this.renderHeader = () => render( this.headerComponent, this.headerContainer );
    this.renderMain = () => render( this.mainComponent, this.mainContainer );
    this.renderFooter = () => render( this.footerComponent, this.footerContainer );

    this.renderAll = function () {
        this.renderNavbar();
        this.renderHeader();
        this.renderMain();
        this.renderFooter();
    };

    this.initialize = function () {

        this.navBarContainer = byTag( 'nav' )[ 0 ];
        this.headerContainer = byTag( 'header' )[ 0 ];
        this.mainContainer = byTag( 'main' )[ 0 ];
        this.footerContainer = byTag( 'footer' )[ 0 ];

        loadComponents();
    };
}

function loadComponents () {

    const checkUser = localStorage.getItem( 'user_id' ) ?? null; // check if user id is present in local storage

    // set components
    App.navBarComponent = new Navbar( App, NavBarTitle );
    App.headerComponent = new Header( App, InitialHeader );
    App.footerComponent = new Footer( App, FooterTitle );
    App.mainComponent = checkUser ? new OpponentList( App ) : EnterUserName( App );

    App.renderAll();
}

export default App;