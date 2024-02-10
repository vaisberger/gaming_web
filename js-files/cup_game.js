document.addEventListener("DOMContentLoaded", function() {
    // DOM elems
    var game = document.getElementById("cup_game");
    var cups = game.querySelectorAll(".cup");
    var ball = game.querySelector(".ball");
    var gameResult = game.querySelector("#game-result");
    var playBtn = document.getElementById("btn-play");

    function initGame() {
        // Config vars
        var animSpeed = 400;
        var intervalSpeed = animSpeed + 100;
        var nbMaxSwaps = 5;
        
        // Game vars
        var posBall;
        var animsInterval;
        var cupsWidth = cups[0].offsetWidth; // Assuming all cups have the same width
        var nbCups = cups.length;
        var nbSwaps = 0;

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
            var posSecondCup = parseInt(secondCup.dataset.posCurrent);
            var nbMoves = Math.abs(posFirstCup - posSecondCup);

            if(posFirstCup > posSecondCup) {
                moveToLeft(firstCup, 1, nbMoves);
                moveToRight(secondCup, 0, nbMoves);
            } else {
                moveToRight(firstCup, 0, nbMoves);
                moveToLeft(secondCup, 1, nbMoves);
            }

            firstCup.dataset.posCurrent = posSecondCup;
            secondCup.dataset.posCurrent = posFirstCup;
        }

        function animateCups() {
            var posCups = [];
            var indexFirstCup = Math.floor(Math.random() * nbCups);
            var indexSecondCup;
            var firstCup;
            var secondCup;

            for(var i = 0; i < nbCups; i++) {
                posCups.push(i);
            }

            posCups.splice(indexFirstCup, 1);
            indexSecondCup = posCups[Math.floor(Math.random() * (nbCups - 1))];

            firstCup = cups[indexFirstCup];
            secondCup = cups[indexSecondCup];

            swapElems(firstCup, secondCup);
        }

        // Starts a game
        function start() {
            nbSwaps = 0;
            posBall = Math.floor(Math.random() * nbCups);
      
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

            gameResult.style.display = 'block';
            setTimeout(function() {
                gameResult.style.display = 'none';
            }, 600);
        }
    }

    // Game init when DOM is loaded
    initGame();
});
