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


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
