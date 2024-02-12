
let numCups = 0; // Default number of cups
let shuffleSpeed = 0; // Default shuffle speed
//pre-loader
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    preloader.classList.add("preload-finish");
  });
  //this function triggers when you click play
  function StartGame() {
    if (numCups === 0 || shuffleSpeed === 0) {
      alert("Please select a level first.");
      return;
  }
    Showball();
    // setTimeout(Showball,);
    setTimeout(shuffling, 7000);
  }
  
  //this function lifts the thimbles
  function thimbleup(x) {
    x.classList.add("thimbleup");
  }
  
  //this function puts the thimble down
  function thimbledown(x) {
    x.classList.remove("thimbleup");
  }
  
  //this function selects one thimble at random and positions the ball under it and lifts it at the beginning
  function Showball() {
    document.getElementById("Playbutton").style.pointerEvents = "none";
    console.log(numCups)
    let rand = getRandNum();

    let thimb = document.getElementById(`Cup${rand}`);
  
    document
      .getElementById("thimble_ball")
      .setAttribute("Class", `thimble_ball_position-${rand}`);
      
    thimb.classList.add("thimbleup");

  
    setTimeout(function () {
      thimb.classList.remove("thimbleup");
    }, 4000);
    setTimeout(function () {
      document
        .getElementById("thimble_ball")
        .classList.remove(`thimble_ball_position-${rand}`);
    }, 4500);
  }
  
  //this function resets the class of all the thimbles to default
  function resetthimbclass() {
    document
      .getElementById("Cup0")
      .setAttribute("Class", "sewing_thimble thimble-0");
    document
      .getElementById("Cup1")
      .setAttribute("Class", "sewing_thimble thimble-1");
    document
      .getElementById("Cup2")
      .setAttribute("Class", "sewing_thimble thimble-2");
    document
      .getElementById("Cup3")
      .setAttribute("Class", "sewing_thimble thimble-3 hidden");
  }
  
  //this functions picks a random integer from 0-25
  function getRandNum() {
    let random = Math.floor(Math.random() * numCups);
    return random;
  }
  
  //this functions runs pickrandcups function after every 0.5secons
  function shuffling() {
    mix = setInterval(PickRandCups, shuffleSpeed);
  }
  
  let mix;
  
  let shufflecounter = 0;

  function selectLevel(level) {
    resetGame();

    // Add a CSS class to indicate the currently selected level button
    const levelButtons = document.querySelectorAll('.level');
    levelButtons.forEach(button => {
        if (button.id === `level${level}`) {
            button.classList.add('selected-level');
        } else {
            button.classList.remove('selected-level');
        }
    });
    clearInterval(mix); // Stop the current shuffling

    // Adjust number of cups and shuffle speed based on the selected level
    if (level === 1) {
        numCups = 3; // Level 1: Same cups, slower speed
        shuffleSpeed =400 ; // Adjust shuffle speed for level 1
    } else if (level === 2) {
        numCups = 3; // Level 2: Same cups, same speed
        shuffleSpeed = 600; // Default shuffle speed
    } else if (level === 3) {
        numCups = 4; // Level 3: Extra cup, same speed
        shuffleSpeed = 600; // Default shuffle speed
        document.getElementById("Cup3").classList.remove("hidden");
        
    }

    // Start shuffling with updated settings
    //shuffling();
}
  
  //this function interchanges the classes of two thimbles
  function PickRandCups() {
    let Cone = getRandNum();
    let Ctwo = getRandNum();
  
    if (Cone != Ctwo) {
      let Cupone = document.getElementById(`Cup${Cone}`);
      let Cuptwo = document.getElementById(`Cup${Ctwo}`);
  
      let CuponeClass = Cupone.getAttribute("class");
      let CuptwoClass = Cuptwo.getAttribute("class");
  
      Cupone.setAttribute("Class", CuptwoClass);
      Cuptwo.setAttribute("Class", CuponeClass);
  
      shufflecounter = shufflecounter + 1;
  
      if (shufflecounter > 15) {
        clearInterval(mix);
        resetthimbclass();
        removedisabled();
        shufflecounter = 0;
        //  setTimeout(resetthimbclass,7500);
      }
    } else {
      PickRandCups();
    }
  }

  function resetGame() {
    clearInterval(mix); // Stop the current shuffling
   // resetthimbclass(); // Reset cup positions
    removedisabled(); // Remove disabled attribute from cups
    shufflecounter = 0; // Reset shuffle counter

    // If it's the third level, ensure that the fourth cup remains visible
    if (numCups === 4) {
        document.getElementById("Cup3").classList.remove("hidden");
    }
}
  
  //this function removes the disabled attribute from all thimbles
  function removedisabled() {
    let removedis = document.getElementsByClassName("sewing_thimble");
    for (var i = 0; i < removedis.length; i++) {
      removedis[i].removeAttribute("disabled");
    }
  }
  
  // this function adds the disabled attribute from all thimbles
  function adddisabled() {
    let addis = document.getElementsByClassName("sewing_thimble");
    for (var i = 0; i < addis.length; i++) {
      addis[i].setAttribute("disabled", "disabled");
    }
  }
  
  // This function triggers when you click on a thimble
  function selectthimble(x) {
    adddisabled();
    let rand = getRandNum();
    let winningthimble = document.getElementById(`Cup${rand}`);
    let selectedthimble = document.getElementById(`${x}`);
    let ballpos = document.getElementById("thimble_ball");
    ballpos.setAttribute("Class", `thimble_ball_position-${rand}`); //set the ball position tunder the selected thimble
    selectedthimble.classList.add("thimbleup"); //lift the selected thimble up
  
    setTimeout(function () {
      if (winningthimble != selectedthimble) {
        setTimeout(function () {
          selectedthimble.classList.remove("thimbleup");
        }, 1000); //bring the selected thimble down after 2 secs
        setTimeout(function () {
          winningthimble.classList.remove("thimbleup");
        }, 2500); //bring  the winning thimble down after 2.5secs
        alert("Try Again");
        document.getElementById("Playbutton").style.pointerEvents = "all"; //make the play button clickable again
      } else if ((winningthimble = selectedthimble)) {
        alert("You Won");
        setTimeout(function () {
          selectedthimble.classList.remove("thimbleup");
        }, 2000); //bring the selected thimble down after 2 secs
        setTimeout(function () {
          winningthimble.classList.remove("thimbleup");
        }, 2500); //bring the winning thimble down after 2.5secs
        document.getElementById("Playbutton").style.pointerEvents = "all"; //make the play button clickable again
         // Increment points for the logged-in user
         const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
         console.log()
         loggedInUser.points += 1; // Increment points
         localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser)); // Update localStorage
     }
      
      
    }, 3500);
  }