( function( $, ng, undefined ) {

	/**
	* @module Module Dialer
	* ...
	* ...
	*/
	var module = ng.module( "demo.dialer", [
		"mgcrea.ngStrap",
		"ngAnimate",
		"demo.intro",
		"demo.intro.data",
		"ui.router"
	]);

	navlist = [{
		text: "Basic Flow",
		sref: "basicflow",
		title: "Dialer Intro: Basic Flow Icon",
		alt: "Dialer Intro: Basic Flow Icon"
	},
	{
		text: "Click to Connect",
		sref: "clickconnect",
		title: "Dialer Intro: Click to Connect Icon",
		alt: "Dialer Intro: Click to Connect Icon"
	},
	{
		text: "Shotgun",
		sref: "shotgun",
		title: "Dialer Intro: Shotgun Settings Icon",
		alt: "Dialer Intro: Shotgun Settings Icon"
	},					
	{
		text: "Take Action",
		sref: "takeaction",
		title: "Dialer Intro: Take Action Settings Icon",
		alt: "Dialer Intro: Take Action Settings Icon"
	},
	{
		text: "Transfers",
		sref: "transfers",
		title: "Dialer Intro: Transfers Settings Icon",
		alt: "Dialer Intro: Transfers Settings Icon"
	},
	{
		text: "Voicemail",
		sref: "voicemail",
		title: "Dialer Intro: Voicemail Settings Icon",
		alt: "Dialer Intro: Voicemail Settings Icon"
	},
	{
		text: "Dialer Settings",
		sref: "dialersettings",
		title: "Dialer Intro: Dialer Settings Icon",
		alt: "Dialer Intro: Dialer Settings Icon"
	}];

	module.config( [ "ngDEMOProvider", "$stateProvider", "$urlRouterProvider", "$locationProvider", function( ngDEMOProvider, $stateProvider, $urlRouterProvider, $locationProvider ) {
		var ngDEMO = ngDEMOProvider.$get();

		// Routing
		$locationProvider.html5Mode( { enabled: false, requireBase: false } );
		$urlRouterProvider.otherwise( "/" );

		$stateProvider
			.state( "mainnav", {
				url: "/mainnav",
				next: "basicflow",
				views: {
					tutorial: {
						templateUrl: ngDEMO.resourcePaths.templates + "dialer/tutorial/mainnav.html"
					}
				}
			})
			.state( "basicflow", {
				url: "/basicflow",
				next: "clickconnect",
				views: {
					tutorial: {
						templateUrl: ngDEMO.resourcePaths.templates + "dialer/tutorial/basicflow.html"
					}
				}
			})
			.state( "clickconnect", {
				url: "/clickconnect",
				next: "shotgun",
				views: {
					tutorial: {
						templateUrl: ngDEMO.resourcePaths.templates + "dialer/tutorial/clickconnect.html"
					}
				}
			})
			.state( "shotgun", {
				url: "/shotgun",
				next: "takeaction",
				views: {
					tutorial: {
						templateUrl: ngDEMO.resourcePaths.templates + "dialer/tutorial/shotgun.html"
					}
				}
			})
			.state( "takeaction", {
				url: "/takeaction",
				next: "transfers",
				views: {
					tutorial: {
						templateUrl: ngDEMO.resourcePaths.templates + "dialer/tutorial/takeaction.html"
					}
				}
			})
			.state( "transfers", {
				url: "/transfers",
				next: "voicemail",
				views: {
					tutorial: {
						templateUrl: ngDEMO.resourcePaths.templates + "dialer/tutorial/transfers.html"
					}
				}
			})		
			.state( "cold", {
				url: "/cold",
				next: "warm",
				views: {
					tutorial: {
						templateUrl: ngDEMO.resourcePaths.templates + "dialer/tutorial/cold.html"
					}
				}
			})				
			.state( "warm", {
				url: "/warm",
				next: "nohold",
				views: {
					tutorial: {
						templateUrl: ngDEMO.resourcePaths.templates + "dialer/tutorial/warm.html"
					}
				}
			})	
			.state( "nohold", {
				url: "/nohold",
				next: "transfers",
				views: {
					tutorial: {
						templateUrl: ngDEMO.resourcePaths.templates + "dialer/tutorial/nohold.html"
					}
				}
			})
			.state( "voicemail", {
				url: "/voicemail",
				next: "dialersettings",
				views: {
					tutorial: {
						templateUrl: ngDEMO.resourcePaths.templates + "dialer/tutorial/voicemail.html"
					}
				}
			})
			.state( "dialersettings", {
				url: "/dialersettings",
				next: "mainnav",				
				views: {
					tutorial: {
						templateUrl: ngDEMO.resourcePaths.templates + "dialer/tutorial/dialersettings.html"
					}
				}
			}
		);
	}]);

	module.controller( "TutCtrl", [ "$scope", "$rootScope", "ngDEMO", "introsConfigDialer", "demoIntro", "$timeout", "$state", function( $scope, $rootScope, ngDEMO, introsConfigDialer, demoIntro, $timeout, $state ) {

		$scope.navlist = navlist;

		// TODO: Find a better way to dynamically call the function inside the object 
		function switchPage( page ){

			demoIntro().exit();		// closes prior instance of intro -important for SubNav to work
			ng.element(".introjs-overlay").remove();

			switch ( page ) {
				case "mainnav":
					$scope.IntroOptions = {};
					break;
				case "basicflow":
					$scope.IntroOptions = { basicflow: introsConfigDialer.basicflow() };
					break;
				case "clickconnect":
					$scope.IntroOptions = { clickconnect: introsConfigDialer.clickconnect() };
					break;
				case "shotgun":
					$scope.IntroOptions = { shotgun: introsConfigDialer.shotgun() };
					break;
				case "transfers":
					$scope.IntroOptions = { transfers: introsConfigDialer.transfers() };
					break;
				case "cold":
					$scope.IntroOptions = { cold: introsConfigDialer.cold() };
					break;
				case "warm":
					$scope.IntroOptions = { warm: introsConfigDialer.warm() };
					break;
				case "nohold":
					$scope.IntroOptions = { nohold: introsConfigDialer.nohold() };
					break;				
				case "voicemail":
					$scope.IntroOptions = { voicemail: introsConfigDialer.voicemail() };
					break;					
				case "takeaction":
					$scope.IntroOptions = { takeaction: introsConfigDialer.takeaction() };
					break;	
				case "dialersettings":
					$scope.IntroOptions = { dialersettings: introsConfigDialer.dialersettings() };
					break;				
				case null:
					break;
			}
		}

		$rootScope.$on( "$stateChangeSuccess" , function( e, toState, toParams, fromState, fromParamse ) {
			var page = $state.href( toState.name, toParams ).replace( "#/", "" );
				
			$timeout( function (){
				switchPage(page);
				ng.element( ".subnav" ).addClass( "introjs-showElement" );  //show submenu

				var intro = demoIntro(), 
					stateName = toState.name,
					next = toState.next,
					skip = toParams,
					opts = $scope.IntroOptions[ stateName ];

				intro.setOptions( opts ).start()
					.oncomplete( function() {
		            	$state.go( next );
		        	})
					.onexit( function() {
						resetDataSteps();
						demoIntro().exit();
				    	window.location.hash = "#mainnav"; 
					});

				ng.element(".introjs-skipbutton").on("click", function() {
		    		$state.go( next ); 
				});

				function resetDataSteps(){
					ng.element( "[data-step]" ).attr( "data-step", "" );
				}

				function setDataSteps( el ){
					el.each(function(i,v){
						i++;
						ng.element(v).attr( "data-step", i );
					});
				}

				$scope.subnav = function( $event, cls ) {
					var el = ng.element( "."+cls+" [data-step]" );
					resetDataSteps();
					setDataSteps(el);
					setTimeout( function() {
						demoIntro()
							.exit()
							.start()
							.onchange( function() { })
							.onexit( function() {
								resetDataSteps();
								window.location.href = "#/transfers";
							});
					}, 600 );
				}		
			}, 800 );
		});
	}]);

	module.directive( "toggleCls", function() {
	    return {
	        restrict: 'A',
	        link: function( scope, element, attrs ) {
	            element.bind( 'click', function() {
	            	var args = attrs.toggleCls.split(',');
	            	ng.element(args[0]).toggleClass(args[1]).toggle(500);
	            });
	        }
	    };
	});

	module.directive( "slidePane", function() {
	    return {
	        restrict: 'A',
	        link: function( scope, element, attrs ) {
	            element.bind( "click", function() {
	            	ng.element( ".push-nav" ).removeClass( "open" );
	            	ng.element( "."+attrs.slidePane ).addClass( "open" );
	            });
	        }
	    };
	});

})( jQuery, angular );