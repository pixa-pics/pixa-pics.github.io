import ReactDOMServer from 'react-dom/server'
import React from "react";
import svg64 from "svg64";
import pool from "../utils/worker-pool";

function get_svg_in_b64_async(Component, callback_function) {

    const process_function_string = `return async function(
           svg_string 
        ) {

            /**
             * Code modified from http://www.webtoolkit.info/ 
             **/
            var Base64 = {
                characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
                encode: function (input) {
                    var output = '';
                    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                    var i = 0;
        
                    input = Base64.utf8Encode(input);
        
                    while (i < input.length) {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);
        
                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;
        
                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }
        
                        output =
                            output +
                            this.characters.charAt(enc1) +
                            this.characters.charAt(enc2) +
                            this.characters.charAt(enc3) +
                            this.characters.charAt(enc4);
                    }
        
                    return output;
                },
                utf8Encode: function (string) {
                    string = string.replace(/\r\n/g, '\n');
                    var utftext = '';
        
                    for (var n = 0; n < string.length; n++) {
                        var c = string.charCodeAt(n);
        
                        if (c < 128) {
                            utftext += String.fromCharCode(c);
                        } else if (c > 127 && c < 2048) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                        } else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                    }
        
                    return utftext;
                }
            };
        
            var PREFIX = 'data:image/svg+xml;base64,';
            
            var detectInputType = function (input) {
                if (typeof input === 'string') {
                    return 'string';
                }
        
                if (typeof SVGElement !== 'undefined' && input instanceof SVGElement) {
                    return 'element';
                }
            };
        
        
            var convertElement = function (element) {
                var XMLS = new XMLSerializer();
                var svg = XMLS.serializeToString(element);
        
                return getBase64(svg);
            };
            
            var getBase64 = function (svg) {
                return PREFIX + Base64.encode(svg);
            };
            
          
            var svg = svg_string;
            var type = detectInputType(svg);
        
            switch (type) {
                case 'string':
                    return getBase64(svg);
                case 'element':
                    return convertElement(svg);
                default:
                    return svg;
            }
        }`;

    let svg_string = ReactDOMServer.renderToString(Component);

    (async () => {

        let result = await pool.exec(process_function_string, [
            svg_string
        ]).catch((error) => {

            return svg64(svg_string);

        }).timeout(120000);

        callback_function(result);
    })();
}


module.exports = get_svg_in_b64_async;