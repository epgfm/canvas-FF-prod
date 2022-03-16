function drawLine(xa, ya, xb, yb) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(xa, ya);
    ctx.lineTo(xb, yb);
}

function drawAngel(ctx, x, y, scale, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        // Select target area
        for (var i = 00; i <= 50*scale; i += 4) {
            // elipse from center to a little above on the left
            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x - 5*scale, y - 40*scale, x - 10*scale, y - 50*scale, x - 40*scale, y - 120*scale + i);
            // Straight line to a bottom on the right
            ctx.lineTo(x + 20*scale, y);
            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x + 5*scale, y - 40*scale, x + 10*scale, y - 50*scale, x + 40*scale, y - 120*scale + i);
            ctx.lineTo(x - 20*scale, y);
            ctx.moveTo(x - 20*scale, y + 20*scale);
        }
        ctx.stroke();
}

function randBlueColor() {
    var shade = randHexLight() + randHexLight();
    return "#" + shade + shade + "FF";
}

function handleLoaded() {
    var startT = new Date();
    console.log("loaded!");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams);

    c = [255, 0, 0];

    if (urlParams.has('r')) {
        c[0] = parseInt(urlParams.get('r'));
    }
    if (urlParams.has('g')) {
        c[1] = parseInt(urlParams.get('g'));
    }
    if (urlParams.has('b')) {
        c[2] = parseInt(urlParams.get('b'));
    }

    // Alright, so let's map this shit out
    // I need non-overlapping random squares
    // I need them in a list
    // I need like 20 of them
    // Then each square will get an assigned probability
    // Based on the probability each square will be painted w/ red dots

    // How to do this?
    // I figure step 1: pick N points to bisect X axis at (random)
    // then pick N points to bisect Y axis at (random)
    // then pick 20 random indices between 0 and N**2-1

    /**
     
    x0    x1                    x2                  x3   x4
 y0 .-----.---------------------.-------------------.----.-----------------------.
    |
    |
    |
 y1 |     .                     .                   .    .                       .
    |
    |
 y2 |
    |
    |
    |
    |
    |
    |
    |
 y4 |
    |
    |
 y5 |
    |
    |
    |

     */

    // Each indice generates coordinates for a square:
    // indice 0 generates ((x0, y0), (x1, y1))
    // indice 1 generates ((x1, y0), (x2, y1))
    // indice 2 generates ((x2, y0), (x3, y1))
    // indice i*r+c generates (xc, yr), (xc+1, yr+1)



    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.rect(0, 0, 1079, 1079);
    ctx.fillStyle = "black";
    ctx.fill();


    // Generates C random values
    var columns = [0, 1079];
    for (var i = 0; i < 20; i++) {
        columns.push(parseInt(Math.random() * 1080));
    }
    columns.sort((a, b) => a - b);

    var rows = [0, 1079];
    for (var i = 0; i < 20; i++) {
        rows.push(parseInt(Math.random() * 1080));
    }
    rows.sort((a, b) => a - b);

    var rectangles = [];
    for (var i = 0; i < rows.length - 1; i++) {
        for (var j = 0; j < columns.length - 1; j++) {
            rectangles.push({
                xa: columns[j],
                ya: rows[i],
                xb: columns[j+1],
                yb: rows[i+1]
            });
        }
    }

    shuffleArray(rectangles);

    ctx.strokeStyle = "white";
    for (var i = 0; i < (rectangles.length / 5); i++) {
        var r = rectangles[i];
        var w = r.xb - r.xa;
        var h = r.yb - r.ya;
        if (w == 0 || h == 0) {
            continue;
        }
        var imData = ctx.createImageData(w, h);
        var data = imData.data;
        var p = Math.random();
        ctx.moveTo(r.xa, r.ya);
        for (var j = 0; j < data.length; j += 4) {
            if (Math.random() < p) {
                data[j] = c[0];
                data[j+1] = c[1];
                data[j+2] = c[2];
                data[j+3] = 255;
            } else {
                data[j] = 0;
                data[j+1] = 0;
                data[j+2] = 0;
                data[j+3] = 255;
            }
        }
        ctx.putImageData(imData, r.xa, r.ya);
    }


    /*
    for (var i = 0; i < 400; i++) {
        // Pick random pos
        var rx = parseInt(Math.random() * 1920);
        var ry = parseInt(Math.random() * 1080);
        // Pick random scale
        var rs = Math.random();
        drawAngel(ctx, rx, ry, rs * 0.5, randBlueColor());
    }
    //*/
    var endT = new Date();
    var elapsed = endT - startT;
    console.log("Rendering took " + elapsed + "ms.");
}

document.addEventListener("DOMContentLoaded", handleLoaded);