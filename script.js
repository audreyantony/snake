window.onload = function(){

    var canvas;
    var ctx;
    var delay = 100;
    var xPos = 0;
    var yPos = 0;

    init();

    function init(){
        canvas = document.createElement('canvas');
        canvas.width = 900;
        canvas.height = 600;
        canvas.style.border = ' 2px solid';
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        movementSnake();
    }

    function movementSnake() {
        xPos += 2;
        yPos += 2;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle ="#ff0000";
        ctx.fillRect(xPos,yPos,100,50);
        setTimeout(movementSnake, delay);
    }
};