console.log('zooming.js');
var cssVariable;
(function (cssVariable) {
    cssVariable["width"] = "---width";
    cssVariable["height"] = "---height";
    cssVariable["x"] = "---x";
    cssVariable["y"] = "---y";
})(cssVariable || (cssVariable = {}));
var cssClasses;
(function (cssClasses) {
    cssClasses["body"] = "zooming-body";
    cssClasses["inZooming"] = "in-zooming";
    cssClasses["outZooming"] = "out-zooming";
})(cssClasses || (cssClasses = {}));
var frameOperations;
(function (frameOperations) {
    frameOperations["in"] = "in";
    frameOperations["out"] = "out";
})(frameOperations || (frameOperations = {}));
var _zooming = function () {
    var body = document.body;
    var zoomingFrames = document.querySelectorAll('.zooming-frame');
    var bodyClientRect = body.getBoundingClientRect();
    zoomingFrames.forEach(function (x) { return x.classList.add(cssClasses.outZooming); });
    body.classList.add(cssClasses.body);
    this.zoomingFrames = zoomingFrames;
    this.bodyClientRect = bodyClientRect;
    this.cssClasses = cssClasses;
};
_zooming.prototype.getContext = function () {
    var viewportWidth = this.bodyClientRect.width;
    var viewportHeight = this.bodyClientRect.height;
    return {
        viewportWidth: viewportWidth,
        viewportHeight: viewportHeight
    };
};
_zooming.prototype.toggleZoomInOut = function (targetFrame, operation) {
    if (operation in frameOperations) {
        if (operation === frameOperations.in) {
            targetFrame.classList.add(cssClasses.inZooming);
            targetFrame.classList.remove(cssClasses.inZooming);
        }
        switch (operation) {
            case frameOperations.in:
                targetFrame.classList.add(cssClasses.inZooming);
                targetFrame.classList.remove(cssClasses.outZooming);
                break;
            case frameOperations.out:
                targetFrame.classList.add(cssClasses.outZooming);
                targetFrame.classList.remove(cssClasses.inZooming);
                break;
            default:
                break;
        }
    }
};
_zooming.prototype.in = function (index) {
    var targetIndex = index !== null && index !== void 0 ? index : 0;
    var _a = this.getContext(), viewportWidth = _a.viewportWidth, viewportHeight = _a.viewportHeight;
    var targetFrame = this.zoomingFrames[targetIndex];
    this.toggleZoomInOut(targetFrame, frameOperations.in);
    targetFrame.style.setProperty(cssVariable.width, "".concat(viewportWidth, "px"));
    targetFrame.style.setProperty(cssVariable.height, "".concat(viewportHeight, "px"));
    targetFrame.style.setProperty(cssVariable.x, "0");
    targetFrame.style.setProperty(cssVariable.y, "0");
    targetFrame.classList.add(cssClasses.inZooming);
};
_zooming.prototype.out = function (index) {
    var targetIndex = index !== null && index !== void 0 ? index : 0;
    //const {viewportWidth, viewportHeight} = this.getContext()
    var targetFrame = this.zoomingFrames[targetIndex];
    this.toggleZoomInOut(targetFrame, frameOperations.out);
    targetFrame.style.setProperty(cssVariable.width, "".concat(targetFrame.dataset.framemetaWidth));
    targetFrame.style.setProperty(cssVariable.height, "".concat(targetFrame.dataset.framemetaHeight));
    targetFrame.style.setProperty(cssVariable.x, "".concat(targetFrame.dataset.framemetaX));
    targetFrame.style.setProperty(cssVariable.y, "".concat(targetFrame.dataset.framemetaY));
    console.log(targetFrame);
};
var zooming = new _zooming();
//zooming1.in(0)
//# sourceMappingURL=zooming.js.map