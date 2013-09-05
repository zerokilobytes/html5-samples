var Settings = function() {
    this.dragForce = 0.25;
    this.linkRestLength = 5;
    this.gravity = 1.0;
    this.repultionForce = 1000;
    this.linkMaximalThickness = 8;
    this.linkMinimalThickness = 0.5;
    this.nodeSizeRatio = 0.25;
    this.initialZoomRatio = 4;
    this.initialVisibilityGraphDepth = 1;
    this.hangeStep = 0.1;
    this.maximumNodes = 200;
    this.cleanUpAdditionalDepth = 1;
    this.downloadTimeout = 100000;
    this.maximumDownloadPerMinute = 100;
    this.maximumSimultaneousDownload = 30;
    this.multipleSelectionNodeMode = false;
    this.debugMode = false;
    this.navigationBarMode = false;
};

Settings.prototype = {
};
