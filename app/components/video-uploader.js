import Ember from 'ember';


// Pull nested methods and objects into the current namespace.
const {Component} = Ember;


export default Component.extend({

  uploadURL: 'http://api.winionaire.com/cordova-upload.php',

  // Default setting for upload.
  fileType: 'image',

  imageLoaded: null,
  videoLoaded: null,
  errors: null,


  /**
   * When user clicks this component, we'll handle whatever sort
   * of upload they plan to make. The type of upload is set in
   * the property `fileType`
   *
   * @returns {*}
   */
  click(evt) {
    this._super(...arguments);

    if (!evt || !evt.target || !this.$(evt.target).hasClass('btn')) {
      // The component was clicked (but not the button part).
      return evt;
    }
    this.resetTemplateAndCamera();

    // Are we capturing a video?
    if (this.get('fileType') === "video") {
      return navigator.device.capture.captureVideo(this.videoUpload, console.error, {limit: 1});
    }

    // If not video, get image from camera/photolibrary
    return this.cameraUpload();
  },


  /**
   * Remove errors from template and images as well.
   * Also run cordovas camera cleanup
   */
  resetTemplateAndCamera() {
    navigator.camera.cleanup();
    this.set('errors', []);
    this.set('videoLoaded', null);
    this.set('imageLoaded', null);
  },


  /**
   * Pass this function as callback to the Cordova captureVideo
   * IE:
   *   navigator.device.capture.captureVideo(this.videoUpload, ...
   *
   * @param mediaFiles
   * @returns {boolean}
   */
  videoUpload(mediaFiles) {
    // Make sure that there are recordings to upload.
    if (!mediaFiles.length) {
      throw "No Recording!";
    }
    const theVideo = mediaFiles[0];
    const uploadOpts = {
      fileName: theVideo.name,
      mimeType: theVideo.type
    };

    // Show the videoLoaded in template
    this.set('videoLoaded', theVideo.localURL);

    return this.uploadFileToServer(theVideo.localURL, uploadOpts);
  },


  /**
   * Handle finding and uploading an image from device
   */
  cameraUpload() {

    const {PictureSourceType, DestinationType, MediaType, getPicture} = navigator.camera;

    const cameraOpts = {
      destinationType: DestinationType.FILE_URI,
      sourceType: PictureSourceType.PHOTOLIBRARY,
      mediaType: MediaType.PICTURE,
      allowEdit: true,
      quality: 50
    };

    getPicture((fileURL) => {

      // Don't need to find image CDV path to upload but it's future-proof so let's do it.
      resolveLocalFileSystemURL(fileURL, (entry) => {

        let systemFileURL = entry.toInternalURL();

        // Show the imageLoaded in template
        this.set('imageLoaded', systemFileURL);

        // Upload the image
        return this.uploadFileToServer(systemFileURL, {
          fileName: entry.name
        });
      });
    }, console.error, cameraOpts);
  },


  /**
   * Upload files to the server when ready.
   *
   * @param fileURI - DataURI or FileURI to file on device
   * @param options - Any config options you may wish to override.
   */
  uploadFileToServer(fileURI, options = {}) {
    // Configure options.
    const uploadOpts = new FileUploadOptions();
    uploadOpts.fileKey = options.fileKey || "file";
    uploadOpts.fileName = options.fileName || 'unknown-file.jpeg';
    uploadOpts.mimeType = options.mimeType || 'image/jpeg';
    uploadOpts.trustAllHosts = (typeof options.trustAllHosts !== "undefined" ? options.trustAllHosts : true);
    uploadOpts.chunkedMode = (options.chunkedMode !== "undefined" ? options.chunkedMode : false);


    // Upload!
    return new FileTransfer()
      .upload(
        fileURI,
        encodeURI(this.get('uploadURL')),
        this.successHandler.bind(this),
        this.errorHandler.bind(this),
        uploadOpts);
  },


  errorHandler(error) {
    this.get('errors').pushObject(error);
    console.error(`Error uploading,\n -> ${error.message},\n -> Code: ${error.code}`);
    console.log(error);
  },

  successHandler(serverResp) {
    if (!!serverResp.response) {
      try {
        // Turn the string into object if there is json response.
        let jsonResp = JSON.parse(serverResp.response);
        serverResp.response = jsonResp;
      }catch(e) {}
    }

    console.log('Successful Upload!', serverResp);
  }

});
