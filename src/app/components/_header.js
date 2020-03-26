/**
 * @component Header
 */
import { html } from 'lit-html';

function Header ( app, initText ) {

    this.app = app;

    this.headerText = initText;

    this.setText = ( newText ) => this.headerText = newText;

    this.template = () => html`<h2>${ this.headerText }</h2>`;

    return this.template();
};
export default Header;