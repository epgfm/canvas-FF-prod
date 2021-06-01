function drawLine(xa, ya, xb, yb) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(xa, ya);
    ctx.lineTo(xb, yb);
}


function handleLoaded() {
    var startT = new Date();
    console.log("loaded!");
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.rect(0, 0, 1920, 1080);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFFAA";
    // Select target area
    var midx = 1920 / 2;
    var midy = 1080 / 2;
    for (var i = 00; i <= 50; i += 4) {
        // elipse from center to a little above on the left
        ctx.moveTo(midx, midy);
        ctx.bezierCurveTo(midx-5, midy-40, midx-10, midy-50, midx-40, midy-120+i);
        // Straight line to a bottom on the right
        ctx.lineTo(midx+20, midy);
        ctx.moveTo(midx, midy);
        ctx.bezierCurveTo(midx+5, midy-40, midx+10, midy-50, midx+40, midy-120+i);
        ctx.lineTo(midx-20, midy);
        ctx.moveTo(midx-20, midy+20);
    }

    ctx.stroke();
    var endT = new Date();
    var elapsed = endT - startT;
    console.log("Rendering took " + elapsed + "ms.");
}

document.addEventListener("DOMContentLoaded", handleLoaded);