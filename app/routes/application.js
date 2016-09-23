import Ember from 'ember';
import SplashscreenMixin from 'ember-cordova/mixins/device/splashscreen';
import subscribe from 'ember-cordova/utils/subscribe';

const { Route, inject } = Ember;

export default Route.extend(SplashscreenMixin, {

  cordova: inject.service(),

  logReady: subscribe('cordova.deviceready', function() {
    console.log('Cordova --- DeviceReady --- Cordova');
  }),

  // the splash screen will get automatically hidden
  afterModel() {
    this._super(...arguments);
  }

});
