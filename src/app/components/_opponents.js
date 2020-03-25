/**
 * Main component
 */
import { html } from 'lit-html';

function OpponentList ( app ) {

    this.app = app;

    this.template = () => html`
        <div class="main-inner box-shadow-2">
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

    return this.template();
}
export default OpponentList;