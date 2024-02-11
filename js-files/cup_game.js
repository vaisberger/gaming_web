document.addEventListener("DOMContentLoaded", function() {
    // DOM elems
    var game = document.getElementById("cup_game");
    var cups = game.querySelectorAll(".cup");
    var ball = game.querySelector(".ball");
    var gameResult = game.querySelector("#game-result");
    var playBtn = document.getElementById("btn-play");
    var posBall;
    var animsInterval;
    var cupsWidth = cups[0].offsetWidth; // Assuming all cups have the same width
    var nbCups = cups.length;
    var nbSwaps = 0;

    function initGame() {
        // Config vars
        var animSpeed = 400;
        var intervalSpeed = animSpeed + 100;
        var nbMaxSwaps = 5;
        
        // Game vars
       
       

        // Animation
        function move(elemToMove, dir, depth, nbMoves) {
            var distanceAnim = cupsWidth * nbMoves / 2;
            var zindex = 'auto';
            var scale;
        
            if(depth > 0) {
                zindex = 5;
                scale = 1.25;
            } else {
                scale = 0.75;
                zindex = -5;
            }
        
            if(dir === 'left') {
                dir = '-';
            } else {
                dir = '+';
            }
        
            var isBallUnderCup = (posBall === parseInt(elemToMove.dataset.posCurrent));
        
            elemToMove.style.zIndex = zindex;
            elemToMove.style.transition = 'transform ' + animSpeed / 2 + 'ms linear';
            elemToMove.style.transform = 'translateX(' + dir + distanceAnim + 'px) scale(' + scale + ')';
            setTimeout(function() {
                elemToMove.style.transition = 'transform ' + animSpeed / 2 + 'ms linear';
                elemToMove.style.transform = 'translateX(' + dir + distanceAnim + 'px) scale(1)';
                elemToMove.style.zIndex = 'auto';
        
                nbSwaps += 0.5;
                if(nbSwaps >= nbMaxSwaps) {
                    clearInterval(animsInterval);
                    end();
                }
        
                // If the ball is under this cup, update its position
                if (isBallUnderCup) {
                    var posCurrent = parseInt(elemToMove.dataset.posCurrent);
                    posBall = (dir === '-') ? (posCurrent - nbMoves) % nbCups : (posCurrent + nbMoves) % nbCups;
                    if (posBall < 0) posBall += nbCups; // Ensure positive position
                }
            }, animSpeed / 2);
        }
        

        function moveToLeft(elemToMove, depth, nbMoves) {
            move(elemToMove, 'left', depth, nbMoves);
        }

        function moveToRight(elemToMove, depth, nbMoves) {
            move(elemToMove, 'right', depth, nbMoves);
        }

        // Swaps cups position
function swapElems(firstCup, secondCup) {
    var posFirstCup = parseInt(firstCup.dataset.posCurrent);
    console.log(posFirstCup)
    var posSecondCup = parseInt(secondCup.dataset.posCurrent);
    console.log(posSecondCup)
    var nbMoves = Math.abs(posFirstCup - posSecondCup);
    console.log(nbMoves)

    if(posFirstCup > posSecondCup) {
        moveToLeft(firstCup, 1, nbMoves);
        moveToRight(secondCup, 0, nbMoves);
    } else {
        moveToRight(firstCup, 0, nbMoves);
        moveToLeft(secondCup, 1, nbMoves);
    }

    firstCup.dataset.posCurrent = posSecondCup;
    secondCup.dataset.posCurrent = posFirstCup;

    // Update the position of the ball
    if (posBall === posFirstCup) {
        posBall = posSecondCup;
    } else if (posBall === posSecondCup) {
        posBall = posFirstCup;
    }
}

        function animateCups() {
            // Loop through each cup
            console.log()
            for (var i = 0; i < nbCups; i++) {
                var currentCup = cups[i];
                var posCurrent = parseInt(currentCup.dataset.posCurrent);
                
                // Determine the direction to move the cup
                var dir = posCurrent % 2 === 0 ? 'left' : 'right'; // Alternating directions
                
                // Calculate the new position
                var newPos = dir === 'left' ? posCurrent - 1 : posCurrent + 1;
                if (newPos < 0) {
                    newPos = nbCups - 1; // Wrap around to the end
                } else if (newPos >= nbCups) {
                    newPos = 0; // Wrap around to the beginning
                }
                
                // Get the cup to swap with
                var nextCup = cups[newPos];
                
                // Perform the swap animation
                swapElems(currentCup, nextCup);
            }
        }
        
        // Starts a game
        function start() {
            nbSwaps = 0;  //number of swaps (nbSwaps) back to 0 
            posBall = Math.floor(Math.random() * nbCups); //Random Ball Position
      
            playBtn.removeEventListener('click', start);
            game.removeEventListener('click', cupClickHandler);
            
            // Update of cups position
            for(var i = 0; i < nbCups; i++) {
                var posEnd = parseInt(cups[i].dataset.posCurrent);
                cups[i].dataset.posStart = posEnd;
            }

            // Shows the ball
            ball.style.left = (posBall * cupsWidth) + 'px';
            ball.style.display = 'block';
            setTimeout(function() {
                ball.style.display = 'none';
                animsInterval = setInterval(animateCups, intervalSpeed);
            }, 600);
        }

        // End of game
        function end() {	
            console.log(gameResult)
            playBtn.addEventListener('click', start);
      
            game.addEventListener('click', cupClickHandler);
        }

        function init() {
            // Init positions
            for(var i = 0; i < nbCups; i++) {
                cups[i].dataset.posStart = i;
                cups[i].dataset.posCurrent = i;
            }

            playBtn.addEventListener('click', start);
        }

        // Game init
        init();
    }

    function cupClickHandler(event) {
        if(event.target.classList.contains('cup')) {
            var posStart = parseInt(event.target.dataset.posStart);
            var posEnd = parseInt(event.target.dataset.posCurrent);
    
            // If the ball is found
            if(posBall === posStart) {
                game.removeEventListener('click', cupClickHandler);
                
                // Shows the ball
                ball.style.left = (posEnd * cupsWidth) + 'px';
                ball.style.display = 'block';
                setTimeout(function() {
                    ball.style.display = 'none';
                    gameResult.textContent = 'Ball found !';
                }, 600);
            } else {
                gameResult.textContent = 'Try again !';
            }
            console.log(gameResult)
    
            gameResult.style.display = 'block';
            setTimeout(function() {
                gameResult.style.display = 'none';
            }, 600);
        }
    }
    
    // Game init when DOM is loaded
    initGame();
});