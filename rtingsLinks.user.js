// ==UserScript==
// @name        Rtings Open Shopping Links in New Tab Only
// @namespace   https://greasyfork.org/en/users/594496-divided-by
// @author      dividedby
// @description Opens shopping links in new tabs on rtings.com without affecting the current tab
// @version     1.2
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @contributionURL     https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=dividedbygit@gmail.com&item_name=Rtings+Tab+Donation
// @contributionAmount  $1
// @match       https://www.rtings.com/*
// run-at       document-idle

// @downloadURL https://update.greasyfork.org/scripts/508341/Rtings%20Open%20Shopping%20Links%20in%20New%20Tab%20Only.user.js
// @updateURL   https://update.greasyfork.org/scripts/508341/Rtings%20Open%20Shopping%20Links%20in%20New%20Tab%20Only.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // Any http(s) link whose host isn't rtings.com is treated as external.
    function isExternal(link) {
        return (link.protocol === 'http:' || link.protocol === 'https:') &&
               link.hostname !== 'rtings.com' &&
               !link.hostname.endsWith('.rtings.com');
    }

    function handleClick(event) {
        const link = event.currentTarget;
        if (isExternal(link)) {
            event.preventDefault();
            event.stopPropagation();
            window.open(link.href, '_blank', 'noopener,noreferrer');
        }
    }

    function enhanceLinks() {
        const links = document.querySelectorAll('a[href]:not([data-enhanced])');
        links.forEach(link => {
            link.setAttribute('data-enhanced', 'true');
            if (isExternal(link)) {
                link.addEventListener('click', handleClick, true);
            }
        });
    }

    enhanceLinks();

    const observer = new MutationObserver(mutations => {
        if (mutations.some(mutation => mutation.addedNodes.length > 0)) {
            enhanceLinks();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();

