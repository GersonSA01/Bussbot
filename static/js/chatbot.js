document.addEventListener("DOMContentLoaded", function () {
    const chatBody = document.getElementById('chat-body');
    const chatFooter = document.querySelector('.chat-footer');
    const inputDestination = document.getElementById('input-destination');
    let currentLocationMarker;
    let destinationMarker;

    addCurrentLocationMarker();

    

    const rutas = {
        'Línea 1': [
            [-2.129343510697523, -79.59173529220413],
            [-2.128704050715952, -79.5963376649886],
            [-2.1348900625174454, -79.59682312652659],
            [-2.134947437300024, -79.60006386377377],
            [-2.139059185180813, -79.61490295379875]
        ],
        'Línea 2': [
            [-2.1152827441094733, -79.58739295406353],
            [-2.127795202999797, -79.59214884485115],
            [-2.131687591336511, -79.59295395033742],
            [-2.1332891538039505, -79.59354368480456],
            [-2.1329385802266914, -79.59535615077675],
            [-2.1326896225484315, -79.59685150501593],
            [-2.1316760373238917, -79.59730602150313],
            [-2.134442806353855, -79.61615468916426],
            [-2.139059185180813, -79.61490295379875]
        ],
        'Línea 3': [
            [-2.156147205940775, -79.57963691723559],
            [-2.1516657210097874, -79.57975493443914],
            [-2.1497037270385824, -79.58300577174667],
            [-2.1485029425822, -79.58535538685027],
            [-2.147243100008797, -79.58805697301415],
            [-2.144487722723166, -79.59333556035412],
            [-2.1393843649666153, -79.59116833548218],
            [-2.1372546588616106, -79.59093850003273],
            [-2.1362815289818613, -79.59093653068551],
            [-2.133150883016475, -79.59332906112384],
            [-2.1303525947451383, -79.593135942078],
            [-2.129112706300099, -79.59304913881475],
            [-2.1288046610651596, -79.59178752675649],
            [-2.127073411750244, -79.5927858084315],
            [-2.1240895744003447, -79.59317527257957],
            [-2.121584399175158, -79.59554787028807],
            [-2.120054450868249, -79.59555682348889],
            [-2.1176566341041223, -79.59319765558509],
            [-2.1156256446295036, -79.59276342543663],
            [-2.1137396910916806, -79.59253539715144]
        ],
        'Línea 4': [
            [-2.1840639791734278, -79.61955328437847],
            [-2.1806653794058874, -79.61701272856267],
            [-2.175198940686322, -79.61213650043709],
            [-2.172475950650627, -79.61049743215261],
            [-2.164713858722974, -79.60756454304374],
            [-2.1623648853910082, -79.60653859156746],
            [-2.149704238787261, -79.60151052572616],
            [-2.1432663918792287, -79.59896523112167],
            [-2.14169326011558, -79.59834355979481],
            [-2.1395606786949095, -79.5975430743998],
            [-2.1370822823247813, -79.596693952304],
            [-2.1363525454721475, -79.59675572111253],
            [-2.134410734904018, -79.59693582428687],
            [-2.132623710732637, -79.59679597670106],
            [-2.13082181737577, -79.59661447238648],
            [-2.1284430770331704, -79.59559983351863],
            [-2.128606615545067, -79.59368362403792],
            [-2.1288028617350356, -79.59183882608679],
            [-2.128347927340879, -79.5895328286488],
            [-2.1291358855290516, -79.58860745419138],
            [-2.1328377969241994, -79.58617946204585],
            [-2.1365278057630226, -79.58521540634108],
            [-2.1388262516130276, -79.58466494243578],
            [-2.1436907388008866, -79.58364435260216],
            [-2.149170701873631, -79.581701363796],
            [-2.151573197106039, -79.58204651953919],
            [-2.152667401621303, -79.5814901046735],
            [-2.156449537208596, -79.57950248365648],
            [-2.1609274308899398, -79.57719053525577],
            [-2.164022700254155, -79.57553021710386],
            [-2.1628660633596923, -79.57400974653777]
        ],
        'Línea 5': [
            [-2.1656281429477096, -79.6091679042429],
            [-2.162181808484256, -79.60648983946311],
            [-2.156158495435529, -79.60406572790654],
            [-2.150031984430351, -79.60159515871084],
            [-2.1435582224872087, -79.5990588647603],
            [-2.1417348696585887, -79.59832792839629],
            [-2.140212443583939, -79.59772147956981],
            [-2.1379469187439963, -79.59678469974793],
            [-2.136348201977353, -79.59674388764245],
            [-2.1344065149862406, -79.59689644426497],
            [-2.132559735172364, -79.59678245486369],
            [-2.130839491777573, -79.59658647886702],
            [-2.1272119144497594, -79.59626087571426],
            [-2.123960250743435, -79.59671107798017],
            [-2.124094320748037, -79.59452116212762],
            [-2.124125440355908, -79.59325966050238],
            [-2.1242456389691475, -79.58847345361603],
            [-2.124779108004155, -79.58534541332959],
            [-2.1292926472041582, -79.58853630372059],
            [-2.1331485832766304, -79.58603806528966],
            [-2.1365902539530515, -79.5852128835981],
            [-2.140552997844289, -79.58235673615243],
            [-2.14146022178671, -79.58036168068448],
            [-2.1435853898673387, -79.57660051460353]
        ],
            'Línea 6': [
            [-2.1656281429477096, -79.6091679042429],
            [-2.16226002617693, -79.60647781962591],
            [-2.156158495435529, -79.60406572790654],
            [-2.150031984430351, -79.60159515871084],
            [-2.1435582224872087, -79.5990588647603],
            [-2.1417348696585887, -79.59832792839629],
            [-2.140212443583939, -79.59772147956981],
            [-2.1379469187439963, -79.59678469974793],
            [-2.1368803885682746, -79.59579448300899],
            [-2.1381871766012917, -79.59365360154821],
            [-2.1382404433175117, -79.59134286852013],
            [-2.135841433692357, -79.59117837504722],
            [-2.133458215627057, -79.59097803424672],
            [-2.131571707358438, -79.59078947277348],
            [-2.1302934802109172, -79.58997958950015],
            [-2.128545838009728, -79.59028638549147],
            [-2.1281807334692155, -79.58884674266777],
            [-2.1271283403874017, -79.58774703020345],
            [-2.126820337365331, -79.58479359458559],
            [-2.1252410150639403, -79.5811176433973],
            [-2.1229007196064753, -79.57823281702282],
            [-2.1226592609311035, -79.57777955453227],
            [-2.121064736352584, -79.57577455719841],
            [-2.1180629061451217, -79.57246209419954],
            [-2.116746986024778, -79.56932150393101]
        ],
            'Línea 7': [
            [-2.141945035163297, -79.60963581789326],
            [-2.142093678300727, -79.60881770901194],
            [-2.1409666497733495, -79.6077876683719],
            [-2.140322678243981, -79.6052937380551],
            [-2.1418985688928065, -79.60341421626106],
            [-2.142483208501787, -79.60087421421774],
            [-2.143170295020985, -79.59919090762729],
            [-2.1418111413369467, -79.59822829025607],
            [-2.13974348960494, -79.59736698911327],
            [-2.136058398517616, -79.59534744253004],
            [-2.1337630261409677, -79.5935347333691],
            [-2.130537437075304, -79.59317789368652],
            [-2.12919144128526, -79.59296573408761],
            [-2.1288137513473897, -79.5921296437527],
            [-2.126939122161953, -79.59145357091134],
            [-2.1259453414951044, -79.59062257416278],
            [-2.1257310710560953, -79.58951661445515],
            [-2.1267075503017736, -79.58932746423305],
            [-2.127651690307595, -79.58979279294763],
            [-2.1287933152314342, -79.58922121193844],
            [-2.131735353858092, -79.59084107845614],
            [-2.1335073450549493, -79.59097081337801],
            [-2.1342793667209508, -79.58967991195611],
            [-2.1344663188545074, -79.58799837672967],
            [-2.1356654583375505, -79.58730766354952],
            [-2.1362478635044404, -79.58736392077236],
            [-2.1389553597569004, -79.58721424116307],
            [-2.139088081851423, -79.58571894472306],
            [-2.1409526335148454, -79.58582901221988],
            [-2.1421364709097888, -79.58633265057921],
            [-2.1437424631915767, -79.58736926556942]
        ],
            'Línea 8': [
            [-2.159667623812545, -79.59758977253902], 
            [-2.161247691956795, -79.60056645777598], 
            [-2.1619060434404207, -79.60537702528534],
            [-2.1562752541333383, -79.60409703333296],
            [-2.150441668165006, -79.60150373005628],
            [-2.1433963650545627, -79.59876557096108],
            [-2.1418809588892715, -79.5981917728346],
            [-2.1382097730906313, -79.59649756118682],
            [-2.136029570119215, -79.59654148844686],
            [-2.133893260798811, -79.59662934295825],
            [-2.1323568721102415, -79.59649756119275],
            [-2.1303376161392324, -79.59630720973264],
            [-2.1279379171238633, -79.59588257957452],
            [-2.1266063752449806, -79.59517974341409],
            [-2.1263307100424713, -79.5924534211437],
            [-2.125864077478797, -79.58961049509652],
            [-2.1253796637865254, -79.58699539037943],
            [-2.12472088795566, -79.58527864759732],
            [-2.1230327735677026, -79.58389151950733],
            [-2.120397664514715, -79.58163915301343],
            [-2.117446886023464, -79.58015588728703],
            [-2.1141804362832732, -79.57898850224295]
        ],
            'Línea 9': [
           [-2.126534702278908, -79.59512073375149],
            [-2.126304453815802, -79.59224555145663],
            [-2.126043000588667, -79.5908561882225],
            [-2.125817609840083, -79.58964726177201],
            [-2.1268453913864644, -79.58928638820471],
            [-2.1275846724262895, -79.58981867671648],
            [-2.129045389208786, -79.58913916771401],
            [-2.1303190295746894, -79.58816810435204],
            [-2.1326085470847445, -79.58673426858734],
            [-2.1357926386373998, -79.58622597759883],
            [-2.135800219799727, -79.58518663638364],
            [-2.1347312755327748, -79.5817348095682],
            [-2.137051111078964, -79.58067270901596],
            [-2.1384991112592764, -79.57734985148693],
            [-2.1387644514646027, -79.5750890945146],
            [-2.1382716767871033, -79.57382216015961],
            [-2.1384460432296484, -79.57162209481358]
        ],
            'Línea 10': [
            [-2.1403173935313293, -79.57298467934777],
            [-2.1397942947824276, -79.57587511002652],
            [-2.138566149148573, -79.57670961761247],
            [-2.1362008288809142, -79.57679306844521],
            [-2.1332441734748033, -79.5777110267508],
            [-2.134517810352287, -79.58151182945122],
            [-2.1356701475686766, -79.5853202186776],
            [-2.133107712329497, -79.58602575689598],
            [-2.129271632623662, -79.58846100185532],
            [-2.128488161905063, -79.59036916269875],
            [-2.1287505589262414, -79.5920751847442],
            [-2.1286058195918818, -79.59365232354011],
            [-2.1284557195270692, -79.59523482675372],
            [-2.1282144872422184, -79.59800286648712],
            [-2.1285897374368825, -79.60308297042027],
            [-2.1292062197110866, -79.60802896383454],
            [-2.129811980321147, -79.61147292020938],
            [-2.1309591723171555, -79.61476130843317],
            [-2.132208216825713, -79.61830718873523],
            [-2.1383408498571828, -79.63310225368589],
            [-2.1390323777551625, -79.63450236683022]
        ],

   

    };

    appendMessage("¡Hola! Bienvenido a BussBot 🤖🚌. ¿En qué puedo ayudarte hoy? Dime a dónde quieres ir usando frases como 'quiero ir a la unemi'.", 'bot');


    function appendMessage(content, sender, isUpdate = false) {
        let message;
        if (isUpdate) {
            message = document.getElementById('update-message');
            if (!message) {
                message = document.createElement('div');
                message.id = 'update-message';
                message.classList.add('message', sender);
                chatBody.appendChild(message);
            }
            message.innerText = content;
        } else {
            message = document.createElement('div');
            message.classList.add('message', sender);
            message.innerText = content;
            chatBody.appendChild(message);
        }
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function calculateDistance(coord1, coord2) {
        const latDiff = coord1[0] - coord2[0];
        const lonDiff = coord1[1] - coord2[1];
        return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
    }


    chatFooter.addEventListener('submit', function (event) {
        event.preventDefault();
        const input = chatFooter.querySelector('input');
        const userMessage = input.value.trim().toLowerCase();

        if (userMessage !== '') {
            appendMessage(userMessage, 'user');
            input.value = '';

            if (isTravelQuery(userMessage)) {
                handleTravelQuery(userMessage);
            } else {
                appendMessage("No pude entender tu solicitud. Intenta usar un formato reconocido.", 'bot');
            }
        }
    });

    let userLatLng = null; 

    function addCurrentLocationMarker() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                userLatLng = [position.coords.latitude, position.coords.longitude]; 
    
                if (window.map) {
                    L.marker(userLatLng).addTo(window.map)
                        .bindPopup("Estas aqui")
                        .openPopup();
                    window.map.setView(userLatLng, 15);
                } else {
                    console.error("El mapa no está inicializado.");
                }
            }, function (error) {
                console.error("No se pudo obtener la ubicación actual: ", error);
                appendMessage("No se pudo obtener tu ubicación actual. Verifica los permisos de geolocalización.", 'bot');
            });
        } else {
            console.error("La geolocalización no es compatible con este navegador.");
            appendMessage("La geolocalización no es compatible con tu navegador.", 'bot');
        }
    }
    


