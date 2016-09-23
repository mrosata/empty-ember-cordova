import Ember from 'ember';
import SplashscreenMixin from 'ember-cordova/mixins/device/splashscreen';

const { Route } = Ember;

export default Route.extend(SplashscreenMixin, {

  // the splash screen will get automatically hidden
  afterModel() {

  }
});
