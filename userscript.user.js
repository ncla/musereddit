// ==UserScript==
// @name         /r/muse stylesheet testing
// @namespace    http://muse.reddit.com
// @version      0.1
// @description  Removes sub-reddits stylesheet and applies local stylesheet
// @author       ncla
// @require http://code.jquery.com/jquery-latest.js
// @match        *://*.reddit.com/r/ncla*
// @match        *://*.reddit.com/r/musetestsub*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var jQ = jQuery.noConflict();

    jQ('link[rel="stylesheet"][title="applied_subreddit_stylesheet"]').remove();
    jQ('head').append('<link rel="stylesheet" type="text/css" href="https://localhost:4443/build/stylesheet.css" media="all">');
})();