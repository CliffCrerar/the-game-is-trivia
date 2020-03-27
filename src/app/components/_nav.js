/**
 * @component Navbar
 */
import { html } from 'lit-html';

function Navbar ( app, initText ) {

    this.app = app;

    this.navbarBrand = initText;

    this.template = () => html`
        <h4 class="nav-brand text-center w-100 display-six">
            ${this.navbarBrand }
        </h4>
    `;

    this.setText = ( newText ) => this.navbarBrand = newText;

    return this.template();

}
export default Navbar;