/**
 * @name Alerts
 * @description TODO:
 */

import { html, render } from 'lit-html';
import { body, byId } from '../_declarations';
import { create } from '../_declarations';
import guid from 'guid';

function appAlerts ( alertMessage = 'Pass a message', alertType = 'default', timeout = 3000 ) {
    // const alertsDiv = byId( 'alerts' ) === null ? create( 'div' ) : byId( 'alerts' );
    const alertsDiv = getAlertsContainer();
    const thisAlertContainer = create( 'div' );

    const alert = html`
            <style>
                #alerts{
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    z-index: 1000;
                }
                .general-style{
                    margin-top: 10px;
                    position: relative;
                    padding: 15px 40px 15px 30px;
                    font-size: 1.2em;
                }
                .default{
                    background: #BBDEFB;
                    color: #0D47A1;
                    border-left: 3px solid #0D47A1;
                    border-right: 1px solid #0D47A1;
                }
                .warning{
                    background: #fafbbb;
                    color: #a1920d;
                    border-left: 3px solid #a1920d;
                    border-right: 1px solid #a1920d;
                }
                .success{
                    background: #bbfbc6;
                    color: #0da132;
                    border-left: 3px solid #0da132;
                    border-right: 1px solid #0da132;
                }
                .error{
                    background: #fbbbbb;
                    color: #a10d0d;
                    border-left: 3px solid #a10d0d;
                    border-right: 1px solid #a10d0d;
                }
                
            </style>
            <div class="general-style ${alertType }">
                <div>
                    ${getAlertIcon( alertType ) }
                    ${alertMessage }
                </div>
            </div>
        </div>
    `
    thisAlertContainer.id = guid.create();

    render( alert, thisAlertContainer );

    alertsDiv.children.length < 5 ? alertsDiv.append( thisAlertContainer ) : thisAlertContainer.remove();

    return setTimeout( () => {
        thisAlertContainer.remove();
        alertsDiv.children.length == 0 && alertsDiv.remove()
    }, timeout )
}

function getAlertsContainer () {
    const
        exists = byId( 'alerts' ) !== null,
        alertsDiv = exists ? byId( 'alerts' ) : create( 'alerts' );
    if ( !exists ) {
        alertsDiv.id = 'alerts';
        body.prepend( alertsDiv );
    }
    return alertsDiv
}

function getAlertIcon ( type ) {
    switch ( type ) {
        case 'default': return html`<span style="margin-right: 5px" class="fa">&#xf058;</span>`
        case 'error': return html`<span style="margin-right: 5px" class="fa">&#xf127;</span>`
        case 'success': return html`<span style="margin-right: 5px" class="fa">&#xf046;</span>`
        case 'warning': return html`<span style="margin-right: 5px" class="fa">&#xf12a;</span>`
    }
}

export default appAlerts;