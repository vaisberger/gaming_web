const cards= document.querySelectorAll('.card');
let lock=false,first=false;
let card1,card2;
let score=0;
function flipCards() {
    if (lock) return;// a function that adds the fliping motion to
    if (this === card1) return;                      
    this.classList.add('flip');  
    if(!first){
        first=true;
        card1=this;
        return;
    }
    card2=this;
    compare();
  }
function compare(){                            // a function that compares two cards
   if(card1.dataset.name==card2.dataset.name){// if cards are a match the score goes up
     matched();
     updatescore();
     return;
   }
   reset();
}

function matched(){
    card1.removeEventListener('click',flipCards);
    card2.removeEventListener('click',flipCards);
    next();
}
  
function reset(){
    lock=true;
    setTimeout(()=> {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        next();
  }, 1500);
}

function next(){
  lock=false;
  first=false;
  card1=null;
  card2=null;
}
function restart(){
    score=0;
    next();
    cards.forEach(card => {
        card.classList.remove('flip');
    });
    mix();   
    flipCards()
}
function updatescore(){
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    loggedInUser.points += 1;
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    return;
}
function mix(){
  cards.forEach(card => {
    let random = Math.floor(Math.random() * 18);
    card.style.order = random;
  });
}

  cards.forEach(card => card.addEventListener('click', flipCards));

(function mixcards(){
    cards.forEach(card => {
        let random = Math.floor(Math.random() * 18);
        card.style.order = random;
      });
    })();
