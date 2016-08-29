# Muse sub-reddit theme

### How to set-up for development

1. `git pull` the repository
2. (optional if you bring your own server locally) To get web server going:
  1. `openssl req -x509 -newkey rsa:4096 -keyout server/key.pem -out server/cert.pem -days 365 -nodes`
  2. `python2 server/server.py`
3. `gulp build` or `gulp watch` to constantly build the stylesheet
4. Install the user-script to get local changes applied to the sub-reddit
  1. Download TamperMonkey (for Chrome) or GreaseMonkey (for Firefox)
  2. Navigate to this [URL](https://github.com/ncla/musereddit/raw/master/userscript.user.js)
  3. Install the user-script by following instructions
