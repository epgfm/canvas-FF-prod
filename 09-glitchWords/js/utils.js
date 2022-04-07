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
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getLocMax(T) {
    // OK so let's pinpoint local maximas.
    // the criteria is a trend up followed by a trend down.
    // A trend up is an augmentation possibly followed by
    // a plateau, possibly followed by an augmentation, etc...
    // A trend down is a decrease possibly followed by a plateau,
    // possibly followed by a decrease, etc...

    // Let's initialize the tracked value to 0, the trend will
    // have to be upward at the start.
    var maxes = [];
    var t = 0;
    var trendUp = true; // Boolean used for easy switch
    // switches are gonna happen when current element is less
    // than previous t and trend is up OR when current element is
    // more than previous t and trend is down.
    for (var i = 0; i < T.length; i++) {
        if (trendUp && T[i] < t) {
            trendUp = !trendUp;
            maxes.push(i);
        }
        if (!trendUp && T[i] > t) {
            trendUp = !trendUp;
        }
        t = T[i];
    }
    return maxes;
}


function getDensities(series, SLIDING_WINDOW_SIZE) {
    var densities = [];
    for (var i = -SLIDING_WINDOW_SIZE/2; i < series.length + SLIDING_WINDOW_SIZE/2; i++) {
        var count = 0;
        for (var c = 0; c < series.length; c++) {
            if (i <= series[c] && series[c] <= i + SLIDING_WINDOW_SIZE) {
                count += 1;
            }
            if (i + SLIDING_WINDOW_SIZE < series[c]) {
                break;
            }
        }
        densities.push(count);
    }
    return densities;
}

/**
 * https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
 * @param {*} str 
 * @returns function used to seed PRNG
 */
function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
    }
    return function() {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

/**
 * https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
 * @param {*} a 
 * @param {*} b 
 * @param {*} c 
 * @param {*} d 
 * @returns function producing random numbers
 */
function xoshiro128ss(a, b, c, d) {
    return function() {
        var t = b << 9, r = a * 5; r = (r << 7 | r >>> 25) * 9;
        c ^= a; d ^= b;
        b ^= c; a ^= d; c ^= t;
        d = d << 11 | d >>> 21;
        return (r >>> 0) / 4294967296;
    }
}