window.onload = function(){

    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSnake = 30;
    var ctx;
    var delay = 100;
    var theSnake;

    init();

    function init(){
        let canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = '2px solid';
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        theSnake = new snake([[6,4],[5,4],[4,4]]);
        movementSnake();
    }

    function movementSnake() {
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
        theSnake.draw();
        setTimeout(movementSnake, delay);
    }

    function drawBlockSnake(ctx, position){
        let x = position[0] * blockSnake;
        let y = position[1] * blockSnake;
        ctx.fillRect(x,y,blockSnake, blockSnake);
    }

    function snake(body){
        this.body = body;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#4F6742";
            for(let i = 0; i < this.body.length ; i++){
                drawBlockSnake(ctx, this.body[i])
            }
            ctx.restore();
        };
    }
};