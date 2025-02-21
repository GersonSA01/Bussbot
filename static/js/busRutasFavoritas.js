document.addEventListener('DOMContentLoaded', function () {
    window.map = L.map('mapid').setView([-2.1323284841880536, -79.5988940173376], 13);

   


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var layers = {}; 
    var busMarkers = {};
    var busIcon = L.icon({
        iconUrl: busIconUrl, 
        iconSize: [25, 35],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const routeColors = {
        'Línea 1': 'blue',
        'Línea 2': 'red',
        'Línea 3': 'green',
        'Línea 4': 'purple',
        'Línea 5': 'orange',
        'Línea 6': 'yellow',
        'Línea 7': 'pink',
        'Línea 8': 'cyan',
        'Línea 9': 'magenta',
        'Línea 10': 'lime'
    };

    function calculateDistance(pointA, pointB) {
        const R = 6371e3; 
        const lat1 = pointA[0] * Math.PI / 180;
        const lat2 = pointB[0] * Math.PI / 180;
        const deltaLat = (pointB[0] - pointA[0]) * Math.PI / 180;
        const deltaLng = (pointB[1] - pointA[1]) * Math.PI / 180;

        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    function interpolateLatLng(start, end, factor) {
        return [
            start[0] + (end[0] - start[0]) * factor,
            start[1] + (end[1] - start[1]) * factor
        ];
    }

    window.busPositions = {};

    function simulateBusMovement(routeCoordinates, busMarker, speed, routeName) {
        let currentIndex = 0;
        let goingForward = true;
        let progress = 0;

        function moveBus() {
            const startPoint = routeCoordinates[currentIndex];
            const endPoint = routeCoordinates[goingForward ? currentIndex + 1 : currentIndex - 1];
            const segmentDistance = calculateDistance(startPoint, endPoint);

            // Interpolar la posición del bus
            const nextPosition = interpolateLatLng(startPoint, endPoint, progress / segmentDistance);
            busMarker.setLatLng(nextPosition);

            if (routeName) {
                window.busPositions[routeName] = nextPosition;
            } else {
                console.error("routeName es undefined al intentar actualizar window.busPositions");
            }

            progress += speed;

            if (progress >= segmentDistance) {
                progress = 0;
                if (goingForward) {
                    currentIndex++;
                    if (currentIndex >= routeCoordinates.length - 1) {
                        goingForward = false;
                    }
                } else {
                    currentIndex--;
                    if (currentIndex <= 0) {
                        goingForward = true;
                    }
                }
            }

            requestAnimationFrame(moveBus);
        }

        moveBus(); 
    }


    fetch('/api/rutas/')
        .then(response => response.json())
        .then(data => {
            console.log('Filtrando rutas favoritas');
            var favoriteRoutesNames = favoriteRoutes.map(route => route.nombre);

            data.forEach(ruta => {
                if (favoriteRoutesNames.includes(ruta.nombre)) {
                    var color = routeColors[ruta.nombre] || 'black';
                    var layer = L.polyline(ruta.localizaciones, { color: color }).addTo(map);
                    layers[ruta.nombre] = layer;

                    ruta.buses.forEach(bus => {
                        var busMarker = L.marker([bus.localizacion[0], bus.localizacion[1]], { icon: busIcon, zIndexOffset: 1000 }).addTo(map);
                        busMarker.bindTooltip(`Bus de ${ruta.nombre}`, { permanent: false, direction: 'top' });

                        if (ruta.nombre) {
                            simulateBusMovement(ruta.localizaciones, busMarker, 1, ruta.nombre);
                        } else {
                            console.error("Nombre de la ruta es undefined al intentar simular el movimiento del bus");
                        }

                        if (!busMarkers[ruta.nombre]) {
                            busMarkers[ruta.nombre] = [];
                        }
                        busMarkers[ruta.nombre].push(busMarker);
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar las rutas:', error);
        });

      
});