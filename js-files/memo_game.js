const cards= document.querySelectorAll('.card');
let lock=false;
let score=0;
function flipCards() {
    this.classList.toggle('flip');
  }
  
  cards.forEach(card => card.addEventListener('click', flipCards));
(function mixcards(){
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 18);
        card.style.order = ramdomPos;
      });
    })();
   
