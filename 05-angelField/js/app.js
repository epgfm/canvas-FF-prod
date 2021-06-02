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
    ctx.rect(0, 0, 1920, 1080);
    ctx.fillStyle = "black";
    ctx.fill();
    for (var i = 0; i < 400; i++) {
        // Pick random pos
        var rx = parseInt(Math.random() * 1920);
        var ry = parseInt(Math.random() * 1080);
        // Pick random scale
        var rs = Math.random();
        drawAngel(ctx, rx, ry, rs * 0.5, randBlueColor());
    }
    var endT = new Date();
    var elapsed = endT - startT;
    console.log("Rendering took " + elapsed + "ms.");
}

document.addEventListener("DOMContentLoaded", handleLoaded);