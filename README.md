# /r/muse theme

### About

This is /r/muse sub-reddit theme, original theme was /r/apicem, but it was taken and modified heavily by @ncla. Since there was no GitHub repository by original author, I had to use already built stylesheet and work with that. At first, I was extending (over-riding) CSS rules I wanted to change (this was suggested by original author), but later found out that this was inefficient way to build a theme, and I switched to moving styles to separate file and changing them there. Not all styles are moved in their respective files, majority is still left in `everything.css` file which is the original `.css` file. Pardon the spaghetti, unfortunately designers tend not to be very tech-savvy when it comes to SCSS and Git.

Due to the original theme being a dark one and the current /r/muse theme being a bright one, to avoid complaining about huge color change I converted this theme to a bright one, which was done manually, and the colors were brought into variables for easier conversion. Please excuse my color spaghetti as well.

### Contributions

They are welcome, but please first contact @ncla on GitHub, /u/iamncla on Reddit or through mod-mail /r/muse.

### Support

Modern browsers, newest RES. Anything older can piss off.

### Usage

I would like to ask not use this theme on any other sub-reddits apart from Muse sub-reddits (and any other related Muse sub-reddits). There is /r/apicemlight and /r/apicem which you can freely use. Of course due to the nature of open-source I can't exactly police the usage of this theme.

### Development setup

1. `git pull` the repository
2. Get web server going:
  1. We need HTTPS so that the style-sheet loads. `openssl req -x509 -newkey rsa:4096 -keyout server/key.pem -out server/cert.pem -days 365 -nodes`
  2. Fill out all the information (or leave everything blank) for the certificates
  3. Install all the `node` dependencies with `npm install`
  4. Run `node server/server.js` or `forever start server/server.js` to just launch it
  5. Navigate to `https://localhost:4443/` through browser and allow this self-signed certificate to run, otherwise style-sheet and images won't load, and we need HTTPS because of browser security standards
3. `gulp build` or `gulp watch` to constantly build the stylesheet
4. Install the user-script to get local changes applied to the sub-reddit
  1. Download TamperMonkey (for Chrome) or GreaseMonkey (for Firefox)
  2. Navigate to this [URL](https://github.com/ncla/musereddit/raw/master/userscript.user.js)
  3. Install the user-script by following instructions
  4. If needed, edit the user-script for your needs (e.g. change sub-reddit to which this script applies)
