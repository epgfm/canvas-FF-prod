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
    ctx.strokeStyle = "#FFFFFF";
    // Select target area
    var leftX = parseInt(Math.random() * 1920);
    var rightX = parseInt(Math.random() * 1920);
    if (leftX > rightX) {
        var tmp = leftX;
        leftX = rightX;
        rightX = tmp;
    }
    // three times
    for (var i = 0; i < 3; i++) {
        // pick random point on the top side
        var startx = parseInt(Math.random() * 1920);
        for (var j = leftX; j < rightX; j += 2) {
            drawLine(startx, 0, j, 1080);
        }
    }
    ctx.stroke();
    var endT = new Date();
    var elapsed = endT - startT;
    console.log("Rendering took " + elapsed + "ms.");
}

document.addEventListener("DOMContentLoaded", handleLoaded);