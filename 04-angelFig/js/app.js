function drawLine(xa, ya, xb, yb) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(xa, ya);
    ctx.lineTo(xb, yb);
}

function drawAngel(ctx, x, y, scale) {
        ctx.beginPath();
        ctx.strokeStyle = "#FFFFFFAA";
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

function handleLoaded() {
    var startT = new Date();
    console.log("loaded!");
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.rect(0, 0, 1920, 1080);
    ctx.fillStyle = "black";
    ctx.fill();
    drawAngel(ctx, 1920 / 2, 1080 / 2 + 400, 5);
    drawAngel(ctx, 1920 / 2, 1080 / 2, 2);
    drawAngel(ctx, 1920 / 2, 1080 / 2 - 170, 0.7);
    var endT = new Date();
    var elapsed = endT - startT;
    console.log("Rendering took " + elapsed + "ms.");
}

document.addEventListener("DOMContentLoaded", handleLoaded);