
function BoundingBoxPoint(x, y) {
    "use strict";

    this.x = x;
    this.y = y;
}


function BoundingBoxBox(topLeft, topRight, bottomLeft, bottomRight) {
    "use strict";

    this.topLeftPoint = topLeft;
    this.topRightPoint = topRight;
    this.bottomLeftPoint = bottomLeft;
    this.bottomRightPoint = bottomRight;
}


function getBoundingBox(points) {
    "use strict";

    var xPoints = [],
        yPoints = [];

    for (var i = 0; i < points.length; i++) {
        xPoints.push(points[i][0]);
        yPoints.push(points[i][1]);
    }

    var xMin = Math.min.apply(null, xPoints),
        xMax = Math.max.apply(null, xPoints),
        yMin = Math.min.apply(null, yPoints),
        yMax = Math.max.apply(null, yPoints);

    var topLeft = new BoundingBoxPoint(xMin, yMax),
        topRight = new BoundingBoxPoint(xMax, yMax),
        bottomLeft = new BoundingBoxPoint(xMin, yMin),
        bottomRight = new BoundingBoxPoint(xMax, yMin);

    return new BoundingBoxBox(topLeft, topRight, bottomLeft, bottomRight);
}
