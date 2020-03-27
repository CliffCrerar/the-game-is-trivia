/**
 * @name Main component
 */
import { html, render } from 'lit-html';
import { byId } from '../tools';
import { create } from '../tools';

function PlayerList ( app ) {

    this.app = app;

    const listContainer = create( 'ul' );

    const listElement = create( 'li' );//.classList.add( 'player-listing' );

    listElement.classList.add( 'player-listing' );

    function updatePlayerList ( player, type ) {

        if ( type ?? 'entry' ) {

            return addPlayer( player );

        } else if ( type ?? exit ) {

            return removePlayer();

        }
    }

    function addPlayer ( player ) {

        const newListEl = listElement.cloneNode();

        let element = html`
            <div class="player-avatar fa">&#xf007;</div>
            <div class="player-name">${player.name }</div>
        `;

        newListEl.id = player[ '_id' ];

        listContainer.append( newListEl );

        return render( element, newListEl );
    }

    function removePlayer ( id ) { return byId( id ).remove(); }

    this.app.lobbyService.activity.wait( lobbyActivity => updatePlayerList( lobbyActivity, 'entry' ) );

    this.template = () => {
        // renderList();
        /*
            <div class="player-listing">
                <div class="player-avatar fa">&#xf007;</div>
                <div class="player-name">Player</div>
            </div>    
        */

        return html`
        <div class="main-inner box-shadow-2 bg-white">
            <div>
                <h3>Players Online</h3>
            </div>
            <hr>
            <div @load=${function () { console.log( 'testload' ); } } id="playersOnlineList">
                ${listContainer }
            </div>
        </div>`;
    };

    return this.template();
}
export default PlayerList;