/**
 * @component Application controller
 */

import Navbar from './_nav';
import Header from './_header';
import PlayerList from './_players';
import EnterUserName from './_user-name';
import Footer from './_footer';
import LobbyService from '../services/lobby.service.mjs';
import { html, render } from 'lit-html';
import { byTag } from '../tools';

AppController.prototype.LobbyServiceConstructor = LobbyService;

const
    App = new AppController(),

    NavBarTitle = 'Movie Trivia',
    InitialHeader = 'Lobby',
    FooterTitle = 'FooterText';
console.log( 'App: ', App );
// App.constructor.protoType.lobbyService = new LobbyService( App );

function AppController () {

    /**
     * @description TODO:
     */

    this.navBarContainer; // container from the app frame
    this.navBarComponent; // component to render in container

    this.headerContainer; // container from the app frame
    this.headerComponent; // component to render in container

    this.mainContainer; // container from the app frame
    this.playerListComponent; // component to render in container
    this.userNameComponent; // component to render in container

    this.footerContainer; // container from the app frame
    this.footerComponent; // component to render in container

    /**
     * @description TODO:
     */
    this.renderNavbar = () => render( this.navBarComponent, this.navBarContainer );
    this.renderHeader = () => render( this.headerComponent, this.headerContainer );
    this.renderPlayerList = () => render( this.playerListComponent, this.mainContainer );
    this.renderUserName = () => render( this.userNameComponent, this.mainContainer );
    this.renderFooter = () => render( this.footerComponent, this.footerContainer );

    /**
     * @function initialize
     * @description TODO:
     */
    this.initialize = function () {

        this.navBarContainer = byTag( 'nav' )[ 0 ];
        this.headerContainer = byTag( 'header' )[ 0 ];
        this.mainContainer = byTag( 'main' )[ 0 ];
        this.footerContainer = byTag( 'footer' )[ 0 ];

        this.lobbyService = new this.LobbyServiceConstructor( this );

        loadComponents();
    };

    /**
     * @function attachService
     * @description TODO:
     */
    this.attachService = function ( serviceName, service ) {
        this[ serviceName ] = service;
    };
};

/**
 * @function loadComponents
 * @description TODO
 */
function loadComponents () {

    const checkUser = localStorage.getItem( 'user_id' ) ?? null; // check if user id is present in 
    console.log( 'checkUser: ', checkUser );

    /**
     * @description TODO:
     */
    // App.attachService( 'lobbyService', Lobby );

    /**
     * @description TODO:
     */

    App.navBarComponent = new Navbar( App, NavBarTitle );
    App.headerComponent = new Header( App, InitialHeader );
    App.footerComponent = new Footer( App, FooterTitle );
    App.playerListComponent = new PlayerList( App );
    App.userNameComponent = new EnterUserName( App );

    /**
     * @description TODO:
     */
    App.renderNavbar();
    App.renderHeader();
    App.renderFooter();

    /**
     * @description TODO:
     */
    checkUser
        ? App.renderPlayerList()
        : App.renderUserName();

    /**
     * @description If user id exists in local storage enter user into lobby
     */
    // checkUser && fetchUserName( user => Lobby.enterLobby( user ) );
}

/**
 * @function fetchUserName
 * @description TODO:
 * @param {*} callback 
 */
function fetchUserName ( callback ) {
    return fetch( '/api/user-by-id/' + localStorage.getItem( 'user_id' ) ).then( resp =>
        resp.json()
            .then( user => {
                delete user[ '__v' ];
                return callback( user );
            } ) );
}

// window.onbeforeunload = confirmExit;
// function confirmExit () {
//     // Lobby.exit();
//     Lobby.activity.destroy();
//     return 'message to display in dialog box';
// }

export default App;