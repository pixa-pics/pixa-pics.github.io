import ReactDOMServer from 'react-dom/server'
import React from "react";
import svg64 from "svg64";

function _hexToRGB(h) {

    return h.match(/\w\w/g).map(x => parseInt(x, 16));
}

function _RGBToHex(r,g,b) {

    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}

function get_svg_in_b64(Component, bw = false) {

    let svg_string = ReactDOMServer.renderToString(Component);

    if(bw) {
        const regex_color_hex = /(?:#)[0-9a-f]{8}|(?:#)[0-9a-f]{6}|(?:#)[0-9a-f]{4}|(?:#)[0-9a-f]{3}/ig;
        let array = svg_string.match(regex_color_hex);

        array.forEach(function(color){

            const [r, g, b] = _hexToRGB(color);
            const av = Math.round((r + g + b) / 3);
            const new_color = _RGBToHex(av, av, av);
            svg_string = svg_string.replace(color, new_color);
        })
    }

    return svg64(svg_string);
}

module.exports = get_svg_in_b64;