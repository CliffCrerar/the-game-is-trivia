/**
 * @component Footer-component
 */

import { html } from 'lit-html';

function Footer ( app, initText ) {
    this.app;

    this.footerText = initText;

    this.template = () => html`<h4 class="text-center">${ this.footerText }</h4>`;

    this.setText = ( newText ) => this.footerText = newText;

    return this.template();
}

export default Footer;