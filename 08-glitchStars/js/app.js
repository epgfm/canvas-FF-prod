const WIDTH = 1080;
const HEIGHT = 1080;



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
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.rect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "black";
    ctx.fill();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams);

    if (urlParams.has('seed')) {
        var seed = xmur3(urlParams.get('seed'));
        Math.random = xoshiro128ss(seed(), seed(), seed(), seed());
    }


    
    // - pick C points at random between 0 and width
    var columns = [0, WIDTH-1];
    for (var i = 0; i < 100; i++) {
        columns.push(parseInt(Math.random() * WIDTH));
    }
    columns.sort((a, b) => a - b);
    // - pick R points at random between 0 and height
    var rows = [0, HEIGHT-1];
    for (var i = 0; i < 100; i++) {
        rows.push(parseInt(Math.random() * HEIGHT));
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
    // Draw one random diagonal for each rectangle
    ctx.strokeStyle = "white";

    shuffleArray(rectangles);
    for (var i = 0; i < rectangles.length / 2; i++) {
        var rect = rectangles[i];
     // console.log(rect);
        ctx.beginPath();
        if (Math.random() < 0.5) {
            drawLine(rect.xa, rect.ya, rect.xb, rect.yb);  
        }
        else {
            drawLine(rect.xa, rect.yb, rect.xb, rect.ya);
        }
        ctx.stroke();  
    }
    
    // So now I wanna take a line from the center of each column, go
    // down, and highlight every pixel that belongs to a line that
    // I encounter, while erasing the other pixels.
    // We'll highlight in a random (not really) color based on seed
    var rc = [parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255)];
    var imData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    var data = imData.data;
    for (var p = 0; p < data.length; p += 4) {
        if (data[p] == 0 && data[p+1] == 0 && data[p+2] == 0) {
            continue;
        }
        // Non-black pixel: are we on a line?
        var c = (p / 4) % WIDTH;
        // If we're on a line, it means c is the middle of a
        // column
        var isLine = false;
        for (var i = 0; i < columns.length - 1; i++) {
            if (parseInt(columns[i] + (columns[i+1] - columns[i]) / 2) == c) {
                isLine = true;
                break;
            }
        }
        // So now if we're on a line, we paint it, else we set it to black
        if (isLine && Math.random() < 0.5) {
            data[p] = rc[0];
            data[p+1] = rc[1];
            data[p+2] = rc[2];
            data[p+3] = 255;
        }
        else {
            data[p] = 0;
            data[p+1] = 0;
            data[p+2] = 0;
            data[p+3] = 255;
        }
    }
    ctx.putImageData(imData, 0, 0);









    
    var endT = new Date();
    var elapsed = endT - startT;
    console.log("Rendering took " + elapsed + "ms.");
}

document.addEventListener("DOMContentLoaded", handleLoaded);