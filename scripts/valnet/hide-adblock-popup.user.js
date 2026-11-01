// ==UserScript==
// @name         Hide Valnet Ad Blocker Popup
// @namespace    https://github.com/darkerlogic/darkerlogic-scripts
// @version      1.0.0
// @description  Removes the "ad blocker detected" popup on XDA and other Valnet sites so articles stay readable and scrollable.
// @author       James Miller
// @match        https://www.xda-developers.com/*
// @match        https://www.howtogeek.com/*
// @match        https://www.androidpolice.com/*
// @match        https://www.pocket-lint.com/*
// @match        https://screenrant.com/*
// @match        https://gamerant.com/*
// @match        https://www.cbr.com/*
// @grant        none
// @run-at       document-start
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/darkerlogic/darkerlogic-scripts/main/scripts/valnet/hide-adblock-popup.user.js
// @downloadURL  https://raw.githubusercontent.com/darkerlogic/darkerlogic-scripts/main/scripts/valnet/hide-adblock-popup.user.js
// ==/UserScript==

// Valnet sites inject <dialog class="adblock" data-guid="<id>adbdiag"> after load and open it
// as a modal, which locks scrolling. The guid differs per site but always ends in "adbdiag".

(function () {
    'use strict';

    const SELECTOR = 'dialog.adblock, dialog[data-guid$="adbdiag"]';

    // Hide it before first paint so it never flashes on screen.
    const style = document.createElement('style');
    style.textContent = `${SELECTOR} { display: none !important; }`;
    document.documentElement.appendChild(style);

    // Removing (not closing) the dialog avoids firing its "dismissed" tracking event,
    // and takes it out of the modal top layer so the page scrolls again.
    function removeDialogs(root) {
        if (root.matches?.(SELECTOR)) {
            root.remove();
            return;
        }
        root.querySelectorAll?.(SELECTOR).forEach((el) => el.remove());
    }

    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    removeDialogs(node);
                }
            }
        }
    }).observe(document.documentElement, { childList: true, subtree: true });

    removeDialogs(document);
})();