function traceRoute(destinationLatLng) {
    if (!window.map) {
        console.error("El mapa no está inicializado.");
        return;
    }

    if (window.routeControl) {
        window.map.removeControl(window.routeControl);
    }

    if (destinationMarker) {
        window.map.removeLayer(destinationMarker);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const currentLatLng = [position.coords.latitude, position.coords.longitude];

            if (!currentLocationMarker) {
                currentLocationMarker = L.marker(currentLatLng).addTo(window.map)
                    .bindPopup("Estas aqui")
                    .openPopup();
            }

            destinationMarker = L.marker(destinationLatLng).addTo(window.map);

            window.routeControl = L.Routing.control({
                waypoints: [
                    L.latLng(currentLatLng),
                    L.latLng(destinationLatLng)
                ],
                routeWhileDragging: true,
                showAlternatives: false,
                createMarker: function() { return null; },
                lineOptions: {
                    styles: [{ color: 'black', opacity: 0.7, weight: 4 }]
                },
                show: false
            }).addTo(window.map);
            

            console.log(`Ruta trazada desde la ubicación actual ${currentLatLng} hasta ${destinationLatLng}`);
        }, function (error) {
            console.error("No se pudo obtener la ubicación actual: ", error);
            appendMessage("No se pudo obtener tu ubicación actual. Verifica los permisos de geolocalización.", 'bot');
        });
    } else {
        console.error("La geolocalización no es compatible con este navegador.");
        appendMessage("La geolocalización no es compatible con tu navegador.", 'bot');
    }
}


