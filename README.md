# Empty-App 

This README outlines the details of collaborating on this Ember application.
If you follow below 

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Cordova](http://cordova.apache.org/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone https://github.com/mrosata/empty-ember-cordova.git`
* change into the new directory
* `npm install`
* `bower install`

Now check to see that you are able to build the browser environment
* `ember cordova:build --platform browser`

## Running / Development

* `ember cdv:serve --platform browser`
* `ember cdv:serve --platform android` # Will serve Android on live reload to localhost:4200
* Visit your app at [http://localhost:4200](http://localhost:4200).

When running Android, open up another terminal and run the following line to see if Cordova can see your device is detected by the system.
`ember cordova run --list`
If so then run
`ember cordova run android --device`
On subsequent runs you won't have to rebuild the app because it will already be on your device (and since it's livereload in the webview there is nothing to rebuild in the actual native app)
`ember cordova run android --device --no-build`
To debug start up a weinre server, mine is on: [http://192.168.1.147:8080](http://192.168.1.147:8080) but yours might be different. You can change the link that is used in the app in the `app/index.html` file. Look for the weinre script tag.
`weinre --boundHost=-all-`
### Code Generators

Generators will help you to build templates for routes, models, components, ect.. try `ember help generate` for more details

### Building

* `ember cdv:build` (development ios)
* `ember cdv:build --platform android` (development android)
* `ember cdv:build --platform browser` (development android)
* `ember cdv:build --platform android --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)


### Notes to you from me

Here is how I installed the various features

```sh
$ ember install ember-cli-sass
$ ember g route application
$ ember cordova:platform add android --save
$ ember cdv:platform add browser --save
$ ember cdv:plugin add cordova-plugin-file --save
$ ember cdv:plugin add cordova-plugin-file-transfer --save
$ ember cdv:plugin add cordova-camera --save
$ ember cdv plugin add cordova-plugin-whitelist --save
$ ember cdv:plugin add cordova-plugin-splashscreen --save
$ ember install ember-cordova-keyboard --save
```
