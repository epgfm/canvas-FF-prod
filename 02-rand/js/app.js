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
    ctx.strokeStyle = randColor();
    for (var i = 0; i < 1920; i += 10) {
        drawLine(i, 0, 1920, 1080);
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = randColor();
    for (var i = 0; i < 1920; i += 10) {
        drawLine(0, 0, i, 1080);
    }
    ctx.stroke();
    var endT = new Date();
    var elapsed = endT - startT;
    console.log("Rendering took " + elapsed + "ms.");
}

document.addEventListener("DOMContentLoaded", handleLoaded);