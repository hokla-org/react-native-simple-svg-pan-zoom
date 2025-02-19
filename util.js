export function calcDistance(x1, y1, x2, y2) {
    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}
export function calcCenter(x1, y1, x2, y2) {
    function middle(p1, p2) {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
    }
    let point1 = { x: x1, y: y1 };
    let point2 = { x: x2, y: y2 };
    let mid = middle(point1, point2);
    return {
        x: mid.x,
        y: mid.y
    };
}
export function maxOffset(offset, windowDimension, imageDimension) {
    let max = windowDimension - imageDimension;
    if (max >= 0) {
        return 0;
    }
    return offset < max ? max : offset;
}
export function createIdentityTransform() {
    return {
        scaleX: 1,
        skewX: 0,
        skewY: 0,
        scaleY: 1,
        translateX: 0,
        translateY: 0
    };
}
export function createTranslationMatrix(translateX, translateY) {
    return {
        scaleX: 1,
        skewX: 0,
        skewY: 0,
        scaleY: 1,
        translateX: translateX,
        translateY: translateY
    };
}
export function createScalingMatrix(scale) {
    return {
        scaleX: scale,
        skewX: 0,
        skewY: 0,
        scaleY: scale,
        translateX: 0,
        translateY: 0
    };
}
export function viewTransformMult(vtA, vtB) {
    //Convert ViewTransform to conventional 3x3 matrices
    var mA = [vtA.scaleX, vtA.skewY, vtA.translateX, vtA.skewX, vtA.scaleY, vtA.translateY];
    var mB = [vtB.scaleX, vtB.skewY, vtB.translateX, vtB.skewX, vtB.scaleY, vtB.translateY];
    var mC = [];
    mC[0] = mA[0] * mB[0] + mA[1] * mB[3];
    mC[1] = mA[0] * mB[1] + mA[1] * mB[4];
    mC[2] = mA[0] * mB[2] + mA[1] * mB[5] + mA[2] * 1;
    mC[3] = mA[3] * mB[0] + mA[4] * mB[3];
    mC[4] = mA[3] * mB[1] + mA[4] * mB[4];
    mC[5] = mA[3] * mB[2] + mA[4] * mB[5] + mA[5] * 1;
    var result = {
        scaleX: mC[0],
        skewX: mC[3],
        skewY: mC[1],
        scaleY: mC[4],
        translateX: mC[2],
        translateY: mC[5]
    };
    return result;
}
export function getBoundedPinchTransform(oldTransform, newTransform, minScale, maxScale) {
    let boundedTransform = Object.assign({}, newTransform);
    //Calculate scale bounds
    boundedTransform.scaleX = Math.min(Math.max(boundedTransform.scaleX, minScale), maxScale);
    boundedTransform.scaleY = Math.min(Math.max(boundedTransform.scaleY, minScale), maxScale);
    if (boundedTransform.scaleX !== newTransform.scaleX || boundedTransform.scaleY !== newTransform.scaleY) {
        boundedTransform.translateX = oldTransform.translateX;
        boundedTransform.translateY = oldTransform.translateY;
    }
    return boundedTransform;
}
export function getBoundedTouchTransform(initialTransform, oldTransform, newTransform, viewDim, canvasWidth, canvasHeight) {
    let boundedTransform = Object.assign({}, newTransform);
    const scaledCanvas = {
        width: boundedTransform.scaleX * canvasWidth,
        height: boundedTransform.scaleY * canvasHeight
    };
    const zoomDisplacement = {
        x: (canvasWidth - scaledCanvas.width) / 2,
        y: (canvasHeight - scaledCanvas.height) / 2
    };
    const extendPercentage = 0.2;
    const extendLimit = viewDim.width * extendPercentage;
    // Compute translation bounds scaling based on zoom level
    const zoomScaleFactor = Math.max(boundedTransform.scaleX, boundedTransform.scaleY) - 1;
    // Default to fully unrestricted bounds
    let maxBounds = {
        x: Infinity,
        y: Infinity
    };
    let minBounds = {
        x: -Infinity,
        y: -Infinity
    };
    // Entire Canvas can be seen within the view
    if (scaledCanvas.width < viewDim.width && scaledCanvas.height < viewDim.height) {
        maxBounds = {
            x: ((viewDim.width - scaledCanvas.width) + extendLimit - zoomDisplacement.x) * zoomScaleFactor,
            y: ((viewDim.height - scaledCanvas.height) + extendLimit - zoomDisplacement.y) * zoomScaleFactor
        };
        minBounds = {
            x: (-zoomDisplacement.x - extendLimit) * zoomScaleFactor,
            y: (-zoomDisplacement.y - extendLimit) * zoomScaleFactor
        };
        if (initialTransform.translateX > maxBounds.x) {
            maxBounds.x = initialTransform.translateX;
        }
        if (initialTransform.translateX < minBounds.x) {
            minBounds.x = initialTransform.translateX;
        }
        if (initialTransform.translateY > maxBounds.y) {
            maxBounds.y = initialTransform.translateY;
        }
        if (initialTransform.translateY < minBounds.y) {
            minBounds.y = initialTransform.translateY;
        }
    }
    else {
        maxBounds = {
            x: (viewDim.width - zoomDisplacement.x - extendLimit) * zoomScaleFactor,
            y: (viewDim.height - zoomDisplacement.y - extendLimit) * zoomScaleFactor
        };
        minBounds = {
            x: (-zoomDisplacement.x - scaledCanvas.width + extendLimit) * zoomScaleFactor,
            y: (-zoomDisplacement.y - scaledCanvas.height + extendLimit) * zoomScaleFactor
        };
    }
    boundedTransform.translateX = Math.min(Math.max(boundedTransform.translateX, minBounds.x), maxBounds.x);
    boundedTransform.translateY = Math.min(Math.max(boundedTransform.translateY, minBounds.y), maxBounds.y);
    return boundedTransform;
}
