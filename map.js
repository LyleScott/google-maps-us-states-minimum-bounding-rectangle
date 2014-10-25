var map, activeBoundingBoxPolygon


function createStatePolygon(label, points) {
    "use strict";

    var polygon = new google.maps.Polygon({
            map: map,
            paths: points,
            strokeOpacity: 0.0,
            fillOpacity: 0.0
        });

    google.maps.event.addListener(polygon, "mousemove", function(event) {
        createBoundingBoxPolygon(stateCoords[label]);
    });

    return polygon;
}


function createBoundingBoxPolygon(coords) {
    "use strict";

    if (activeBoundingBoxPolygon != null) {
        activeBoundingBoxPolygon.setMap(null);
    }

    var bbox = getBoundingBox(coords),
        boundedBoxPolygon = new google.maps.Polygon({
            map: map,
            paths: [
                new google.maps.LatLng(bbox.bottomLeftPoint.x, bbox.bottomLeftPoint.y),
                new google.maps.LatLng(bbox.bottomRightPoint.x, bbox.bottomRightPoint.y),
                new google.maps.LatLng(bbox.topRightPoint.x, bbox.topRightPoint.y),
                new google.maps.LatLng(bbox.topLeftPoint.x, bbox.topLeftPoint.y)
            ],
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });

    activeBoundingBoxPolygon = boundedBoxPolygon;

    return boundedBoxPolygon;
}


function initialize() {
    "use strict";

    var mapOptions = {
            zoom: 5,
            center: new google.maps.LatLng(38, -101),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        },
        keys = Object.keys(stateCoords);

    map = new google.maps.Map(document.getElementById('map-canvas'),  mapOptions);

    for (var i = 0, j; i < keys.length; i++) {
        var key = keys[i],
            coords = [],
            points = stateCoords[key];

        for (j = 0; j < points.length; j++) {
            coords.push(
                new google.maps.LatLng(points[j][0], points[j][1])
            );
        }

        createStatePolygon(key, coords);
    }

}


google.maps.event.addDomListener(window, 'load', initialize);