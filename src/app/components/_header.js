/**
 * @component Header
 */
import { html } from 'lit-html';

function Header ( app, initText ) {

    this.app = app;

    this.headerText = initText;

    this.setText = ( newText ) => this.headerText = newText;

    this.template = () => html`<h1 class="text-white text-center">${ this.headerText }</h1>`;

    return this.template();

};
export default Header;