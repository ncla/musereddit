// ==UserScript==
// @name         /r/muse stylesheet testing
// @namespace    http://muse.reddit.com
// @version      0.1
// @description  Removes sub-reddits stylesheet and applies local stylesheet
// @author       ncla
// @require http://code.jquery.com/jquery-latest.js
// @require https://raw.githubusercontent.com/ccampbell/mousetrap/master/mousetrap.min.js
// @match        *://*.reddit.com/r/ncla*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var jQ = jQuery.noConflict();
    var originalLink = 'https://localhost:4443/build/stylesheet.css';

    var originalSubredditStyle = jQ('link[rel="stylesheet"][title="applied_subreddit_stylesheet"]');

    if (originalSubredditStyle.length) {
        jQ(originalSubredditStyle).attr('href', originalLink).attr('id', 'devstylesheet');
    } else {
        jQ('head').append('<link rel="stylesheet" type="text/css" href=' + originalLink + ' media="all" id="devstylesheet">');
    }

    Mousetrap.bind('alt+s', function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        console.log('Reloading style-sheet');
        jQ('#devstylesheet').attr('href', originalLink + '?' + (+new Date()));

    });
})();