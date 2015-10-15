// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('iberobus', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
      
  });
})

.controller('TodoCtrl', function($scope) {
    
    // Obtener database
    var myDataRef = new Firebase('https://luminous-fire-2676.firebaseio.com/');
    var pasajeros = 0;
    var corrida = false;

    var recorridoDefault = {
        timestamp: Date.now(),
        pasajeros: pasajeros,
    };

    var recorridosDefault = [recorridoDefault];

    var recorridos = recorridosDefault;

    var iberobus = {
        id: "A1",
        asientos: 15,
        capacidadMaxima:20,
        recorridos: {},
    };
    
    $scope.iniciarTrayecto = function (){
        pasajeros = 0;

			recorridos = [];
			iberobus['recorridos'] = recorridos;
			myDataRef.update(iberobus);

			corrida = true;
    };
    
    $scope.terminarTrayecto = function (){
      pasajeros = 0;
			corrida = false;

			recorridos = [];
			iberobus['recorridos'] = recorridos;
			myDataRef.update(iberobus);
    };
    
    $scope.addPassenger = function (){
        pasajeros++;
    };
    
    $scope.removePassenger = function (){
      pasajeros--;
    };
    
    // Subir posicion cada 5 segundos
		navigator.geolocation.watchPosition(function (newPosition) {
			setInterval(function () {

				
				var lat = newPosition.coords.latitude;
				var lng = newPosition.coords.longitude;

				var newRecorrido = {
					lat: lat,
					lng: lng,
					timestamp: Date.now(),
					pasajeros: pasajeros,
				};

				if (corrida === true) {
						recorridos.push(newRecorrido);

						iberobus['recorridos'] = recorridos;

						myDataRef.update(iberobus);
					}
				
			}, 3000);
		});

})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')
  
  $stateProvider.state('home', {
  url: '/home',
  views: {
    home: {
      templateUrl: 'home.html'
    }
  }
})

$stateProvider.state('help', {
  url: '/help',
  views: {
    help: {
      templateUrl: 'help.html'
    }
  }
});
});