const lugares = {
    "paseo shopping": "Paseo Shopping Milagro",
    "shopping": "Paseo Shopping Milagro",
    "centro comercial": "Paseo Shopping Milagro",
    "shoping": "Paseo Shopping Milagro",
    "paseo": "Paseo Shopping Milagro",
    "terminal": "Terminal Terrestre",
    "hospital": [-2.132388386626214, -79.57886004912199],    
    "tuti": [-2.136887494838064, -79.59670220987286],    
};



    function isTravelQuery(message) {
        const words = message.split(' ');
        const travelPhrases = ['quiero', 'me', 'deseo'];
    
        if (travelPhrases.includes(words[0]) && words[1] === 'ir') {
            return true;
        }
        return false;
    }

    function handleTravelQuery(message) {
        const words = message.split(' ').slice(2); 
        const ignoreWords = ['al', 'a', 'el', 'la', 'los', 'las'];
        let destinationWords = words.filter(word => !ignoreWords.includes(word.toLowerCase()));
        let destination = destinationWords.join(' ').trim().toLowerCase();
    
        if (destination) {
            let foundKeys = Object.keys(lugares).filter(key => destination.includes(key));
    
            if (foundKeys.length > 1) {
                appendMessage(`Encontré varias ubicaciones para "${destination}": ${foundKeys.join(", ")}. Por favor, especifica cuál prefieres.`, 'bot');
            } else if (foundKeys.length === 1) {
                let foundKey = foundKeys[0];
                let resolvedDestination = lugares[foundKey];
    
                if (Array.isArray(resolvedDestination)) {
                    appendMessage(`Usando ubicación directa para "${foundKey}".`, 'bot');
                    searchLocation(resolvedDestination);
                } else {
                    appendMessage(`Buscando ubicación para "${resolvedDestination}"...`, 'bot');
                    searchLocation(resolvedDestination);
                }
            } else {
                appendMessage(`Buscando ubicación para "${destination}"...`, 'bot');
                searchLocation(destination);
            }
        } else {
            appendMessage("No pude entender tu solicitud. Por favor, asegúrate de que la frase termine con el destino.", 'bot');
        }
    }
    
    
    
    function searchLocation(query, routeName = null) {
        if (Array.isArray(query)) {
            console.log("Se usaron coordenadas directas:", query);
            const destinationLatLng = query; 
            traceRoute(destinationLatLng);
    
            const nearbyRoutes = findNearbyRoutes(destinationLatLng);
            if (nearbyRoutes.length > 0) {
                appendMessage(`Las líneas de buses que pasan cerca de la ubicación son: ${nearbyRoutes.join(", ")}`, 'bot');
            } else {
                appendMessage("No se encontraron líneas de buses que pasen cerca de esta ubicación.", 'bot');
            }
            return; 
        }
    
        if (typeof query !== 'string') {
            console.error("El valor de 'query' no es una cadena:", query, "Tipo:", typeof query);
            appendMessage("Error interno al procesar la ubicación. Inténtalo nuevamente.", 'bot');
            return;
        }
    
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}, Milagro, Ecuador&format=json&limit=1`;
    
        fetch(nominatimUrl)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const destinationLatLng = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                    console.log(`Coordenadas obtenidas de la API: ${destinationLatLng}`);
    
                    window.selectedDestination = destinationLatLng;
    
                    traceRoute(destinationLatLng);
    
                    const nearbyRoutes = findNearbyRoutes(destinationLatLng);
                    if (nearbyRoutes.length > 0) {
                        appendMessage(`Las líneas de buses que pasan cerca de la ubicacionson: ${nearbyRoutes.join(", ")}`, 'bot');
                    } else {
                        appendMessage("No se encontraron líneas de buses que pasen cerca de esta ubicación.", 'bot');
                    }
                } else {
                    appendMessage("No se encontró la ubicación especificada en Milagro.", 'bot');
                }
            })
            .catch(err => {
                console.error(err);
                appendMessage("Error al buscar la ubicación. Inténtalo nuevamente.", 'bot');
            });
    }
    
    
    
    window.findNearbyRoutes = function (destinationLatLng) {
        const thresholdDistance = 0.005;
        const nearbyRoutes = [];
    
        Object.keys(rutas).forEach(routeName => {
            const routeCoordinates = rutas[routeName];
            for (let coord of routeCoordinates) {
                const distance = calculateDistance(coord, destinationLatLng);
                if (distance <= thresholdDistance) {
                    nearbyRoutes.push(routeName);
                    break;
                }
            }
        });
    
        return nearbyRoutes;
    };
});