$(document).ready(function(){
    $('.HowTo').click(function() {
        $('#land').css("display","none");
        $('#HT').css("display","block");
    });

    $('#HT').click(function() {
        $('#HT').css("display","none");
        $('#land').css("display","block");
    });

    //$('.gameButton').click(function() {
    var theGame = function(){        
        $(".scorePad").empty();
        $('#land').css("display","none");
        $('#reset').css("display","none");
        $('#canvases').empty();
        $('#canvases').append(`<canvas id="tetrisCanvas" tabindex="0" width='450' height='600'></canvas>
            <canvas id="canvas" width="500" height="600"></canvas>`);
        $('.gameButton').blur();
        $("#tetrisCanvas").css("display","none");
        $("#canvas").css("display","block");
        var canvas = $("#canvas")[0];
        var ctx = canvas.getContext("2d");
        var w = $("#canvas").width();
        var h = $("#canvas").height();

        var valueList = []
        for (i = 0; i < 4; i++ ){
            var elem = $('.value')[i].innerHTML
            valueList.push(elem);

        }
        const img1 = document.getElementById("food1");
        const img2 = document.getElementById("food2");
        const img3 = document.getElementById("food3");
        const img4 = document.getElementById("food4");
        const img5 = document.getElementById("food5");
        const img6 = document.getElementById("food6");
        const img7 = document.getElementById("food7");
        const img8 = document.getElementById("food8");
        const numList = [$('#num0')[0].src, $('#num1')[0].src,$('#num2')[0].src,$('#num3')[0].src,$('#num4')[0].src,$('#num5')[0].src,$('#num6')[0].src,$('#num7')[0].src,$('#num8')[0].src,$('#num9')[0].src]
        //$(".scorePad").append(`<img src="${numList[0]}">`);
        const suva = [img1, img2, img3, img4,img5, img6, img7, img8];
        //Lets save the cell width in a variable for easy control
        var cw = 25;
        var d;
        var food;
        var score = 0;
        var myRandInt = Math.floor(Math.random()*7);
        
        //Lets create the snake now
        var snake_array; //an array of cells to make up the snake
        var timeOut = 3000;
        var regularSpeed = 150;
        var snakeBool = true;
        var tetrisBool = false;

        function endGame(score){
            console.log("Game over")
            snakeBool = false;
            tetrisBool = false;

            clearInterval(gameChanger);
            for(var j = 0; j < 4; j++){
                var myVal = parseInt(valueList[j])
                //console.log("score ",score)
                //console.log("myVal ",myVal)
                if(score > myVal){
                    //console.log(myVal)
                    valueList.splice(j, 0, score.toString());
                    valueList.splice(-1,1)
                    break;
                    //push to index i
                }
            }
            for (i = 0; i < 4; i++ ){
                $('.value')[i].innerHTML = valueList[i];
                //valueList.push(elem);

            }
            //score=0;
            //$(".scorePad").empty();
            //$(".scorePad").append(`<img src="${numList[0]}">`);
            $('#canvas').css("display","none");
            $('#tetrisCanvas').css("display","none");
            $('#reset').css("display","block");
            document.body.onkeydown = function( e ) {
                if(e.keyCode == 32 || e.keyCode == 13){
                    theGame();
                }
            }
            //console.log(valueList)


            //$('.buttons').append(`<div class="in"><button id="gameButton">Start</button></div>`)
            //$('#gameButton').bind();
            //ctx.font = "20px Georgia";
            //ctx.fillText("DAMN", 30, 30);
        }

        function init(){
            d = "right"; //default direction
            create_snake();
            create_food(); //Now we can see the food particle
            //finally lets display the score
            //score = 0;
            //Lets move the snake now using a timer which will trigger the paint function
            //every 60ms
            if(typeof game_loop != "undefined") clearInterval(game_loop);
                game_loop = setInterval(paint, regularSpeed);

        }
        
        init();

        function create_snake(){
            var length = 1; //Length of the snake
            snake_array = []; //Empty array to start with
            for(var i = length-1; i>=0; i--)
            {
                //This will create a horizontal snake starting from the top left
                snake_array.push({x: i, y:0});
            }
        }
        
        //Lets create the food now
        function create_food(){
            food = {
                x: Math.round(Math.random()*(w-cw)/cw), 
                y: Math.round(Math.random()*(h-cw)/cw), 
            };

            food2 = {
                x: Math.round(Math.random()*(w-cw)/cw), 
                y: Math.round(Math.random()*(h-cw)/cw), 
            };
            //This will create a cell with x/y between 0-44
            //Because there are 45(450/10) positions accross the rows and columns
        }
        
        //Lets paint the snake now
        function paint(){
            if(snakeBool){
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, w, h);
            ctx.strokeStyle = "black";
            ctx.strokeRect(0, 0, w, h);
            
            //The movement code for the snake to come here.
            //The logic is simple
            //Pop out the tail cell and place it infront of the head cell
            var nx = snake_array[0].x;
            var ny = snake_array[0].y;
            //These were the position of the head cell.
            //We will increment it to get the new head position
            //Lets add proper direction based movement now
            if(d == "right") nx++;
            else if(d == "left") nx--;
            else if(d == "up") ny--;
            else if(d == "down") ny++;
            
            //Lets add the game over clauses now
            //This will restart the game if the snake hits the wall
            //Lets add the code for body collision
            //Now if the head of the snake bumps into its body, the game will restart
            if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array)){
                endGame(score);
                return;
            }
            
            //Lets write the code to make the snake eat the food
            //The logic is simple
            //If the new head position matches with that of the food,
            //Create a new head instead of moving the tail
            if(nx == food.x && ny == food.y || nx == food2.x && ny == food2.y){
                var tail = {x: nx, y: ny};
                //Create new food
                if(nx == food.x && ny == food.y){
                    score += 47    
                }else{
                    score += 97
                }
                $('.scorePad').html(score);
                myRandInt = Math.floor(Math.random()*7);
                create_food();
            }else{
                var tail = snake_array.pop(); //pops out the last cell
                tail.x = nx; tail.y = ny;
            }


            //The snake can now eat the food.
            
            snake_array.unshift(tail); //puts back the tail as the first cell
            
            for(var i = 0; i < snake_array.length; i++){
                var c = snake_array[i];
                //Lets paint 10px wide cells
                paint_cell(c.x, c.y);
            }
            
            //Lets paint the food
            paint_food(food.x, food.y,myRandInt);
            paint_food(food2.x, food2.y,7);
            //Lets paint the score
            //var score_text = "Score: " + score;
            //ctx.fillText(score_text, 5, h-5);
            }
            
            //To avoid the snake trail we need to paint the BG on every frame
            //Lets paint the canvas now
        }
        
        //Lets first create a generic function to paint cells
        function paint_cell(x, y){
            ctx.fillStyle = "blue";
            var img = document.getElementById("snake");
            ctx.drawImage(img, x*cw, y*cw);
            ctx.strokeStyle = "transparent";
            ctx.strokeRect(x*cw, y*cw, cw, cw);
        }

        function paint_food(x, y, inter){
            ctx.fillStyle = "red";
            //console.log(suva[0])
            //var suvaline = Math.floor(Math.random()*3);
            //console.log("suvaline",suvaline);
            //console.log(suva[myRandInt]);
            //console.log(suva);
            //console.log(myRandInt)
            ctx.drawImage(suva[inter], x*cw, y*cw);
            //ctx.fillRect(x*cw, y*cw, cw, cw);
            ctx.strokeStyle = "transparent";
            ctx.strokeRect(x*cw, y*cw, cw, cw);
        }
        
        function check_collision(x, y, array){
            //This function will check if the provided x/y coordinates exist
            //in an array of cells or not
            for(var i = 0; i < array.length; i++)
            {
                if(array[i].x == x && array[i].y == y)
                 return true;
            }
            return false;
        }
        
        //Lets add the keyboard controls now
        $(document).keydown(function(e){
            if(snakeBool){
                var key = e.which;
            //We will add another clause to prevent reverse gear
            if(key == "37" && d != "right") d = "left";
            else if(key == "38" && d != "down") d = "up";
            else if(key == "39" && d != "left") d = "right";
            else if(key == "40" && d != "up") d = "down"; //DROP down    
            }
            //The snake is now keyboard controllable
        }) 


        var currentGame = true;
        var gameChanger = setInterval(function(){
            if(currentGame){
                $("#canvas").css("display","none");
                $("#tetrisCanvas").css("display","block");
                currentGame = !currentGame;
                snakeBool = !snakeBool;
                tetrisBool = !tetrisBool;
            }else{
                $("#tetrisCanvas").css("display","none");
                $("#canvas").css("display","block");
                currentGame = !currentGame;
                snakeBool = !snakeBool;
                tetrisBool = !tetrisBool;
            }
        }, 5000);


        var COLS = 15, ROWS = 20;
        var board = [];
        var lose;
        var interval;
        var current; // current moving shape
        var currentX, currentY; // position of current shape
        var shapes = [
            [ 1, 1, 1, 1 ],
            [ 1, 1, 1, 0,
              1 ],
            [ 1, 1, 1, 0,
              0, 0, 1 ],
            [ 1, 1, 0, 0,
              1, 1 ],
            [ 1, 1, 0, 0,
              0, 1, 1 ],
            [ 0, 1, 1, 0,
              1, 1 ],
            [ 0, 1, 0, 0,
              1, 1, 1 ]
        ];
        var colors = [
            'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
        ];

    // creates a new 4x4 shape in global variable 'current'
    // 4x4 so as to cover the size when the shape is rotated
        function newShape() {
            var id = Math.floor( Math.random() * shapes.length );
            var shape = shapes[ id ]; // maintain id for color filling

            current = [];
            for ( var y = 0; y < 4; ++y ) {
                current[ y ] = [];
                for ( var x = 0; x < 4; ++x ) {
                    var i = 4 * y + x;
                    if ( typeof shape[ i ] != 'undefined' && shape[ i ] ) {
                        current[ y ][ x ] = id + 1;
                    }
                    else {
                        current[ y ][ x ] = 0;
                    }
                }
            }
            // position where the shape will evolve
            currentX = 5;
            currentY = 0;
        }

    // clears the board
        function init2() {
            for ( var y = 0; y < ROWS; ++y ) {
                board[ y ] = [];
                for ( var x = 0; x < COLS; ++x ) {
                    board[ y ][ x ] = 0;
                }
            }
        }

    // keep the element moving down, creating new shapes and clearing lines
        function tick() {
            if(tetrisBool){
                if ( valid( 0, 1 ) ) {
                    ++currentY;
                }
                // if the element settled
                else {
                    freeze();
                    clearLines();
                    if (lose) {
                        newGame();
                        return false;
                    }
                    //console.log(currentY);
                    score += 10;
                    //whatScore(score);
                    $('.scorePad').html(score);
                    newShape();
                }
            }
            
        }

    // stop shape at its position and fix it to board
        function freeze() {
            for ( var y = 0; y < 4; ++y ) {
                for ( var x = 0; x < 4; ++x ) {
                    if ( current[ y ][ x ] ) {
                        board[ y + currentY ][ x + currentX ] = current[ y ][ x ];
                    }
                }
            }
        }

    // returns rotates the rotated shape 'current' perpendicularly anticlockwise
        function rotate( current ) {
            var newCurrent = [];
            for ( var y = 0; y < 4; ++y ) {
                newCurrent[ y ] = [];
                for ( var x = 0; x < 4; ++x ) {
                    newCurrent[ y ][ x ] = current[ 3 - x ][ y ];
                }
            }

            return newCurrent;
        }

    // check if any lines are filled and clear them
        function clearLines() {
            for ( var y = ROWS - 1; y >= 0; --y ) {
                var rowFilled = true;
                for ( var x = 0; x < COLS; ++x ) {
                    if ( board[ y ][ x ] == 0 ) {
                        rowFilled = false;
                        break;
                    }
                }
                if ( rowFilled ) {
                    for ( var yy = y; yy > 0; --yy ) {
                        for ( var x = 0; x < COLS; ++x ) {
                            board[ yy ][ x ] = board[ yy - 1 ][ x ];
                        }
                    }
                    ++y;
                    score+=1000;
                }
            }
        }

        function keyPress( key ) {
            switch ( key ) {
                case 'left':
                    if ( valid( -1 ) ) {
                        --currentX;
                    }
                    break;
                case 'right':
                    if ( valid( 1 ) ) {
                        ++currentX;
                    }
                    break;
                case 'down':
                    if ( valid( 0, 1 ) ) {
                        ++currentY;
                    }
                    break;
                case 'rotate':
                    var rotated = rotate( current );
                    if ( valid( 0, 0, rotated ) ) {
                        current = rotated;
                    }
                    break;
                case 'drop':
                    while ( valid( 0, 1 ) ) {
                        ++currentY;
                    }
                    break;
            }
        }

    // checks if the resulting position of current shape will be feasible
        function valid( offsetX, offsetY, newCurrent ) {
            offsetX = offsetX || 0;
            offsetY = offsetY || 0;
            offsetX = currentX + offsetX;
            offsetY = currentY + offsetY;
            newCurrent = newCurrent || current;



            for ( var y = 0; y < 4; ++y ) {
                for ( var x = 0; x < 4; ++x ) {
                    if ( newCurrent[ y ][ x ] ) {
                        if ( typeof board[ y + offsetY ] == 'undefined'
                          || typeof board[ y + offsetY ][ x + offsetX ] == 'undefined'
                          || board[ y + offsetY ][ x + offsetX ]
                          || x + offsetX < 0
                          || y + offsetY >= ROWS
                          || x + offsetX >= COLS ) {
                            if (offsetY == 1){lose = true; endGame(score);}
                             // lose if the current shape at the top row when checked
                            return false;
                        }
                    }
                }
            }
            return true;
        }

        function newGame() {
            clearInterval(interval);
            init2();
            newShape();
            lose = false;
            interval = setInterval( tick, 250 );
        }


        newGame();

        var canvas2 = document.getElementsByTagName( 'canvas' )[ 0 ];
        var ctx2 = canvas2.getContext( '2d' );
        var W2 = 450, H2 = 600;
        var BLOCK_W = W2 / COLS, BLOCK_H = H2 / ROWS;

        // draw a single square at (x, y)
        function drawBlock( x, y ) {
            var img = document.getElementById("tetris");
            ctx2.drawImage(img, BLOCK_W * x, BLOCK_H * y);
            //ctx2.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
            //ctx2.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
        }

        // draws the board and the moving shape
        function render() {
            ctx2.clearRect( 0, 0, W2, H2 );

            ctx2.strokeStyle = 'black';
            for ( var x = 0; x < COLS; ++x ) {
                for ( var y = 0; y < ROWS; ++y ) {
                    if ( board[ y ][ x ] ) {
                        ctx2.fillStyle = colors[ board[ y ][ x ] - 1 ];
                        drawBlock( x, y );
                    }
                }
            }

            ctx2.fillStyle = 'red';
            ctx2.strokeStyle = 'black';
            for ( var y = 0; y < 4; ++y ) {
                for ( var x = 0; x < 4; ++x ) {
                    if ( current[ y ][ x ] ) {
                        ctx2.fillStyle = colors[ current[ y ][ x ] - 1 ];
                        drawBlock( currentX + x, currentY + y );
                    }
                }
            }
        }

        setInterval( render, 30 );




        document.body.onkeydown = function( e ) {
            if(tetrisBool){
                var keys = {
                37: 'left',
                39: 'right',
                40: 'down',
                38: 'rotate',
                32: 'drop'
            };
            if ( typeof keys[ e.keyCode ] != 'undefined' ) {
                keyPress( keys[ e.keyCode ] );
                render();
            }
            }
            
            
        };


     
    };

    $('.gameButton').click(theGame);    


});


