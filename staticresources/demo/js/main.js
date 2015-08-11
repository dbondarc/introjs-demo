( function( $, win, doc, undefined ) {
	var _DOT = ".",
		sfpRgx = /%\+?(\d+\$)?(0|'.)?(-)?(\d+)?(\.\d+)?(.)/g,
		arrProto = Array.prototype,
		push = arrProto.push,
		slice = arrProto.slice;
	
	DEMO = {
		version: "1.0.0-winter15.126",
		apply: function( obj ) {
			$.extend( true, DEMO, obj );
		}
	};
	
	DEMO.apply({
		env: {
			isMobile: null
		},
		getNS: function() {
			var args = arguments,
				l1 = args.length,
				i = 0, l2, j, m, n, sub, cur;

			for ( ; i < l1; ++i ) {
				m = args[ i ];
				n = m.split( _DOT );
				cur = win[ n[ 0 ] ];
		
				if ( cur === undefined ) {
					cur = win[ n[ 0 ] ] = {};
				}
		
				sub = n.slice( 1 );
				l2 = sub.length;
		
				for( j = 0; j < l2; ++j ) {
					cur = cur[ sub[ j ] ] = cur[ sub[ j ] ] || {};
				}
			}

			return cur;
		},
		
		// Handles any primitive app init tasks
		appInit: function( e ) {
			var b = doc.querySelector( "body" ),
				bEnvCls = ( DEMO.env.isMobile ) ? "demo-env-mobile" : "demo-env-desktop";
			
			// Add Env Type class to body, set global prop
			b.classList.add( bEnvCls );
			
			// Creates container at BODY close tag, for popovers, tooltips, menus and other elemts
			// that need to be positioned absolute
			var absCont = doc.querySelectorAll( ".abs-container" ), absContDiv;
	
			if ( absCont.length === 0 ) {
				absContDiv = doc.createElement( "div" );
				absContDiv.setAttribute( "class", "bs3 abs-container" );
				b.appendChild( absContDiv );
			}
			
			// Detach
			doc.removeEventListener( "DOMContentLoaded", DEMO.appInit, false );
		},
		utils: {
			json: {
				// Trys to parse using window.JSON, if it fails, check to see if jsonStr is 'safe' then evaluates it
				// Returns: OBJECT
				// These will work: "{test: 123}" & '{"test": 123}'
				// These will fail: "(function(){alert("123")})()" & "function(){return 123}()"
				parse: function( jsonStr, noErr ) {
					var errStr = "Cannot encode an invalid JSON string: ", jsonObj;
			
					if ( !!String( jsonStr ).match(/^{.*}$|^\[.*\]$/) ) {
						try {
							jsonObj = win.JSON.parse( jsonStr );
						} catch ( e ) {
							try {
								jsonObj = ( Function( "return " + jsonStr ) )();
							} catch ( e ) {
								console.error( errStr, e, jsonStr );
							}
						}
					} else if ( !noErr ) {
						console.error( errStr, jsonStr );
					}
			
					return jsonObj;
				}
			},
			
			removeClsByNs: function( element, clsPfx ) {
				var el, clsLst, i = 0, cls;
				
				// Plain Element passed in
				if ( win.Element && ( element instanceof Element ) ) {
					el = element;
					
				// Assume jQuery or querySelectorAll passed in
				} else if ( element instanceof jQuery || element instanceof NodeList ) {
					el = element[ 0 ];
				}
				
				if ( el ) {
					clsLst = el.classList
					
					for ( ; i < clsLst.length; i++ ) {
						cls = clsLst[ i ];
					
						if ( cls.indexOf( clsPfx ) === 0 ) {
							clsLst.remove( cls );
						}
					}
				}
			},
			genUniqueId: function( pfx, len, rdx ) {
				var rnd = Math.random().toString( rdx || 16 ).slice( 2 );
				pfx = pfx || "demo-";
				len = len || pfx.length + 7;
				if ( pfx.length > 2 && pfx[ pfx.length - 1 ] !== "-" ) { pfx = pfx + "-"; }
				return pfx + rnd.slice( rnd.length - len );
			},
			jqObjExists: function( $obj ){
				if ( $obj instanceof jQuery && $obj.length > 0 ) {
					return $obj;
				}
				
				return undefined;
			},
			randInt: function( min, max ) {
			    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
			},
			htmlDecode: function( input ) {
			  var e = doc.createElement( "div" ); e.innerHTML = input;
			  return ( e.childNodes.length === 0 ) ? "" : e.childNodes[ 0 ].nodeValue;
			},
			stripHtml: function( html ) {
				return String( html ).replace(/<[^>]+>/gm, "" );
			},
			envDetect: function() {
				var userAgent = win.navigator.userAgent;
							
				return {
					getUserAgent: function() {
						return userAgent;
					},
					isiOS: function() {
						return ( /(iPad|iPhone|iPod)/gi ).test( userAgent );
					},
					isAndroid: function() {
						return ( /(Android)/gi ).test( userAgent );
					},
					isWindowsPhone: function() {
						return ( /(IEMobile)/gi ).test( userAgent );
					},
					isBB10: function() {
						return ( /(BB10)/gi ).test( userAgent );
					},
					isMobile: function() {
						var s = this;
						return ( s.isiOS() || s.isAndroid() || s.isWindowsPhone() || s.isBB10() );
					}
				};
			},
			/**
			* // Type casting...
			* sprintf('%s', 10); // '10'
			* sprintf('%s', 'abc'); // 'abc'
			*
			* // Escape anything else
			* sprintf('%%', 1); // '%'
			* sprintf('%T', 'abc'); // 'T'
			*
			* // Limit length
			* sprintf("%.5s", 'abcdef'); // 'bcdef'
			* sprintf("%-.5s", 'abcdef'); // 'abcde'
			*
			* // Indent to length
			* sprintf("%5s", 'a'); // '    a'
			* sprintf("%-5s", 'a'); // 'a    '
			* sprintf("%5.4s", 'abc'); // ' abc'
			* sprintf("%-5.4s", 'abc'); // 'abc '
			*
			* // Use pad chars
			* sprintf("%04s", 10); // "0010"
			* sprintf("%'#4s", 10); // "##10"
			*
			* // Use arguments in order
			* sprintf("%1$s, %2$s, %2$s, %1$s!", 'left', 'right'); // 'left, right, right, left!'
			* 
			* 
			* REF: https://github.com/nickyout/tiny-sprintf/blob/master/dist/sprintf.bare.js
			*/
			sprintf: function( str ) {
				var value, index = 1, execMatch, tempVar1, tempVar2;
				while ( execMatch = sfpRgx.exec( str ) ) {
					value = execMatch[ 6 ];
					if ( value == "s" ) {
						if ( ( value = execMatch[ 1 ] ) && value[( tempVar1 = value.length - 1 )] == "$" ) {
							value = value.substr( 0, tempVar1 );
						}

						value = arguments[ value || index ] + "";

						if ( tempVar1 = execMatch[ 2 ] ) {
							if ( tempVar1[ 0 ] == "'" ) {
								tempVar1 = tempVar1[ 1 ];
							}
						} else {
							tempVar1 = " ";
						}

						if ( tempVar2 = execMatch[ 4 ] ) {
							while ( value.length < tempVar2 ) {
								value = execMatch[ 3 ] ? ( value + tempVar1 ) : ( tempVar1 + value );
							}
						}
						if ( ( tempVar1 = execMatch[ 5 ] && execMatch[ 5 ].substr( 1 ) ) && value.length > tempVar1 ) {
							value = execMatch[ 3 ] ? value.substr( 0, tempVar1 ) : value.substr( value.length - tempVar1 );
						}
						index++;
					}
					str = str.substr( 0, tempVar1 = execMatch.index ) + value + str.substr( sfpRgx.lastIndex );
					sfpRgx.lastIndex = value.length + tempVar1;
				}
				return str;
			}
		},
		lodashMixins: {
			args2Arr: Function.prototype.call.bind( slice ),
			pushValues: function( arr, arrVals ) {
				return push.apply( arr, arrVals );	
			},
			findByValues: function( collection, property, values ) {
				return _.filter( collection, function( item ) {
					return _.contains( values, item[ property ] );
				});
			},
			findKeys: function( obj, search, context ) {
				var match, isFn = _.isFunction( search ), result = [];
				_.each( obj, function( value, key ) {
					match = isFn ? search.call( context, value, key, obj ) : value === search;
					if ( match ) { result.push( key ); }
				});
				return result;
			},
			isFalse: function( val ) { return ( typeof val === "string" ) ? ( val.toLowerCase() === "false" ) : ( val === false ); },
			isTrue: function( val ) { return ( typeof val === "string" ) ? ( val.toLowerCase() === "true" ) : ( val === true ); },
			parseBool: function( val ) {
				switch ( String( val ).toLowerCase() ) {
					case "true": case "1": case "yes": case "y": return true;
					case "false": case "0": case "no": case "n": return false;
					default: return undefined;
				}
			},
			isBool: function( val ) {
				return ( typeof val === "boolean" );
			},
			
			// based on type-name: https://github.com/twada/type-name
			typeName: function( val ) {
				var type, toStr = Object.prototype.toString,
					funcName = function( f ) {
						return f.name ? f.name : /^\s*function\s*([^\(]*)/im.exec( f.toString() )[ 1 ];
					},
					ctorName = function( obj ) {
						var strName = toStr.call( obj ).slice( 8, -1 );

						if ( strName === "Object" && obj.constructor ) {
							return funcName( obj.constructor );
						}
						return strName;
					};

				if ( val === null ) { return "null"; }
				
				type = typeof( val );
				
				if ( type === "object" ) { return ctorName( val ); }
				
				return type;
			},
			
			ord: function( n ) {
				var sfx = [ "th", "st", "nd", "rd" ], v = n % 100;
				return sfx[ ( v - 20 ) % 10 ] || sfx[ v ] || sfx[ 0 ];
			},
			move: function( array, fromIndex, toIndex ) {
				array.splice( toIndex, 0, array.splice( fromIndex, 1 )[ 0 ] );
				return array;
			},
			
			eachAsync: function( array, fn, callback, delay ) {
				array = array.slice( 0 );
				callback = _.isFunction( callback ) ? callback : _.noop;
				delay = delay || 0,
				idx = -1;

				var processOne = function() {
					var item = array.pop();
					
					fn( item, ++idx, function( result ) {
						if ( array.length > 0 ) {
							setTimeout( processOne, delay );
						} else {
							callback();
						}
					});
				};

				if ( array.length > 0 ) {
					setTimeout( processOne, delay );
				} else {
					callback();
				}
			}
		}
	});
	
	// Set isMobile
	DEMO.env.isMobile = DEMO.utils.envDetect().isMobile();

	// DEPRECATED, use 'DEMO.utils.json.parse', will be removed soon.
	DEMO.apply( {
		utils: {
			jsonEncode: DEMO.utils.json.parse
		}
	});

	// Create Angular module if available
	if ( "angular" in win ) {
		angular.module( "demo.global", [] ).provider( "ngDEMO", [ function() {
			return {
				$get: function() {
					return DEMO;
				}
			};
		}]);
	}
	
	// Create Lodash mixin's if Lodash is available
	if ( "_" in win ) {
		_.mixin( DEMO.lodashMixins );
	}
	
	//On DOM READY...
	doc.addEventListener( "DOMContentLoaded", DEMO.appInit, false );
	
	
})( jQuery, window, document );
