window.onload = function(){

    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSnake = 30;
    var widthBlockSnake = canvasWidth/blockSnake;
    var heightBlockSnake = canvasHeight/blockSnake;
    var ctx;
    var delay = 100;
    var theSnake;
    var directionSnake;
    var theFood;

    init();

    function init(){
        let canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = '10px solid #95a595';
        canvas.style.margin = "10px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#bfc9bf";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        theSnake = new snake([[6,4],[5,4],[4,4],[3,4],[2,4]], 'right');
        theFood = new food([10,10]);
        score = 0;
        movementCanvas();
    }

    function movementCanvas() {
        theSnake.advance();
        if (theSnake.collision()){
            gameOver();
        } else {
            if (theSnake.eatingFood(theFood)){
                score ++;
                theSnake.ateTheFood = true;
                do {
                    theFood.otherFoodPosition();
                } while (theFood.foodOnSnake(theSnake))
            }
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
        showScore();
        theSnake.draw();
        theFood.draw();
        setTimeout(movementCanvas, delay);
        }
    }

    function gameOver(){
        ctx.save();
        ctx.font = "bold 100px sans-serif";
        ctx.fillStyle = "#95a595";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = "10px";
        ctx.fillText("Game Over", canvasWidth/2, 135);
        ctx.strokeText("Game Over", canvasWidth/2, 135);
        ctx.font = "bold 32px sans-serif";
        ctx.strokeStyle = "white";
        ctx.lineWidth = "10px";
        ctx.fillText("Appuyez sur 'Enter' pour recommencer une partie", canvasWidth/2, 240);
        ctx.strokeText("Appuyez sur 'Enter' pour recommencer une partie", canvasWidth/2, 240);
        ctx.restore();
    }

    function resume(){
        theSnake = new snake([[6,4],[5,4],[4,4],[3,4],[2,4]], 'right');
        theFood = new food([10,10]);
        score = 0;
        movementCanvas();
    }
    
    function showScore() {
        ctx.save();
        ctx.font = "bold 50px sans-serif";
        ctx.fillStyle = "#95a595";
        ctx.fillText(score.toString(), canvasWidth/2,canvasHeight - 15);
        ctx.restore();
    }

    function drawBlockSnake(ctx, position){
        let x = position[0] * blockSnake;
        let y = position[1] * blockSnake;
        ctx.fillRect(x,y,blockSnake, blockSnake);
    }

    function snake(body, direction){
        this.body = body;
        this.direction = direction;
        this.ateTheFood = false;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#4F6742";
            for(let i = 0; i < this.body.length ; i++){
                drawBlockSnake(ctx, this.body[i])
            }
            ctx.restore();
        };
        this.advance = function () {
            let nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "left":
                    nextPosition[0]--;
                    break;
                case "right":
                    nextPosition[0]++;
                    break;
                case "down":
                    nextPosition[1]++;
                    break;
                case "up":
                    nextPosition[1]--;
                    break;
                default :
                    throw("La direction n'est pas valide");
            }
            this.body.unshift(nextPosition);
            if (!this.ateTheFood){
                this.body.pop();
            } else {
                this.ateTheFood = false;
            }
        };
        this.setDirection = function(directionSnake){
            let directionValide;
            switch (this.direction) {
                case "left":
                case "right":
                    directionValide = ["up", "down"];
                    break;
                case "down":
                case "up":
                    directionValide = ["left", "right"];
                    break;
                default :
                    return;
            }
            if(directionValide.indexOf(directionSnake)> -1){
                this.direction = directionSnake;
            }
        };
        this.collision = function(){
            var collisionMur = false;
            var collisionSnake = false;
            let snakeHead = this.body[0];
            var snakeBody = this.body.slice(1);
            var snakeHeadX = snakeHead[0];
            var snakeHeadY = snakeHead[1];
            let minX = 0;
            let minY = 0;
            let maxX = widthBlockSnake - 1;
            let maxY = heightBlockSnake - 1;
            let snakeDansMurLargeur = snakeHeadX < minX || snakeHeadX > maxX;
            let snakeDansMurHauteur = snakeHeadY < minY || snakeHeadY > maxY;

            if (snakeDansMurHauteur || snakeDansMurLargeur){
                collisionMur = true;
            }

            for (let i = 0; i < snakeBody.length; i++){
                if (snakeHeadX === snakeBody[i][0] && snakeHeadY === snakeBody[i][1]){
                    collisionSnake = true;
                }
            }
            return collisionSnake || collisionMur;
        };
        this.eatingFood = function(theGodDamnFood){
            let head = this.body[0];
            return head[0] === theGodDamnFood.position[0] && head[1] === theGodDamnFood.position[1];
        };
    }

    function food(position){
        this.position = position;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#a61717";
            ctx.beginPath();
            let cercle = blockSnake/2;
            let x = this.position[0]*blockSnake + cercle;
            let y = this.position[1]*blockSnake + cercle;
            ctx.arc(x,y,cercle,0, Math.PI*2,true);
            ctx.fill();
            ctx.restore();
        };
        this.otherFoodPosition = function() {
            let newX = Math.round(Math.random() * (widthBlockSnake - 1));
            let newY = Math.round(Math.random() * (heightBlockSnake - 1));
            this.position = [newX,newY];
        };
        this.foodOnSnake = function(checkTheSnake){
            let foodOnSnake = false;
            for (let i = 0; i < checkTheSnake.body.length;i++){
                if(this.position[0] === checkTheSnake.body[i][0] && this.position[1] === checkTheSnake.body[i][1]){
                    foodOnSnake = true;
                }
            }
            return foodOnSnake;
        };

    }

    document.onkeydown = function toucheUtil(e){
        let touche = e.key;
        switch (touche) {
            case "ArrowUp":
                directionSnake = "up";
                break;
            case "ArrowDown":
                directionSnake = "down";
                break;
            case "ArrowRight":
                directionSnake = "right";
                break;
            case "ArrowLeft":
                directionSnake = "left";
                break;
            case "Enter":
                resume();
                return;
            default:
                return;
        }
        theSnake.setDirection(directionSnake);
    }
};