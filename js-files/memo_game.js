const cards= document.querySelectorAll('.card');
function flipCards() {
    this.classList.toggle('flip');
  }
  
  cards.forEach(card => card.addEventListener('click', flipCards));



function mixcards(){
    let currentIndex=cards.length,randomIndex;
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [cards[currentIndex], cards[randomIndex]] = [
          cards[randomIndex], cards[currentIndex]];
      }
}
