'use strict';
const snoowrap = require('snoowrap');
const fs = require('fs');
const glob = require("glob");
const dotenv = require('dotenv').config();

var randomHeader, snoo = null;

console.log('Looking for header images in directory');

glob("../images/headers/*.jpg", {}, function (er, files) {
    if (er !== null) {
        throw Error(er);
    }

    if (files.length === 0) {
        throw Error('No header images in directory /images/headers/');
    }

    console.log('Found ' + files.length + ' images');

    randomHeader = files[Math.floor(Math.random() * files.length)];

    console.log('Selected image:' + randomHeader);

    changeHeader();
});

function changeHeader() {
    // Create a new snoowrap requester with OAuth credentials.
    // For more information on getting credentials, see here: https://github.com/not-an-aardvark/reddit-oauth-helper
    snoo = new snoowrap({
        userAgent: process.env.SNOOWRAP_USERAGENT,
        clientId: process.env.SNOOWRAP_CLIENTID,
        clientSecret: process.env.SNOOWRAP_CLIENTSECRET,
        refreshToken: process.env.SNOOWRAP_REFRESHTOKEN
    });

    snoo.getSubreddit(process.env.SNOOWRAP_SUBREDDIT).uploadStylesheetImage({
        name: 'header',
        file: randomHeader
    }).then(function() {
        console.log('Uploaded a new header image');

        snoo.oauthRequest({
            uri: '/r/' + process.env.SNOOWRAP_SUBREDDIT + '/about/stylesheet.json',
            method: 'get'
        }).then(function(resp) {
            console.log('Got original sub-reddit stylesheet');

            var currentCss = resp.stylesheet;

            console.log('Stylesheet string length', currentCss.length);
            console.log('Refreshing stylesheet');

            snoo.getSubreddit(process.env.SNOOWRAP_SUBREDDIT).updateStylesheet({
                css: currentCss,
                reason: 'Automatic header change'
            }).then(function() {
                console.log('Stylesheet refreshed');
            });
        });
    });
}