function randHex() {
    var hexes = "0123456789ABCDEF";
    var i = parseInt(Math.random() * 16);
    return hexes[i];
}

function randHexLight() {
    var hexes = "89ABCDEF";
    var i = parseInt(Math.random() * 8);
    return hexes[i];
}

function randColor() {
    var out = "#";
    for (var i = 0; i < 6; i++) {
        out += randHex();
    }
    return out;
}
