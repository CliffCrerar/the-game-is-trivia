/**
 * Main component
 */
import { html } from 'lit-html'

const InnerMain = () => html`<div class="main-inner box-shadow-2">
    <h3>Players Online</h3>
    <hr>
    <div class="player-listing">
        <div class="player-avatar"></div>
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

export default InnerMain();