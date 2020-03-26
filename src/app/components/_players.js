/**
 * @name Main component
 */
import { html } from 'lit-html';

function PlayerList ( app ) {

    function populatePlayers () {
        this.app.lobbyService.playersInLobby( function ( playerList ) {
            console.log( playerList );
        } );
    }

    this.app = app;

    this.template = () => {

        console.log( this );

        populatePlayers.call( this );

        return html`
        <div class="main-inner box-shadow-2 bg-white">
            <h3>Players Online</h3>
            <hr>
            <div class="player-listing">
                <div class="player-avatar fa">&#xf007;</div>
                <div class="player-name">Player</div>
            </div>
        
            <div class="player-listing">
                <div class="player-avatar"></div>
                <div class="player-name">Player</div>
            </div>
        
            <div class="player-listing">
                <div class="player-avatar"></div>
                <div class="player-name">Player</div>
            </div>
        </div>`;
    };

    return this.template();
}
export default PlayerList;